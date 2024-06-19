import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Cookies from "js-cookie";

import { Spin, message } from "antd";
import { Backgroug } from "../../../Components";

import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";

import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { resetWarned } from "antd/es/_util/warning";
import { gapi } from "gapi-script";
import { Button, Checkbox, Form, Input } from "antd";

import { Alert, Space } from "antd";
import { Call_Post_Api } from "../../../Components/CallApi/CallApis";

const cx = classNames.bind(styles);

function Logins() {
  const navigate = useNavigate();

  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "75458164961-jjmi99liu47e0ttlapaoqrvs87tqkfbk.apps.googleusercontent.com",
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  const FieldType = {
    username: undefined,
    password: undefined,
    remember: undefined,
  };

  // const URL = process.env.REACT_APP_URL;
  // // const URL = process.env.REACT_APP_URL

  // console.log(URL + '/login')

  const [email, setEmail] = useState("");
  const [matkhau, setMatKhau] = useState("");
  const [apis, setApi] = useState([]);

  function handerSubmit() {
    console.log(email);
    if (email != "" && matkhau != "" && email != undefined && matkhau != undefined) {
      setIsLoad(true);
      Call_Post_Api(
        {
          email: email,
          password: matkhau,
        },
        null,
        null,
        "/shop/login"
      ).then((data) => {
        // if (data.metadata.shop.verify == true) {
        //     alert("Tài khoản đã đăng nhập ở 1 nơi khác!!!")
        // }
        if (data.metadata.msg !== "Sai mật khẩu hoặc tài khoản!!" && data.metadata.status !== "error") {
          const token = data.metadata?.tokens?.accessToken;
          const name = data.metadata?.shop?.email;
          const secretKey = "my-secret-key";
          Cookies.set("accessToken", JSON.stringify(token), {
            expires: 7,
          });
          Cookies.set("name", JSON.stringify(name), { expires: 7 });

          // fetch(URL + '/shop/update_verify/' + data.metadata.shop._id, requestOptions)
          Cookies.set("id", JSON.stringify(data.metadata?.shop?._id), { expires: 7 });
          Cookies.set("timeeexp", JSON.stringify(data.metadata?.tokens?.timeExp), { expires: 7 });
          setIsLoad(false);
          // navigate('/');
          if (data.metadata.shop.roles[0] === "SHOP") {
            // alert(data.metadata.status)
            navigate("/");
          } else {
            navigate("/admin");
          }
          // navigate('/');
        } else {
          // alert("Sai mật khẩu hoặc tài khoản!!")
          message.error("Sai mật khẩu hoặc tài khoản!!!");
          setIsLoad(false);
        }
      });
    } else {
      // alert("Vui lòng nhập đủ thông tin!!!")
      message.warning(" Vui lòng nhập đủ thông tin !!");
    }
  }

  // const handleFacebookLogin = () => {
  //   // Xử lý đăng nhập bằng Facebook
  //   auth
  //     .signInWithPopup(authProvider)
  //     .then((result) => {
  //       // Handle successful login
  //       console.log("Successfully logged in:", result.user);
  //     })
  //     .catch((error) => {
  //       // Handle login error
  //       console.log("Error occurred during login:", error);
  //     });
  // };

  // auth.onAuthStateChanged((user) => {
  //   // console.log(user._delegate)
  //   if (user) {
  //     Cookies.set("accessToken", JSON.stringify(user._delegate.accessToken), { expires: 7 });
  //     Cookies.set("name", JSON.stringify(user._delegate.displayName), {
  //       expires: 7,
  //     });
  //     Cookies.set("img", JSON.stringify(user._delegate.photoURL), {
  //       expires: 7,
  //     });

  //     // navigate('/');
  //   }
  // });

  // const handleGoogleLogin = () => {
  //   // Xử lý đăng nhập bằng Google
  // };

  const REDIRECT_URI = "https://plenty-planets-beam-42-118-51-2.loca.lt/account/login";

  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState();

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    console.log("Đăng nhập thành công");
    window.location.href = "/";
  }, []);

  const onLogout = useCallback(() => {}, []);

  //Khai báo user fb
  const [users, setUser] = useState([]);

  // useEffect(() => {
  //     if (users) {
  //         window.location.href = '/';
  //     }
  // }, [users]);

  const handlerLoginFB = (res) => {
    setIsLoad(true);

    Call_Post_Api(
      {
        name: res.data.name,
        email: res.data.email,
        password: res.data.userID,
      },
      null,
      null,
      "/shop/loginFB_GG"
    )
      .then((data) => {
        console.log(data.metadata);
        if (data?.metadata.status === "success" || data?.metadata.status === "Đăng Nhập Thành Công1") {
          // Handle successful login
          Cookies.set("accessToken", data?.metadata.tokens.accessToken, {
            expires: 7,
          });
          Cookies.set("name", res?.data.name, {
            expires: 7,
          });
          Cookies.set("img", res?.data.picture.data.url, {
            expires: 7,
          });
          Cookies.set("id", data?.metadata.shop._id, {
            expires: 7,
          });
          setIsLoad(false);
          navigate("/");
        } else {
          // Handle login failure
          setIsLoad(false);
          console.log("Login failed. Handle this case as needed.");
          // You might want to show an error message or take other actions for a failed login.
        }
      })
      .catch((error) => {
        // Handle API call error here
        setIsLoad(false);
        console.error("API call error:", error);
        // You might want to show an error message or take other actions for API call errors.
      });
  };

  const handerLoginGG = (res) => {
    console.log(res.data.sub);
    setIsLoad(true);

    Call_Post_Api(
      {
        name: res.data.name,
        email: res.data.sub,
        password: res.data.sub,
      },
      null,
      null,
      "/shop/loginFB_GG"
    )
      .then((data) => {
        console.log(data.metadata);
        if (data?.metadata.status === "success" || data?.metadata.status === "Đăng Nhập Thành Công1") {
          // Handle successful login
          Cookies.set("accessToken", JSON.stringify(data?.metadata.tokens.accessToken), {
            expires: 7,
          });
          Cookies.set("name", JSON.stringify(res.data.name), {
            expires: 7,
          });
          Cookies.set("img", JSON.stringify(res.data.picture.replace('""', "")), {
            expires: 7,
          });
          Cookies.set("id", data?.metadata.shop._id, {
            expires: 7,
          });
          setIsLoad(false);
          navigate("/");
        } else {
          // Handle login failure
          setIsLoad(false);
          console.log("Login failed. Handle this case as needed.");
          // You might want to show an error message or take other actions for a failed login.
        }
      })
      .catch((error) => {
        // Handle API call error here
        setIsLoad(false);
        console.error("API call error:", error);
        // You might want to show an error message or take other actions for API call errors.
      });
  };

  return (
    <div className={cx("container")}>
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
                <div className={cx("login")}>Đăng Nhập</div>
                <div className={cx("titer")}>By logging in you agree to the ridiculously long terms that you didn't bother to read</div>
                <div className={cx("taikhoan")}>
                  Bạn Chưa Có Tài Khoản?
                  <Link to={"/dangky"}>
                    <span>Đăng Ký</span>
                  </Link>
                </div>

                <div className={cx("button")}>
                  <LoginSocialFacebook
                    appId="1080177052915707"
                    // fieldsProfile={
                    //     'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                    // }
                    onResolve={(res) => {
                      handlerLoginFB(res);
                    }}
                    onFinish={() => {
                      onSuccess();
                    }}
                    onReject={(err) => {
                      console.log(err);
                    }}
                  >
                    <FacebookLoginButton />
                  </LoginSocialFacebook>
                </div>

                <div className={cx("button")}>
                  <LoginSocialGoogle
                    client_id="75458164961-jjmi99liu47e0ttlapaoqrvs87tqkfbk.apps.googleusercontent.com"
                    onResolve={(res) => {
                      handerLoginGG(res);
                    }}
                    onReject={(err) => {
                      console.log(err);
                    }}
                  >
                    <GoogleLoginButton />
                  </LoginSocialGoogle>
                </div>
              </div>
              <div className={cx("rigth")}>
                <div className={cx("layout")}>
                  <Form
                    name="basic"
                    labelCol={{ span: 10, color: "white" }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                  >
                    <Form.Item
                      label="Username"
                      name="username"
                      wrapperCol="white"
                      style={{
                        color: "white",
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "100%",
                        }}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Item>
                    <div
                      style={
                        {
                          // marginTop: '30px',
                        }
                      }
                    >
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input.Password placeholder="Password" onChange={(e) => setMatKhau(e.target.value)} />
                      </Form.Item>
                    </div>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" onClick={() => handerSubmit()}>
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logins;
