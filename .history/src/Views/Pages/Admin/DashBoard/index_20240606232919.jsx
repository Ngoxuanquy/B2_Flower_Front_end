import React, { useEffect } from "react";
import styles from "./DashBoard.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const DashBoard = () => {
  useEffect(() => {
    document.title = "Dash Broad";
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <div className={cx("box")}>
          <h5>Dash Board</h5>
          <nav>Admin/Dash Board</nav>
        </div>
        <div className="col-md-9">
          <div className={cx("dashboardBoxWrapper")}>
            <div className={cx("dashboardBox")}></div>
          </div>{" "}
          <div className={cx("dashboardBoxWrapper")}>
            <div className={cx("dashboardBox")}></div>
          </div>{" "}
          <div className={cx("dashboardBoxWrapper")}>
            <div className={cx("dashboardBox")}></div>
          </div>{" "}
          <div className={cx("dashboardBoxWrapper")}>
            <div className={cx("dashboardBox")}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
