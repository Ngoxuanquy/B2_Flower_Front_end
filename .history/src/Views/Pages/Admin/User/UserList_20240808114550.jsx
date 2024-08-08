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
    title: "Danh Sách Người Dùng",
    items: [
      { text: "Admin", link: "/admin/dash-board" },
      { text: "Người Dùng", link: "/admin/danh-sách-người-dùng" },
      { text: "Danh Sách Người Dùng" },
    ],
  };

  const cx = classNames.bind(styles);
  const [totalUser, setTotaluser] = useState(0);
  const [apis, setApi] = useState([]);

  const fetchUsers = () => {
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

    fetch(URL + "/users/userId/" + cleanId, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.metadata);
        setApi(res.metadata);
        setTotaluser(res.metadata.length);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <PageTitle title={pageTitleProps.title} items={pageTitleProps.items} />
        <div className={cx("list-floatcard")}>
          <FloatCard
            number={totalUser}
            text="Tổng người dùng"
            backgroundColor="linear-gradient(#ed68ff, #be0ee1)"
            icon={<MdPending />}
            iconColor="#f3a0ff"
          />
          <FloatCard
            number="605"
            text="Approved Users"
            backgroundColor="linear-gradient(#4eda89, #1a9f53)"
            icon={<FaCheckCircle />}
            iconColor="#89ecb3"
          />
          <FloatCard
            number="249"
            text="Blocked Users"
            backgroundColor="linear-gradient(#ff6179, #f11133)"
            icon={<IoIosRemoveCircle />}
            iconColor="#ff9baa"
          />
        </div>
        <RegisteredUsers apis={apis} fetchUsers={fetchUsers} />
      </div>
    </div>
  );
};

export default UserList;
