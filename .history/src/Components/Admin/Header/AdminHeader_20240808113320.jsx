import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  MdOutlineMenuOpen,
  MdOutlineMenu,
  MdLightMode,
  MdDarkMode,
  MdContactMail,
} from "react-icons/md";
import { FaBell } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Cookies from "js-cookie";
import Logout from "@mui/icons-material/Logout";
import logo from "../../../access/logo-1.png";
import avatarAdmin from "../../../access/avatarAdmin.jpg";
import SearchBox from "./SeachBox/SearchBox";
import { Divider } from "@mui/material";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Badge, message } from "antd";
import ThemeConText from "../../../config/themeConText";
// import { AdminContext } from "./AdminContext/AdminContext";
const AdminHeader = () => {
  const ENDPOINT = "http://localhost:4000";
  const [theme, setTheme] = useState("light");
  const [messageApi, contextHolder] = message.useMessage();
  const [themeContext, ordersLength, isToggled, setIsToggled] =
    useContext(ThemeConText);
  const navigate = useNavigate();
  const [menu, setMenu] = useState(true);
  const [noti, setNoti] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotificationDrop, setIsOpenNotificationDrop] = useState(null);
  const openMyAcc = Boolean(anchorEl);
  const openNotifications = Boolean(isOpenNotificationDrop);
  const handleOpenMyAcc = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorEl(null);
  };
  const handleCloseNotificationDrop = () => {
    setIsOpenNotificationDrop(null);
  };
  const handleOpenNotificationDrop = (e) => {
    setIsOpenNotificationDrop(e.currentTarget);
  };
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);

    newSocket.on("notification", (data) => {
      console.log(data);
      setNoti([...noti, data]);
      messageApi.open({
        type: "success",
        content: `${data.email} đã gửi cho bạn 1 tin nhắn`,
      });
    });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);
  const [showText, setShowText] = useState(false);
  const Admin = Cookies.get("name")?.replace(/"/g, "");
  const handleClickMenu = () => {
    setIsToggled(!isToggled);
    console.log(isToggled);
    // setMenu(!menu);
    setShowText(!showText);
  };
  return (
    <div>
      {contextHolder}

      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center ">
            {/* logo */}
            <div className="col-sm-2 part1">
              <Link to="/admin" className="d-flex align-items-center logo">
                <img src={logo} alt="logo-2be" />
                {showText && (
                  <span style={{ marginLeft: "8px" }}>2BE Flower</span>
                )}
              </Link>
            </div>

            <div className="col-sm-3 d-flex align-items-center part2 pi-4">
              <Button className="rounded-circle" onClick={handleClickMenu}>
                {isToggled ? <MdOutlineMenuOpen /> : <MdOutlineMenu />}
              </Button>
              <SearchBox />
            </div>

            <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
              <Button className="rounded-circle mr-3" onClick={toggleTheme}>
                {theme === "light" ? <MdLightMode /> : <MdDarkMode />}
              </Button>
              <Button className="rounded-circle mr-3">
                <MdContactMail />
              </Button>
              <Button
                className="rounded-circle mr-3"
                onClick={handleOpenNotificationDrop}
              >
                <Badge count={noti.length}>
                  <FaBell />
                </Badge>
              </Button>
              <div>
                <Menu
                  anchorEl={isOpenNotificationDrop}
                  className="notifications dropdown_list"
                  id="notifications"
                  open={openNotifications}
                  onClose={handleCloseNotificationDrop}
                  onClick={handleCloseNotificationDrop}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      width: 300,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <div className="head pb-0">
                    <h4>Notifications (34)</h4>
                  </div>
                  <Divider className="mb-1" />
                  <div className="scroll">
                    <MenuItem onClick={handleCloseNotificationDrop}>
                      {noti?.map((item) => (
                        <Link to="/admin/message">
                          <div className="d-flex ">
                            <div>
                              <div className="userImg">
                                <span className="rounded-circle">
                                  <img alt="avt-admin" src={avatarAdmin} />
                                </span>
                              </div>
                            </div>
                            <div className="dropdownInfo">
                              <h4>
                                <span>
                                  <b>{item?.email}</b>
                                  gửi cho bạn tin nhắn:
                                  <b> {item?.message}</b>
                                </span>
                              </h4>
                              <p className="text-sky">few seconds ago</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </MenuItem>
                  </div>
                  <div
                    className="w-100"
                    style={{ padding: 8, paddingBottom: 0 }}
                  >
                    <Button className="btn-blue w-100">
                      View all notifications
                    </Button>
                  </div>
                </Menu>
              </div>

              <div className="myAccWrapper">
                <Button
                  className="myAcc d-flex align-items-center"
                  onClick={handleOpenMyAcc}
                >
                  <div className="userImg">
                    <span className="rounded-circle">
                      <img alt="avt-admin" src={avatarAdmin} />
                    </span>
                  </div>

                  <div className="userInfo">
                    <h4>{Admin}</h4>
                    <p className="mb-0">@Admin</p>
                  </div>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openMyAcc}
                  onClose={handleCloseMyAcc}
                  onClick={handleCloseMyAcc}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {/* <MenuItem onClick={handleCloseMyAcc}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    My account
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseMyAcc}
                    style={{ color: "#ffa000" }}
                  >
                    <ListItemIcon style={{ color: "#  " }}>
                      <IoShieldHalfSharp fontSize="small" />
                    </ListItemIcon>
                    Reset password
                  </MenuItem> */}
                  <MenuItem
                    onClick={() => {
                      const cookies = document.cookie.split(";");
                      cookies.forEach((cookie) => {
                        const eqPos = cookie.indexOf("=");
                        const name =
                          eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                        document.cookie =
                          name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                      });
                      navigate("/login");
                    }}
                    style={{ color: "red" }}
                  >
                    <ListItemIcon style={{ color: "red" }}>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Đăng xuất
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
