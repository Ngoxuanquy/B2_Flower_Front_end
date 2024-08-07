import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import styles from "../../../Views/Pages/Admin/DashBoard/DashBoard.module.scss";
import classNames from "classnames/bind";
import { Button } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GiBackwardTime } from "react-icons/gi";
const ranges = {
  lastDay: "Last Day",
  lastWeek: "Last Week",
  lastMonth: "Last Month",
  lastYear: "Last Year",
};
const cx = classNames.bind(styles);
const ITEM_HEIGHT = 48;
const DashBoardBox = (props) => {
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
    <div
      className={cx("dashboardBox")}
      style={{
        backgroundImage: `linear-gradient(to right,${props.color?.[0]},${props.color?.[1]})`,
      }}
    >
      {props.grow === true ? (
        <sapn className={cx("chart")}>
          <TrendingUpIcon />
        </sapn>
      ) : (
        <span className={cx("chart")}>
          <TrendingDownIcon />
        </span>
      )}
      <div className="d-flex w-100">
        <div className={cx("col1")}>
          <h4>{props.title}</h4>
          <span>{props.number}</span>
        </div>
        <div className={cx("divIcon")}>
          {props.icon ? (
            <span className={cx("icon")}>{props.icon ? props.icon : ""}</span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={cx("bottomEle")}>
        <div className={cx("timeline")}>
          {/* <div className={cx("ratio")}>+45%</div> */}
          <h6>{ranges[selectedRange]}</h6>
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
              <MenuItem key={key} onClick={() => handleMenuItemClick(key)}>
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
    </div>
  );
};

export default DashBoardBox;
