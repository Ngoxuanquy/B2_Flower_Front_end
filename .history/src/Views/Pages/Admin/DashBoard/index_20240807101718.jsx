import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./DashBoard.module.scss";
import classNames from "classnames/bind";
import DashBoardBox from "../../../../Components/Admin/DashBoard/DashBoardBox";
import { FaBagShopping, FaCircleUser } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { GiBackwardTime, GiStarsStack } from "react-icons/gi";
import { Button, Menu, MenuItem } from "@mui/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import Cookies from "js-cookie";
import zoomPlugin from "chartjs-plugin-zoom";
import BestSellingProduct from "../../../../Components/Admin/BestSellingProduct/BestSellingProduct";
import PageTitle from "../../../../Components/Admin/PageTitle/PageTitle";
import { Call_Post_Api } from "../../../../Components/CallApi/CallApis";
import ThemeConText from "../../../../config/themeConText";

// Register the necessary components
Chart.register(...registerables);
Chart.register(zoomPlugin);

const data = {
  labels: ["2021", "2022", "2023", "2024"],
  datasets: [
    {
      label: "Total",
      data: [30, 120, 130, 90],
      backgroundColor: "blue",
      borderColor: "blue",
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        color: "white", // Color for X-axis labels
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "white",
        callback: function (value) {
          return `$${value}`; // Add dollar sign before the value
        },
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "white", // Color for legend labels
      },
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `$${tooltipItem.raw}`; // Add dollar sign before the value in tooltips
        },
      },
      bodyColor: "white", // Color for tooltip body text
      titleColor: "white", // Color for tooltip title
    },
    title: {
      display: false, // Disable the built-in title
    },
  },
};
const ranges = {
  lastDay: "Last Day",
  lastWeek: "Last Week",
  lastMonth: "Last Month",
  lastYear: "Last Year",
};
const cx = classNames.bind(styles);
const ITEM_HEIGHT = 48;

const DashBoard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [numTopProducts, setNumTopProducts] = useState(5);
  const [topProducts, setTopProducts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [undeliveredOrder, setUndeliveredOrder] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRange, setSelectedRange] = useState("lastMonth");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orders, setOrders] = useState([]);
  const chartRef = useRef(null);
  const open = Boolean(anchorEl);
  const URL = process.env.REACT_APP_URL;

  const pageTitleProps = {
    title: "Dashboard",
    items: [
      { text: "Admin", link: "/admin/dash-board" },
      { text: "Dashboard", link: "/admin/dash-board" },
    ],
  };
  useEffect(() => {
    Call_Post_Api(null, null, null, "/product/getAll")
      .then((data) => {
        setTotalProducts(data.metadata.length);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const getApiTransactionOrder = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Promise.all([
      Call_Post_Api(
        null,
        cleanedJwtString,
        cleanId,
        `/transaction/getFullOrder_done`,
        "Get"
      ),
      Call_Post_Api(
        null,
        cleanedJwtString,
        cleanId,
        `/transaction/getFull`,
        "Get"
      ),
    ])
      .then(([doneOrdersResponse, fullOrdersResponse]) => {
        const combinedData = [
          ...doneOrdersResponse.metadata,
          ...fullOrdersResponse.metadata,
        ];
        setTotalOrders(combinedData.length);
        setUndeliveredOrder(fullOrdersResponse.metadata.length);
        calculateTopProducts(doneOrdersResponse.metadata);
        calculateTotalPrice(doneOrdersResponse.metadata);
        console.log(combinedData);
        setOrders(doneOrdersResponse.metadata);
        return combinedData;
      })
      .catch((err) => console.log({ err }));
  };

  const calculateTopProducts = (orders) => {
    const productMap = {};

    orders.forEach((order) => {
      order.transaction_products.forEach((product) => {
        if (productMap[product.product_name]) {
          productMap[product.product_name].quantity += product.quantity;
        } else {
          productMap[product.product_name] = {
            ...product,
            quantity: product.quantity,
          };
        }
      });
    });

    const sortedProducts = Object.values(productMap).sort(
      (a, b) => b.quantity - a.quantity
    );

    setTopProducts(sortedProducts.slice(0, numTopProducts));
  };

  const calculateTotalPrice = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      total += order.total_amounts;
    });
    setTotalPrice(total);
  };

  const calculateTotalRevenue = (orders, range) => {
    let total = 0;
    const now = new Date();

    orders.forEach((order) => {
      const orderDate = new Date(order.modifieOn); // Assuming `createdAt` is the date field

      if (range === "lastDay" && isSameDay(orderDate, now)) {
        total += order.total_amounts;
      } else if (range === "lastWeek" && isWithinLastWeek(orderDate, now)) {
        total += order.total_amounts;
      } else if (range === "lastMonth" && isWithinLastMonth(orderDate, now)) {
        total += order.total_amounts;
      } else if (range === "lastYear" && isWithinLastYear(orderDate, now)) {
        total += order.total_amounts;
      }
    });

    setTotalRevenue(total);
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isWithinLastWeek = (date, now) => {
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    return date > oneWeekAgo;
  };

  const isWithinLastMonth = (date, now) => {
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);
    return date > oneMonthAgo;
  };

  const isWithinLastYear = (date, now) => {
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    return date > oneYearAgo;
  };

  useEffect(() => {
    getApiTransactionOrder();
  }, [numTopProducts]);

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/^"|"$/g, "");
    const cleanId = id?.replace(/^"|"$/g, "");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
        authorization: cleanedJwtString,
        "x-client-id": cleanId,
      },
    };

    fetch(URL + "/users/userId/" + cleanId, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setTotalUsers(res.metadata.length);
      });
  }, [URL]);

  useEffect(() => {
    if (orders.length > 0) {
      calculateTotalRevenue(orders, selectedRange);
    }
  }, [selectedRange, orders]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (rangeKey) => {
    setSelectedRange(rangeKey);
    handleClose();
  };

  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <PageTitle
          className="w-100"
          title={pageTitleProps.title}
          items={pageTitleProps.items}
        />
        <div className={cx("dashboardBoxWrapperRow")}>
          <div className="col-md-8">
            <div className={cx("dashboardBoxWrapper")}>
              <DashBoardBox
                title="Tổng người dùng"
                number={totalUsers}
                color={["#1da256", "#48d483"]}
                icon={<FaCircleUser />}
                grow={true}
              />
              <DashBoardBox
                title="Tổng Đơn Hàng"
                number={totalOrders}
                color={["#c012e2", "#eb64fe"]}
                icon={<MdShoppingCart />}
              />
              <DashBoardBox
                title="Tổng Sản Phẩm"
                number={totalProducts}
                color={["#2c78e5", "#60aff5"]}
                icon={<FaBagShopping />}
              />
              <DashBoardBox
                title="Đơn Chưa Giao"
                number={undeliveredOrder}
                color={["#e1950e", "#f3cd29"]}
                grow={true}
                icon={<GiStarsStack />}
              />
            </div>
          </div>
          <div className="col-md-4" style={{ padding: 0, paddingLeft: "10px" }}>
            <div className={cx("boxnew", "graphBox")}>
              <div className={cx("bottomEle")}>
                <div className={cx("timeline")}>
                  <h4>Tổng Doanh Thu</h4>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <Button className={cx("toggleIcon")} onClick={handleClick}>
                    <HiOutlineDotsVertical />
                  </Button>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    {Object.entries(ranges).map(([key, text]) => (
                      <MenuItem
                        key={key}
                        onClick={() => handleMenuItemClick(key)}
                      >
                        <GiBackwardTime
                          style={{
                            fontSize: "17px",
                            marginRight: "10px",
                            color: "#000",
                          }}
                        />
                        {text}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>
              <h3 className={cx("totalPrice")}>{totalPrice} vnđ</h3>
              <p>
                {totalRevenue} vnđ in {ranges[selectedRange]}
              </p>
              <div>
                <Bar ref={chartRef} data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
        <BestSellingProduct
          data={topProducts}
          onNumTopProductsChange={(num) => setNumTopProducts(num)}
        />
      </div>
    </div>
  );
};

export default DashBoard;
