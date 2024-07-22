import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./DangKy.module.scss";
import { Backgroug } from "../../../Components";
import { Button, Modal, Spin, message } from "antd";
import OtpInput from "react-otp-input";

const cx = classNames.bind(styles);

function DangKy() {
  const URL = process.env.REACT_APP_URL;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [re_Pass, setRe_Passs] = useState("");
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function isValidVietnamPhoneNumber(phoneNumber) {
    const vietnamPhoneRegex = /^0\d{9,10}$/;
    return vietnamPhoneRegex.test(phoneNumber);
  }

  function handerSubmit() {
    if (!email || !pass || !re_Pass || !number) {
      messageApi.open({
        type: "warning",
        content: "Vui lòng không để trống các trường!!!",
      });
      return;
    } else if (!validateEmail(email)) {
      messageApi.open({
        type: "warning",
        content: "Email không đúng định dạng!!!",
      });
      return;
    } else if (pass !== re_Pass) {
      messageApi.open({
        type: "warning",
        content: "Mật khẩu không khớp!!!",
      });
      return;
    } else if (pass.length <= 6) {
      messageApi.open({
        type: "warning",
        content: "Mật khẩu phải dài hơn 6 kí tự",
      });
      return;
    } else if (!isValidVietnamPhoneNumber(number)) {
      messageApi.open({
        type: "warning",
        content: "Sai định dạng số điện thoại",
      });
      return;
    }

    setIsLoad(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    };

    fetch(URL + "/shop/signup", requestOptions)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setIsLoad(false);

        if (
          data.metadata.msg === "Email đã được đăng ký!!" ||
          data.metadata.msg === "Email không tồn tại!!"
        ) {
          messageApi.open({
            type: "warning",
            content: data.metadata.msg,
          });
        } else {
          setShowModal(true);
        }
      });
  }

  const handleOkButtonClick = () => {
    if (otp && otp.length === 6) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
        body: JSON.stringify({
          email: email,
          password: pass,
          code: otp,
        }),
      };

      fetch(URL + "/shop/verifile", requestOptions)
        .then((data) => data.json())
        .then((data) => {
          if (data.metadata.status === "success") {
            messageApi.open({
              type: "success",
              content: "Đăng ký thành công!!!",
            });
            window.location = "/login";
          } else {
            messageApi.open({
              type: "error",
              content: "Xác thực thất bại. Vui lòng thử lại.",
            });
          }
        });
    } else {
      messageApi.open({
        type: "error",
        content: "Mã OTP không hợp lệ",
      });
    }
  };

  return (
    <div className={cx("container_")}>
      {contextHolder}

      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        className={cx("otp-modal")}
        footer={[
          <Button key="cancel">Hủy</Button>,
          <Button key="ok" type="primary" onClick={handleOkButtonClick}>
            OK
          </Button>,
        ]}
      >
        <div
          style={{
            fontSize: "20px",
            marginBottom: "40px",
            textAlign: "center", // Căn giữa nội dung văn bản
            fontFamily: "Arial, sans-serif", // Lựa chọn font chữ
            fontWeight: "bold", // Đậm văn bản
            color: "#333", // Màu chữ
          }}
        >
          Vui lòng kiểm tra email để nhập mã code
        </div>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>---</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: "40px",
            height: "40px",
            margin: "2px",
          }}
          containerStyle={{
            width: "100%",
            height: "150px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        />
      </Modal>
      {isLoad && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100vh",
            zIndex: 100,
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
              <div className={cx("login")}>Đăng Ký</div>
              <div className={cx("titer")}>
                By logging in you agree to the ridiculously long terms that you
                didn't bother to read
              </div>
              <div className={cx("taikhoan")}>
                Bạn Chưa Có Tài Khoản?
                <Link to={"/login"}>
                  <span>Đăng Nhập</span>
                </Link>
              </div>
            </div>
            <div className={cx("rigth")}>
              <div>
                <div className={cx("email")}>Email</div>
                <div>
                  <input
                    className={cx("input")}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className={cx("matkhau")}>Mật Khẩu</div>
                <div>
                  <input
                    type="password"
                    className={cx("input")}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className={cx("matkhau")}>Nhập Lại Mật Khẩu</div>
                <div>
                  <input
                    type="password"
                    className={cx("input")}
                    onChange={(e) => setRe_Passs(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className={cx("matkhau")}>Số Điện Thoại</div>
                <div>
                  <input
                    className={cx("input")}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button className={cx("submit")} onClick={handerSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DangKy;
