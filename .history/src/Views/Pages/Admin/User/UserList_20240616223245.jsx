import React from "react";
import styles from "./UserList.module.scss";
import classNames from "classnames/bind";
import { MdPending } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import PageTitle from "../../../../Components/Admin/PageTitle/PageTitle";
import FloatCard from "../../../../Components/Admin/FloatCard/FloatCard";

const cx = classNames.bind(styles);
const UserList = () => {
  const pageTitleProps = {
    title: "User List",
    items: [
      { text: "Admin", link: "/admin/dash-board" },
      { text: "User", link: "/admin/user/user-list" },
      { text: "User List" },
    ],
  };
  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <PageTitle title={pageTitleProps.title} items={pageTitleProps.items} />
        <div className={cx("list-floatcard")}>
          <FloatCard
            number="547"
            text="Pending User"
            backgroundColor="linear-gradient(#ed68ff, #be0ee1)"
            icon={<MdPending />}
            iconColor="#f3a0ff"
          />
          <FloatCard
            number="547"
            text="Pending User"
            backgroundColor="linear-gradient(#4eda89, #1a9f53)"
            icon={<FaCheckCircle />}
            iconColor="#89ecb3"
          />
          <FloatCard
            number="547"
            text="Pending User"
            backgroundColor="linear-gradient(#ed68ff, #be0ee1)"
            icon={<MdPending />}
            iconColor="#f3a0ff"
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
