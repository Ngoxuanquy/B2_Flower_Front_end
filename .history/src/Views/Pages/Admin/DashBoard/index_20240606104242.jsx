import React from "react";
import styles from "./DashBoard.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const DashBoard = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("box")}>
        <h1>CongTusJr</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        tempore eligendi sapiente hic. Qui, cupiditate, itaque pariatur alias
        molestiae eius illo sit animi deserunt impedit numquam dolores excepturi
        dolor dicta!
      </div>
    </div>
  );
};

export default DashBoard;
