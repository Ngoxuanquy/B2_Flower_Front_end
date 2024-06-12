import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import { UserOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Popconfirm, Tabs } from "antd";
import { Dropdown } from "antd";
import Cookies from "js-cookie";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { MinusOutlined, PlusOutlined, QuestionOutlined } from "@ant-design/icons";
import { Avatar, Badge, Switch, Space } from "antd";
import ThemeConText from "../../config/themeConText";
import { notification } from "antd";
import Search from "antd/es/input/Search";
import { Call_Post_Api } from "../CallApi/CallApis";
const cx = classNames.bind(styles);

function Header() {
  const [theme, ordersLength] = useContext(ThemeConText);

  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScroll, setLastScroll] = useState(0);
  const [isLoad, setIsLoad] = useState(true);
  const [defau, setDefau] = useState(1);
  const [searchs, setSearch] = useState([]);
  const [count, setCount] = useState(5); // Initialize count with 5
  const [show, setShow] = useState(true);

  const close = () => {
    console.log("Notification was closed. Either the close button was clicked or duration time elapsed.");
  };

  const [api, contextHolder] = notification.useNotification();

  // Function to open a notification
  const openNotification = () => {
    const key = `open${Date.now()}`;

    // Create a set of buttons for the notification
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

    // Open the notification with a message, title, buttons, key, and onClose event handler
    api.open({
      message: "Notification Title",
      description: 'A function will be called after the notification is closed (automatically after the "duration" time or manually).',
      btn,
      key,
      onClose: close,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        setScrollDirection(null);
      } else if (currentScroll > lastScroll && scrollDirection !== "scroll-down") {
        setIsLoad(false);
        setScrollDirection("scroll-down");
      } else if (currentScroll < lastScroll && scrollDirection !== "scroll-up") {
        setIsLoad(true);

        setScrollDirection("scroll-up");
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollDirection, lastScroll]);

  const bodyClass = scrollDirection === "scroll-down" ? "scroll-down" : scrollDirection === "scroll-up" ? "scroll-up" : "";

  const handeTab = (e) => {
    setDefau(e);
    onClose();
  };

  //laays value cokiie
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
          Dổi mật khẩu
        </a>
      ),
    },
    {
      key: "3",
      label: <a onClick={() => Click()}>Đăng xuất</a>,
    },
  ];

  //khai báo model
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  //khai báo menu ẩn
  const onClick = (e) => {
    console.log("click ", e);
  };

  const Click = () => {
    const cookies = document.cookie.split(";");

    // Lặp qua danh sách cookie và xóa từng cookie một
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    window.location.href = "/login";
  };

  const hanldeLinkUser = () => {
    window.location.href = "/information";
  };

  const onSearch = (value, _e, info) => {
    Call_Post_Api(null, null, null, "/product/search/" + value).then((data) => {
      console.log(data.metadata);
      setSearch(data.metadata);
    });
  };

  const text = searchs.length === 0 ? "Chưa có sản phẩm 🎉🎉🎉" : "Sản phẩm 👀✔👀";
  const description = () => {
    return (
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
        {searchs.length === 0 ? (
          <div
            style={{
              color: "#333",
              fontSize: "0.9em",
              textAlign: "center",
              padding: "10px",
            }}
          >
            Vui lòng nhập tên sản phẩm
          </div>
        ) : (
          <table
            style={{
              width: "500px",
              borderCollapse: "collapse",
              borderRadius: "8px",
              backgroundColor: "#ffcccc",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#ff6666", color: "white" }}>
                <th style={{ padding: "8px", textAlign: "left", fontSize: "12px", textAlign: "center" }}>Tên Sản Phẩm</th>
                <th style={{ padding: "8px", textAlign: "left", fontSize: "12px", textAlign: "center" }}>Số Lượng</th>
              </tr>
            </thead>
            <tbody>
              {searchs.map((search, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" }}>
                  <td style={{ border: "1px solid #ddd", padding: "8px", fontSize: "11px" }}>{search.product_name}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", fontSize: "11px" }}>{search.product_quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return (
    <div className={cx("container_")}>
      {contextHolder}
      <Drawer title="Menu" placement="right" onClose={onClose} open={open} width="70%">
        <Tabs
          defaultActiveKey={defau}
          centered
          onChange={(e) => handeTab(e)}
          tabBarStyle={{
            color: "pink",
            marginRight: " 70px",
          }}
          tabPosition="right"
        >
          <Tabs.TabPane
            tab={
              <Link
                style={{
                  color: "#292929",
                }}
                to="/"
              >
                TRANG CHỦ
              </Link>
            }
            key="1"
          />
          <Tabs.TabPane
            tab={
              <Link
                style={{
                  color: "#292929",
                }}
                to="/about"
              >
                GIỚI THIỆU
              </Link>
            }
            key="2"
          />
          <Tabs.TabPane
            tab={
              <Link
                style={{
                  color: "#292929",
                }}
                to="/shop"
              >
                SHOP
              </Link>
            }
            key="3"
          />
          <Tabs.TabPane
            tab={
              <Link
                style={{
                  color: "#292929",
                }}
                to="/blog"
              >
                BLOG
              </Link>
            }
            key="4"
          />
          <Tabs.TabPane
            tab={
              <Link
                style={{
                  color: "#292929",
                }}
                to="/lienhe"
              >
                LIÊN HỆ
              </Link>
            }
            key="5"
          />
          <Tabs.TabPane
            tab={
              <Link
                style={{
                  color: "#292929",
                }}
                to="/lienhe"
              >
                CÂU HỎI KHÁC
              </Link>
            }
            key="6"
          />
          <Tabs.TabPane
            tab={
              <Link
                style={{
                  color: "#292929",
                }}
                to="/login"
              >
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
              <div
                onClick={() => (window.location.href = "/")}
                style={{
                  cursor: "pointer",
                }}
              >
                <img
                  src="http://localhost:3000/static/media/logo-1.0b4e3a18f02ba2d48e78.png"
                  className={cx("img_logo")}
                  style={{
                    borderRadius: "300px",
                    marginRight: "-10px",
                  }}
                />
              </div>
              <div className={cx("header_center")}>
                <Tabs
                  defaultActiveKey={defau}
                  centered
                  onChange={(e) => handeTab(e)}
                  tabBarStyle={{
                    color: "pink",
                  }}
                >
                  <Tabs.TabPane
                    tab={
                      <Link
                        style={{
                          color: "#292929",
                        }}
                        to="/"
                      >
                        TRANG CHỦ
                      </Link>
                    }
                    key="1"
                  />
                  <Tabs.TabPane
                    tab={
                      <Link
                        style={{
                          color: "#292929",
                        }}
                        to="/about"
                      >
                        GIỚI THIỆU
                      </Link>
                    }
                    key="2"
                  />
                  <Tabs.TabPane
                    tab={
                      <Link
                        style={{
                          color: "#292929",
                        }}
                        to="/shop"
                      >
                        SHOP
                      </Link>
                    }
                    key="3"
                  />
                  <Tabs.TabPane
                    tab={
                      <Link
                        style={{
                          color: "#292929",
                        }}
                        to="/blog"
                      >
                        BLOG
                      </Link>
                    }
                    key="4"
                  />
                  <Tabs.TabPane
                    tab={
                      <Link
                        style={{
                          color: "#292929",
                        }}
                        to="/lienhe"
                      >
                        LIÊN HỆ
                      </Link>
                    }
                    key="5"
                  />
                  <Tabs.TabPane
                    tab={
                      <Link
                        style={{
                          color: "#292929",
                        }}
                        to="/lienhe"
                      >
                        CÂU HỎI KHÁC
                      </Link>
                    }
                    key="6"
                  />
                </Tabs>
                {/* <Link
                                    to="/"
                                    style={{
                                        color: 'black',
                                        listStyle: 'none',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <div>TRANG CHỦ</div>
                                </Link>
                                <div>GIỚI THIỆU</div>
                                <Link
                                    to="/shop"
                                    style={{
                                        color: 'black',
                                        listStyle: 'none',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <div>SHOP</div>
                                </Link>
                                <div>BLOG</div>
                                <Link
                                    to="/lienhe"
                                    style={{
                                        color: 'black',
                                        listStyle: 'none',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <div>LIÊN HỆ</div>
                                </Link>
                                <div>CÂU HỎI THƯỜNG GẶP</div>
                                <div>KHÁC</div> */}
              </div>
              <div className={cx("header_right")}>
                <Link
                  to="/cart"
                  style={{
                    color: "black",
                    listStyle: "none",
                    textDecoration: "none",
                  }}
                >
                  <Space
                    size="large"
                    style={{
                      fontSize: "25px",
                      marginLeft: "-50px",
                    }}
                  >
                    <Badge count={ordersLength}>
                      <ShoppingCartOutlined
                        style={{
                          fontSize: "25px",
                        }}
                      />
                    </Badge>
                  </Space>
                </Link>
                {/* <SearchOutlined
                  style={{
                    fontSize: "25px",
                    marginTop: "0px",
                    marginLeft: "-40px",
                  }}
                  onClick={() => handleSearch()}
                /> */}

                <Popconfirm
                  placement="bottom"
                  title={text}
                  description={description}
                  okText="Yes"
                  cancelText="No"
                  style={{ width: "500px" }}
                >
                  <Search
                    placeholder="Nhập sản phẩm .... "
                    onSearch={onSearch}
                    style={{
                      width: 400,
                      marginTop: "5px",
                    }}
                  />
                </Popconfirm>
                {name == undefined ? (
                  <button
                    style={{
                      padding: "5px",
                    }}
                    onClick={() => (window.location.href = "/login")}
                  >
                    Đăng nhập
                  </button>
                ) : (
                  <Dropdown menu={{ items }} placement="bottom" arrow>
                    {img == "" || img == undefined ? (
                      <img
                        src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-avatar-trang-chat-ngau-cute-400x400.jpg"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "100px",
                          marginLeft: "10px",
                        }}
                      />
                    ) : (
                      <div>
                        <img
                          src={img}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "100px",
                          }}
                        />
                      </div>
                    )}
                  </Dropdown>
                )}
              </div>

              {/* Menu */}
              <div className={cx("menu")}>
                <Link
                  to="/cart"
                  style={{
                    color: "black",
                    listStyle: "none",
                    textDecoration: "none",
                    marginRight: "20px",
                  }}
                >
                  <Space
                    size="large"
                    style={{
                      fontSize: "25px",
                      marginLeft: "-40px",
                    }}
                  >
                    <Badge count={ordersLength}>
                      <ShoppingCartOutlined
                        style={{
                          fontSize: "25px",
                        }}
                      />
                    </Badge>
                  </Space>
                </Link>
                <MenuOutlined
                  style={{
                    fontSize: "25px",
                  }}
                  onClick={showDrawer}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
