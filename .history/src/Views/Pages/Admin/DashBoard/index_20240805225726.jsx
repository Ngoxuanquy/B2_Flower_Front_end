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

Chart.register(...registerables);
Chart.register(zoomPlugin);

const cx = classNames.bind(styles);
const ITEM_HEIGHT = 48;

const DashBoard = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total",
        data: [],
        backgroundColor: "blue",
        borderColor: "blue",
        borderWidth: 1,
      },
    ],
  });

  const [totalProducts, setTotalProducts] = useState(0);
  const [numTopProducts, setNumTopProducts] = useState(5);
  const [topProducts, setTopProducts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const URL = process.env.REACT_APP_URL;

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

    Call_Post_Api(
      null,
      cleanedJwtString,
      cleanId,
      `/transaction/getFullOrder_done`,
      "Get"
    )
      .then((data) => {
        calculateTopProducts(data.metadata);
        calculateTotalPrice(data.metadata);
        setChartData({
          labels: data.metadata.map((order) => order.order_date),
          datasets: [
            {
              label: "Total",
              data: data.metadata.map((order) => order.total_amounts),
              backgroundColor: "blue",
              borderColor: "blue",
              borderWidth: 1,
            },
          ],
        });
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

  useEffect(() => {
    getApiTransactionOrder();
  }, [numTopProducts]);

  const pageTitleProps = {
    title: "Dashboard",
    items: [
      { text: "Admin", link: "/admin/dash-board" },
      { text: "Dashboard", link: "/admin/dash-board" },
    ],
  };

  useEffect(() => {
    document.title = "Dash Broad";
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRange, setSelectedRange] = useState("lastMonth");
  const open = Boolean(anchorEl);
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
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    return () => {
      chart.destroy();
    };
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
                title="Total Reviews"
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
              <p>$3,578.90 in {ranges[selectedRange]}</p>
              <div>
                <Bar ref={chartRef} data={chartData} options={options} />
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
