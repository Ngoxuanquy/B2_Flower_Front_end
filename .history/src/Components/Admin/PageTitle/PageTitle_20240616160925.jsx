import React from "react";
import styles from "./PageTitle.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const PageTitle = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <h3>User List</h3>
        <ul>
          <li>
            <a href="/admin/dash-board">admin</a>
          </li>
          <li>
            <a href="/admin/user/user-list">user</a>
          </li>
          <li>User List</li>
        </ul>
      </div>
    </div>
  );
};

export default PageTitle;
