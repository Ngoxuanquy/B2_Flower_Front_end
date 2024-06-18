import React from "react";
import styles from "./UserList.module.scss";
import classNames from "classnames/bind";
import PageTitle from "../../../../Components/Admin/PageTitle/PageTitle";

const cx = classNames.bind(styles);
const UserList = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <PageTitle />
        ssss
      </div>
    </div>
  );
};

export default UserList;
