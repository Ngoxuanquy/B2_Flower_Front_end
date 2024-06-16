import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import styles from "../../../Views/Pages/Admin/DashBoard/DashBoard.module.scss";
import classNames from "classnames/bind";
import { Button } from "@mui/material";
const cx = classNames.bind(styles);

const DashBoardBox = (props) => {
  return (
    <div
      className={cx("dashboardBox")}
      style={{
        backgroundImage: `linear-gradient(to right,${props.color?.[0]},${props.color?.[1]})`,
      }}
    >
      <div className="d-flex w-100">
        <div className={cx("col1")}>
          <h4>{props.title}</h4>
          <span>277</span>
        </div>
        <div className={cx("divIcon")}>
          {props.icon ? (
            <span className={cx("icon")}>{props.icon ? props.icon : ""}</span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="d-flex align-items-center">
        <h6>Last Month</h6>
        <Button className={cx("toggleIcon")}>
          <HiOutlineDotsVertical />
        </Button>
      </div>
    </div>
  );
};

export default DashBoardBox;
