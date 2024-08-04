import React, { useEffect, useState } from "react";
import styles from "./UserList.module.scss";
import classNames from "classnames/bind";
import { MdPending } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import PageTitle from "../../../../Components/Admin/PageTitle/PageTitle";
import FloatCard from "../../../../Components/Admin/FloatCard/FloatCard";
import RegisteredUsers from "../RegisteredUsers/RegisteredUsers";
import Cookies from "js-cookie";

const UserList = () => {
  const URL = process.env.REACT_APP_URL;
  const pageTitleProps = {
    title: "User List",
    items: [
      { text: "Admin", link: "/admin/dash-board" },
      { text: "User", link: "/admin/user-list" },
      { text: "User List" },
    ],
  };

  const cx = classNames.bind(styles);
  const [pendingUsers, setPendingUsers] = useState(0);
  const [approvedUsers, setApprovedUsers] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState(0);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/^"|"$/g, "");
    const cleanId = id?.replace(/^"|"$/g, "");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
        authorization: cleanedJwtString,
        "x-client-id": cleanId,
      },
    };

    fetch(URL + "/users/all", requestOptions) // Cập nhật endpoint nếu cần
      .then((res) => res.json())
      .then((res) => {
        console.log(res.metadata);

        const users = res.metadata; // Giả định response có metadata là danh sách người dùng
        const pending = users.filter(
          (user) => user.status === "pending"
        ).length;
        const approved = users.filter(
          (user) => user.status === "approved"
        ).length;
        const blocked = users.filter(
          (user) => user.status === "blocked"
        ).length;

        setPendingUsers(pending);
        setApprovedUsers(approved);
        setBlockedUsers(blocked);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [URL]);

  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <PageTitle title={pageTitleProps.title} items={pageTitleProps.items} />
        <div className={cx("list-floatcard")}>
          <FloatCard
            number={pendingUsers}
            text="Pending User"
            backgroundColor="linear-gradient(#ed68ff, #be0ee1)"
            icon={<MdPending />}
            iconColor="#f3a0ff"
          />
          <FloatCard
            number={approvedUsers}
            text="Approved Users"
            backgroundColor="linear-gradient(#4eda89, #1a9f53)"
            icon={<FaCheckCircle />}
            iconColor="#89ecb3"
          />
          <FloatCard
            number={blockedUsers}
            text="Blocked Users"
            backgroundColor="linear-gradient(#ff6179, #f11133)"
            icon={<IoIosRemoveCircle />}
            iconColor="#ff9baa"
          />
        </div>
        <RegisteredUsers apis={res.metadata} />{" "}
        {/* Pass the user list to RegisteredUsers if needed */}
      </div>
    </div>
  );
};

export default UserList;
