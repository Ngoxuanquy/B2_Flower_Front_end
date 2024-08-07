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
import { FaShoppingCart, FaBell } from "react-icons/fa";
import { IoShieldHalfSharp } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import logo from "../../../access/logo-1.png";
import SearchBox from "./SeachBox/SearchBox";
import { Divider } from "@mui/material";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Badge, message } from "antd";
import ThemeConText from "../../../config/themeConText";
const AdminHeader = () => {
  const ENDPOINT = "http://localhost:4000";
  const [theme, setTheme] = useState("light");
  const [messageApi, contextHolder] = message.useMessage();
  const context = useContext(ThemeConText);
  const navigate = useNavigate();

  const [menu, setMenu] = useState(true);
  const [noti, setNoti] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotificationDrop, setIsOpenNotificationDrop] = useState(null);
  const openMyAcc = Boolean(anchorEl);
  const openNotifications = Boolean(isOpenNotificationDrop);

  console.log(context.isToggled);
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
  const [showText, setShowText] = useState(true);

  const handleClickMenu = () => {
    context.setIsToggled(!context.isToggled);
    console.log(context.isToggled);
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
                {context.isToggled ? <MdOutlineMenuOpen /> : <MdOutlineMenu />}
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
                                  <img
                                    alt="avt-admin"
                                    src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/401833912_1372698800004765_8461095991256187070_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHfexlhAnZppZ8X5yrIKWYVgbfefhm5-jOBt95-Gbn6M-H0C2bRFEmCzostuH_LgeEbtT1-GgxppCQqi729ubHn&_nc_ohc=BsyFj6CiEakQ7kNvgHwGC_T&_nc_ht=scontent.fhan2-4.fna&oh=00_AYDBm-km-HwD10to2zKuSlosM52pQqrmZdC_r3mnKcUBKA&oe=666343BF"
                                  />
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
                      <img
                        alt="avt-admin"
                        src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/401833912_1372698800004765_8461095991256187070_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHfexlhAnZppZ8X5yrIKWYVgbfefhm5-jOBt95-Gbn6M-H0C2bRFEmCzostuH_LgeEbtT1-GgxppCQqi729ubHn&_nc_ohc=BsyFj6CiEakQ7kNvgHwGC_T&_nc_ht=scontent.fhan2-4.fna&oh=00_AYDBm-km-HwD10to2zKuSlosM52pQqrmZdC_r3mnKcUBKA&oe=666343BF"
                      />
                    </span>
                  </div>

                  <div className="userInfo">
                    <h4>Admin</h4>
                    <p className="mb-0">@congtusjr</p>
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
