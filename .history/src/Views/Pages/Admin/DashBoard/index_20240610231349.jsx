import React, { useEffect, useState } from "react";
import styles from "./DashBoard.module.scss";
import classNames from "classnames/bind";
import DashBoardBox from "../../../../Components/Admin/DashBoard/DashBoardBox";
import { FaBagShopping, FaCircleUser } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { GiBackwardTime, GiStarsStack } from "react-icons/gi";
import { Button, Menu, MenuItem } from "@mui/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer,
} from "recharts";
const data = [
  { x: 1, value: 100 },
  { x: 2, value: 120 },
  { x: 3, value: 130 },
  { x: 4, value: 90 },
  { x: 5, value: 70 },
  { x: 6, value: 30 },
  { x: 7, value: 80 },
  { x: 8, value: 100 },
];
const ranges = {
  lastDay: "Last Day",
  lastWeek: "Last Week",
  lastMonth: "Last Month",
  lastYear: "Last Year",
};
const cx = classNames.bind(styles);
const ITEM_HEIGHT = 48;
const options = {
  chart: {
    type: "area",
    zoomType: "x",
    height: 200,
  },
  xAxis: {
    categories: [2021, 2022, 2023, 2024],
    min: 0, // Set the initial zoom level by specifying the range to be displayed
    max: 3,
  },
  yAxis: {
    title: {
      text: "Values",
    },
    labels: {
      formatter: function () {
        return "$" + this.value;
      },
    },
  },
  series: [
    {
      name: "Values",
      data: [200, 60, 80, 100],
      color: "#2E86C1",
      fillColor: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
          [0, "rgba(46, 134, 193, 0.8)"],
          [1, "rgba(46, 134, 193, 0)"],
        ],
      },
    },
  ],
};
const DashBoard = () => {
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
          <Button
            className="col-md-4"
            style={{ padding: 0, marginLeft: "10px" }}
          >
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
              <ResponsiveContainer width={"100%"} height={200}>
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E7711B" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#E7711B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="red"
                    fill="url(#colorValue)"
                  />
                  <Line type="monotone" dataKey="value" stroke="red" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

// {/* <h6></h6> */}
