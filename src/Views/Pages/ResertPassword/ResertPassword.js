import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ResertPassword.module.scss";
import { Call_Post_Api } from "../../../Components/CallApi/CallApis";
import Cookies from "js-cookie";
import { message } from "antd";

const cx = classNames.bind(styles);

export function checkValiDoiMK(cleanedName, currentPassword, newPassword, confirmPassword) {
  if (!cleanedName || !currentPassword || !newPassword || !confirmPassword) {
    return {
      isValid: false,
      message: "All fields are required.",
    };
  }

  if (newPassword.length < 6) {
    return {
      isValid: false,
      message: "New password must be at least 6 characters long.",
    };
  }

  if (newPassword === currentPassword) {
    return {
      isValid: false,
      message: "New password must be different from the current password.",
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      isValid: false,
      message: "New password and confirm password do not match.",
    };
  }

  return {
    isValid: true,
  };
}

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

  function checkValiDoiMK(cleanedName, currentPassword, newPassword, confirmPassword) {
    if (!cleanedName || !currentPassword || !newPassword || !confirmPassword) {
      return {
        isValid: false,
        message: "All fields are required.",
      };
    }

    if (newPassword.length < 6) {
      return {
        isValid: false,
        message: "New password must be at least 6 characters long.",
      };
    }

    if (newPassword === currentPassword) {
      return {
        isValid: false,
        message: "New password must be different from the current password.",
      };
    }

    if (newPassword !== confirmPassword) {
      return {
        isValid: false,
        message: "New password and confirm password do not match.",
      };
    }

    return {
      isValid: true,
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = Cookies.get("name");
    const cleanedName = name?.replace(/"/g, "");

    const validation = checkValiDoiMK(cleanedName, currentPassword, newPassword, confirmPassword);

    if (!validation.isValid) {
      return messageApi.open({
        type: "error",
        content: validation.message,
      });
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
          <input type="password" value={currentPassword} onChange={handleCurrentPasswordChange} />
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="newPassword">New Password</label>
          <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ResertPassword;
