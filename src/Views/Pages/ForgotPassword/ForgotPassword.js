import { Button, Input, Spin, message } from "antd";
import React, { useState } from "react";
import { Backgroug } from "../../../Components";
import classNames from "classnames/bind";
import styles from "./ForgotPassword.module.scss";
import { Link } from "react-router-dom";
import { Call_Post_Api } from "../../../Components/CallApi/CallApis";
function ForgotPassword(props) {
  const cx = classNames.bind(styles);
  const [messageApi, contextHolder] = message.useMessage();

  const [inputEmail, setInputEmail] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const handleChange = (event) => {
    setInputEmail(event.target.value);
  };

  const handelSubmitEmail = () => {
    Call_Post_Api(
      {
        email: inputEmail,
      },
      null,
      null,
      "/shop/forgot_password"
    ).then((data) => {
      console.log(data);
      if (data.metadata.msg === "Gmail không tồn tại!!") {
        messageApi.open({
          type: "warning",
          content: data.metadata.msg,
        });
      } else {
        messageApi.open({
          type: "success",
          content: "Check email để lấy lại mật khẩu",
        });
      }
    });
  };

  return (
    <div className={cx("container")}>
      {contextHolder}
      {isLoad && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100vh",
            zIndex: 100,
            top: 0,
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin />
        </div>
      )}

      <div>
        <div className={cx("box")}>
          <div
            style={{
              width: "100%",
              height: "99.4%",
              position: "relative",
              zIndex: -100,
            }}
          >
            <Backgroug />
          </div>
          <div className={cx("form")}>
            <div className={cx("all")}>
              <div className={cx("left")}>
                <div className={cx("login")}>Quên mật khẩu</div>
                <div className={cx("titer")}>By logging in you agree to the ridiculously long terms that you didn't bother to read</div>
                <div className={cx("taikhoan")}>
                  Đột nhiên nhớ mật khẩu ?
                  <Link to={"/login"}>
                    <span>Đăng nhập</span>
                  </Link>
                </div>
              </div>
              <div className={cx("rigth")}>
                <div className={cx("layout")}>
                  <label
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Email{" "}
                  </label>
                  <Input onChange={handleChange} />
                </div>
                <div
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <Button onClick={handelSubmitEmail}>Gửi</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;