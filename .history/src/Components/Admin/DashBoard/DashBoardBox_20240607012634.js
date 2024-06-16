import React from "react";
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
    </div>
  );
};

export default DashBoardBox;
