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
          <p>Dash Board</p>
          <nav>Admin/Dash Board</nav>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
