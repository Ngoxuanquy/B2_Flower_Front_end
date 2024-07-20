import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ResertPassword.module.scss";
import { Call_Post_Api } from "../../../Components/CallApi/CallApis";
import Cookies from "js-cookie";
import { message } from "antd";

const cx = classNames.bind(styles);

const ResertPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password change logic here
    const name = Cookies.get("name");
    const cleanedName = name?.replace(/"/g, "");

    if (!cleanedName || !currentPassword || !newPassword || !confirmPassword) {
      messageApi.open({
        type: "error",
        content: "All fields are required.",
      });
      return;
    }

    if (newPassword.length < 6) {
      messageApi.open({
        type: "error",
        content: "New password must be at least 6 characters long.",
      });
      return;
    }

    if (newPassword === currentPassword) {
      messageApi.open({
        type: "error",
        content: "New password must be different from the current password.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      messageApi.open({
        type: "error",
        content: "New password and confirm password do not match.",
      });
      return;
    }

    Call_Post_Api(
      {
        email: cleanedName,
        currentPassword,
        newPassword,
      },
      null,
      null,
      `/shop/resert_password`
    )
      .then((data) => {
        console.log(data);
        messageApi.open({
          type: "warning",
          content: data.metadata.msg,
        });
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <div className={cx("container")}>
      {contextHolder}
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className={cx("form-group")}>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
          />
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ResertPassword;
