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

const cx = classNames.bind(styles);
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

  const [apis, setApi] = useState([]);
  const [detailApi, setDetailApi] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const [status, setStatus] = useState("");

  const showModal = (api) => {
    setDetailApi(api);
    setName(api.name);
    setEmail(api.email);
    setRoles(api.roles);
    setStatus(api.status);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);

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
      body: JSON.stringify({
        id: detailApi._id,
        name,
        email,
        roles,
        status,
      }),
    };

    fetch(URL + "/shop/update_roles", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        getApi();
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getApi = () => {
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
      });
  };

  useEffect(() => {
    getApi();
  }, [URL]);
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
        <RegisteredUsers apis={apis} />
      </div>
    </div>
  );
};

export default UserList;
