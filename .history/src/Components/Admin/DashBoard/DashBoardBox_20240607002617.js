import React from "react";
import styles from "./DashBoard.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const DashBoardBox = () => {
  return <div className={cx("dashboardBox")}></div>;
};

export default DashBoardBox;
