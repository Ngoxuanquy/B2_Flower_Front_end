import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import {
  UserOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MinusOutlined,
  PlusOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, Dropdown, Button, Drawer, Menu, Avatar, Badge, Switch, Space, Popconfirm, notification, Input } from "antd";
import Cookies from "js-cookie";
import ThemeConText from "../../config/themeConText";
import { EventRegister } from "react-event-listeners";
import { Call_Post_Api } from "../CallApi/CallApis";
import logo from "../../access/logo-1.png";

const cx = classNames.bind(styles);
const { Search } = Input;

function Header() {
  const [theme, ordersLength] = useContext(ThemeConText);
  const navigate = useNavigate();
  const [scrollDirection, setScrollDirection] = useState("scroll-up");
  const [lastScroll, setLastScroll] = useState(0);
  const [isLoad, setIsLoad] = useState(true);
  const [defau, setDefau] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [count, setCount] = useState(5); // Initialize count with 5
  const [show, setShow] = useState(true);

  const [api, contextHolder] = notification.useNotification();

  const close = () => {
    console.log("Notification was closed. Either the close button was clicked or duration time elapsed.");
  };

  const openNotification = () => {
    const key = `open${Date.now()}`;

    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy()}>
          Destroy All
        </Button>
        <Button type="primary" size="small" onClick={() => api.destroy(key)}>
          Confirm
        </Button>
      </Space>
    );

    api.open({
      message: "Notification Title",
      description: 'A function will be called after the notification is closed (automatically after the "duration" time or manually).',
      btn,
      key,
      onClose: close,
    });
  };

  const getApi = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");
    if (cleanedJwtString) {
      Call_Post_Api({ userId: cleanId }, cleanedJwtString, cleanId, "/cart/getlistCart")
        .then((data) => {
          EventRegister.emit("chaneLength", data.metadata?.cart_products?.length);
          setCount(data.metadata?.cart_products?.length);
        })
        .catch((err) => console.log({ err }));
    } else {
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || 0;
      if (currentScroll == 0) {
        setIsLoad(true);
        setScrollDirection("scroll-up");
      } else if (currentScroll > lastScroll && scrollDirection !== "scroll-down") {
        setIsLoad(false);
        setScrollDirection("scroll-down");
      } else if (currentScroll < lastScroll && scrollDirection !== "scroll-up") {
        setIsLoad(true);
        setScrollDirection("scroll-up");
      }

      setLastScroll(currentScroll);
    };

    // Call handleScroll once on component mount to handle initial load
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollDirection, lastScroll]);

  useEffect(() => {
    getApi();
  }, [ordersLength]);

  const bodyClass = scrollDirection === "scroll-down" ? "scroll-down" : scrollDirection === "scroll-up" ? "scroll-up" : "";

  const handeTab = (e) => {
    setDefau(e);
    onClose();
  };

  const name = Cookies.get("name")?.replace(/"/g, "");
  const img = Cookies.get("img")?.replace(/"/g, "");

  const items = [
    {
      key: "1",
      label: <a onClick={() => hanldeLinkUser()}>{name}</a>,
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Đổi mật khẩu
        </a>
      ),
    },
    {
      key: "3",
      label: <a onClick={() => handleLogout()}>Đăng xuất</a>,
    },
  ];

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    const cookies = document.cookie.split(";");

    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    });

    window.location.href = "/login";
  };

  const hanldeLinkUser = () => {
    navigate("/information");
  };

  const onSearch = (value) => {
    Call_Post_Api(null, null, null, "/product/search/" + value).then((data) => {
      setSearchResults(data.metadata);
    });
  };

  const text = searchResults.length === 0 ? "Chưa có sản phẩm 🎉🎉🎉" : "Sản phẩm 👀✔👀";
  const description = () => (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      {searchResults.length === 0 ? (
        <div style={{ color: "#333", fontSize: "0.9em", textAlign: "center", padding: "10px" }}>Vui lòng nhập tên sản phẩm</div>
      ) : (
        <div
          style={{
            width: "500px",
            borderCollapse: "collapse",
            borderRadius: "8px",
            backgroundColor: "#ffcccc",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ backgroundColor: "#ff6666", color: "white", display: "flex" }}>
            <div style={{ padding: "8px", textAlign: "center", fontSize: "12px", flex: 1 }}>Tên Sản Phẩm</div>
            <div style={{ padding: "8px", textAlign: "center", fontSize: "12px", flex: 1 }}>Số Lượng</div>
          </div>
          {searchResults.map((search, index) => (
            <div
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white",
                display: "flex",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/detailproduct/` + search._id)}
            >
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  fontSize: "11px",
                  flex: 1,
                }}
              >
                {search.product_name}
              </div>
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  fontSize: "11px",
                  flex: 1,
                }}
              >
                {search.product_quantity}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={cx("container_")}>
      {contextHolder}
      <Drawer title="Menu" placement="right" onClose={onClose} open={open} width="70%">
        <Tabs
          defaultActiveKey={defau}
          centered
          onChange={(e) => handeTab(e)}
          tabBarStyle={{ color: "pink", marginRight: " 70px" }}
          tabPosition="right"
        >
          <Tabs.TabPane
            tab={
              <Link style={{ color: "#292929" }} to="/">
                TRANG CHỦ
              </Link>
            }
            key="1"
          />
          <Tabs.TabPane
            tab={
              <Link style={{ color: "#292929" }} to="/about">
                GIỚI THIỆU
              </Link>
            }
            key="2"
          />
          <Tabs.TabPane
            tab={
              <Link style={{ color: "#292929" }} to="/shop">
                SHOP
              </Link>
            }
            key="3"
          />
          <Tabs.TabPane
            tab={
              <Link style={{ color: "#292929" }} to="/blog">
                BLOG
              </Link>
            }
            key="4"
          />
          <Tabs.TabPane
            tab={
              <Link style={{ color: "#292929" }} to="/lienhe">
                LIÊN HỆ
              </Link>
            }
            key="5"
          />
          <Tabs.TabPane
            tab={
              <Link style={{ color: "#292929" }} to="/lienhe">
                CÂU HỎI KHÁC
              </Link>
            }
            key="6"
          />
          <Tabs.TabPane
            tab={
              <Link style={{ color: "#292929" }} to="/login">
                Đăng nhập
              </Link>
            }
            key="7"
          />
        </Tabs>
      </Drawer>

      {isLoad && (
        <div className={`scroll-indicator ${scrollDirection}`}>
          <div className="container_">
            <div className={cx("header")}>
              <div onClick={() => (window.location.href = "/")} style={{ cursor: "pointer" }}>
                <img src={logo} className={cx("img_logo")} style={{ borderRadius: "300px", marginRight: "-10px" }} />
              </div>
              <div className={cx("header_center")}>
                <Tabs defaultActiveKey={defau} centered onChange={(e) => handeTab(e)} tabBarStyle={{ color: "pink" }}>
                  <Tabs.TabPane
                    tab={
                      <Link style={{ color: "#292929" }} to="/">
                        TRANG CHỦ
                      </Link>
                    }
                    key="1"
                  />
                  <Tabs.TabPane
                    tab={
                      <Link style={{ color: "#292929" }} to="/about">
                        GIỚI THIỆU
                      </Link>
                    }
                    key="2"
                  />
                  <Tabs.TabPane
                    tab={
                      <Link style={{ color: "#292929" }} to="/shop">
                        SHOP
                      </Link>
                    }
                    key="3"
                  />
                  <Tabs.TabPane
                    tab={
                      <Link style={{ color: "#292929" }} to="/blog">
                        BLOG
                      </Link>
                    }
                    key="4"
                  />
                  <Tabs.TabPane
                    tab={
                      <Link style={{ color: "#292929" }} to="/lienhe">
                        LIÊN HỆ
                      </Link>
                    }
                    key="5"
                  />
                  <Tabs.TabPane
                    tab={
                      <Link style={{ color: "#292929" }} to="/lienhe">
                        CÂU HỎI KHÁC
                      </Link>
                    }
                    key="6"
                  />
                </Tabs>
              </div>

              <div className={cx("header_right")}>
                <Link to="/cart" style={{ color: "black", listStyle: "none", textDecoration: "none" }}>
                  <Space size="large" style={{ fontSize: "25px", marginLeft: "-50px" }}>
                    <Badge count={ordersLength}>
                      <ShoppingCartOutlined style={{ fontSize: "25px" }} />
                    </Badge>
                  </Space>
                </Link>
                <Popconfirm
                  placement="bottom"
                  title={text}
                  description={description}
                  okText="Yes"
                  cancelText="No"
                  style={{ width: "500px" }}
                >
                  <Search placeholder="Nhập sản phẩm .... " onSearch={onSearch} style={{ width: 400, marginTop: "5px" }} />
                </Popconfirm>
                {name === undefined ? (
                  <button style={{ padding: "5px" }} onClick={() => (window.location.href = "/login")}>
                    Đăng nhập
                  </button>
                ) : (
                  <Dropdown menu={{ items }} placement="bottom" arrow>
                    {img === "" || img === undefined ? (
                      <img
                        src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-avatar-trang-chat-ngau-cute-400x400.jpg"
                        style={{ width: "40px", height: "40px", borderRadius: "100px", marginLeft: "10px" }}
                      />
                    ) : (
                      <div>
                        <img src={img} style={{ width: "40px", height: "40px", borderRadius: "100px" }} />
                      </div>
                    )}
                  </Dropdown>
                )}
              </div>
              <div className={cx("menu")}>
                <Link to="/cart" style={{ color: "black", listStyle: "none", textDecoration: "none", marginRight: "20px" }}>
                  <Space size="large" style={{ fontSize: "25px", marginLeft: "-40px" }}>
                    <Badge count={ordersLength}>
                      <ShoppingCartOutlined style={{ fontSize: "25px" }} />
                    </Badge>
                  </Space>
                </Link>
                <MenuOutlined style={{ fontSize: "25px" }} onClick={showDrawer} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
