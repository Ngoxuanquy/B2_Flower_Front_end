import React from "react";
import styles from "./DashBoard.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const DashBoard = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("box")}></div>
    </div>
  );
};

export default DashBoard;
