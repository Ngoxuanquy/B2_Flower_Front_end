import React from "react";
import styles from "./PageTitle.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const PageTitle = () => {
  return (
    <div className={cx("container")}>
      <div>
        <h3>User List</h3>
      </div>
    </div>
  );
};

export default PageTitle;
