import React from "react";
import styles from "../../../Views/Pages/Admin/DashBoard/DashBoard.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const DashBoardBox = (props) => {
  return (
    <div
      className={cx("dashboardBox")}
      style={{ backgroundImage: "linear-gradient(to right,red,yellow" }}
    ></div>
  );
};

export default DashBoardBox;
