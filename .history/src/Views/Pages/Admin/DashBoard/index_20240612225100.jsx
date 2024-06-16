/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef, useState } from "react";
import styles from "./DashBoard.module.scss";
import classNames from "classnames/bind";
import DashBoardBox from "../../../../Components/Admin/DashBoard/DashBoardBox";
import { FaBagShopping, FaCircleUser, FaEye, FaPencil } from "react-icons/fa6";
import { MdDelete, MdShoppingCart } from "react-icons/md";
import { GiBackwardTime, GiStarsStack } from "react-icons/gi";
import { Button, Menu, MenuItem, Pagination } from "@mui/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
  useEffect(() => {
    document.title = "Dash Broad";
  }, []);

  const [selectShow, setSelectShow] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
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

  const handleChangeSelectShow = (event) => {
    setSelectShow(event.target.value);
  };
  const handleChangeSelectCategory = (event) => {
    setSelectCategory(event.target.value);
  };
  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <div className={cx("box")}>
          <h5>Dash Board</h5>
          <nav>Admin/Dash Board</nav>
        </div>
        <div className={cx("dashboardBoxWrapperRow")}>
          <div className="col-md-8">
            <div className={cx("dashboardBoxWrapper")}>
              <DashBoardBox
                title="Total Users"
                color={["#1da256", "#48d483"]}
                icon={<FaCircleUser />}
                grow={true}
              />
              <DashBoardBox
                title="Total Orders"
                color={["#c012e2", "#eb64fe"]}
                icon={<MdShoppingCart />}
              />
              <DashBoardBox
                title="Total Products"
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
                  <h4>Total Sales</h4>
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
              <h3 className={cx("totalPrice")}>$3,787,681.00</h3>
              <p>$3,578.90 in {ranges[selectedRange]}</p>
              <div>
                <Bar ref={chartRef} data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
