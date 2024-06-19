import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./User.module.scss";
import { Input, Modal, Select } from "antd";
import Cookies from "js-cookie";
import PageTitle from "../../../../Components/Admin/PageTitle/PageTitle";

const User = () => {
  const URL = process.env.REACT_APP_URL;
  const options = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "SHOP", label: "SHOP" },
    { value: "CREATE", label: "CREATE" },
    { value: "READ", label: "READ" },
    { value: "EDIT", label: "EDIT" },
    { value: "DELETE", label: "DELETE" },
  ];

  const pageTitleProps = {
    title: "User List",
    items: [{ text: "Admin", link: "/admin/dash-board" }, { text: "User", link: "/admin/user-list" }, { text: "User List" }],
  };

  const cx = classNames.bind(styles);
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

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "status-active";
      case "inactive":
        return "status-inactive";
      case "pending":
        return "status-pending";
      default:
        return "";
    }
  };

  const getRoleClass = (role) => {
    switch (role.toUpperCase()) {
      case "READ":
        return "role-read";
      case "EDIT":
        return "role-edit";
      case "DELETE":
        return "role-delete";
      default:
        return "";
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRolesChange = (value) => {
    setRoles(value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className={cx("container")}>
      <PageTitle title={pageTitleProps.title} items={pageTitleProps.items} />

      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className={cx("model-header")}>
          <h2>Thông tin cá nhân</h2>
          <div>
            Name
            <Input value={name} onChange={handleNameChange} />
          </div>
          <div>
            Email
            <Input value={email} onChange={handleEmailChange} />
          </div>
          <div>
            Roles
            <Select
              mode="multiple"
              placeholder="Please select"
              value={roles}
              onChange={handleRolesChange}
              style={{ width: "100%" }}
              options={options}
            />
          </div>
          <div>
            Status
            <Input value={status} onChange={handleStatusChange} />
          </div>
        </div>
      </Modal>
      <div className={cx("header")}>
        <div>Name</div>
        <div>Email</div>
        <div>Roles</div>
        <div>Status</div>
        <div>Ngày tạo</div>
        <div>#</div>
      </div>
      <div>
        {apis?.map((api) => (
          <div className={cx("row")} key={api._id}>
            <div>{api?.name}</div>
            <div>{api.email}</div>
            <div>
              {api?.roles?.map((role, index) => (
                <span key={index} className={cx(getRoleClass(role))}>
                  {role}{" "}
                </span>
              ))}
            </div>
            <div className={cx(getStatusClass(api.status))}>{api.status}</div>
            <div>{new Date(api.updatedAt).toLocaleDateString()}</div>
            <div className={cx("deleteButton")} onClick={() => showModal(api)}>
              Cập nhật
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
