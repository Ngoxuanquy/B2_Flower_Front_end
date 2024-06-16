import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import styles from "../../../Views/Pages/Admin/DashBoard/DashBoard.module.scss";
import classNames from "classnames/bind";
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
          <h4>Total User</h4>
          <span>277</span>
        </div>
        <div className="ml-auto">
          <span className={cx("icon")}>
            <FaCircleUser />
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashBoardBox;
