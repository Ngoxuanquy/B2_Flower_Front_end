import React, { useContext, useEffect, useState } from "react";
import { MdContactMail, MdDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaBoltLightning, FaCircleUser } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import SideBarItem from "../SideBarItem/SideBarItem";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { TbLogout } from "react-icons/tb";
import { Call_Post_Api } from "../../CallApi/CallApis";
import Cookies from "js-cookie";
import ThemeConText from "../../../config/themeConText";

const Sidebar = () => {
  const [openItem, setOpenItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [roles, setRoles] = useState([]);
  const [themeContext, ordersLength, isToggled, setIsToggled] =
    useContext(ThemeConText);
  const navigate = useNavigate();

  const handleItemClick = (primary) => {
    setOpenItem(primary === openItem ? null : primary);
    setActiveItem(primary);
  };

  const handleSubItemClick = (subItem) => {
    console.log(`Clicked on subItem: ${subItem}`);
    navigate(`/admin/${subItem.toLowerCase().replace(/ /g, "-")}`);
  };

  const handleNavigation = (path, primary) => {
    setActiveItem(primary);
    navigate(path);
  };

  const handleLogout = () => {
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
    navigate("/login");
  };

  useEffect(() => {
    const token = Cookies.get("accessToken")?.replace(/"/g, "");
    const id = Cookies.get("id")?.replace(/"/g, "");

    Call_Post_Api(null, token, id, `/shop/get_roles/${id}`, "GET")
      .then((data) => {
        setRoles(data.metadata);
      })
      .catch((err) => console.log({ err }));
  }, []);

  if (isToggled) {
    return null;
  }

  return (
    <div className="sidebar">
      {roles.includes("ADMIN") && (
        <SideBarItem
          icon={<MdDashboard />}
          primary="Bảng điều khiển"
          onItemClick={() => handleNavigation("/admin/dash-board", "Dashboard")}
          isOpen={openItem === "Dashboard"}
          isActive={activeItem === "Dashboard"}
        />
      )}
      {(roles.includes("READ") ||
        roles.includes("ADMIN") ||
        roles.includes("CREATE")) && (
        <SideBarItem
          icon={<AiFillProduct />}
          primary="Sản phẩm"
          subItems={
            roles.includes("ADMIN")
              ? ["Danh sách sản phẩm", "Thêm sản phẩm"]
              : roles.includes("CREATE")
              ? ["Thêm sản phẩm"]
              : roles.includes("READ")
              ? ["Danh sách sản phẩm"]
              : []
          }
          onItemClick={() => handleItemClick("Products")}
          onSubItemClick={handleSubItemClick}
          isOpen={openItem === "Products"}
          isActive={activeItem === "Products"}
        />
      )}
      {roles.includes("ADMIN") && (
        <SideBarItem
          icon={<BsCartCheckFill />}
          primary="Đơn hàng"
          subItems={[
            "Danh sách đơn hàng",
            "Đơn hàng đã gửi",
            "Đơn hàng đã giao",
          ]}
          onItemClick={() => handleItemClick("Order")}
          onSubItemClick={handleSubItemClick}
          isOpen={openItem === "Order"}
          isActive={activeItem === "Order"}
        />
      )}
      {(roles.includes("ADMIN") || roles.includes("DISCOUNT")) && (
        <SideBarItem
          icon={<FaCircleUser />}
          primary="Người dùng"
          subItems={["Danh sách người dùng"]}
          onItemClick={() => handleItemClick("User")}
          onSubItemClick={handleSubItemClick}
          isOpen={openItem === "User"}
          isActive={activeItem === "User"}
        />
      )}
      {(roles.includes("ADMIN") || roles.includes("CHAT")) && (
        <SideBarItem
          icon={<MdContactMail />}
          primary="Tin nhắn"
          onItemClick={() => handleNavigation("/admin/message", "Message")}
          isOpen={openItem === "Message"}
          isActive={activeItem === "Message"}
        />
      )}
      {(roles.includes("DESTROYFLOWERS") || roles.includes("ADMIN")) && (
        <SideBarItem
          icon={<FaBoltLightning />}
          primary="Yêu cầu hủy sản phẩm"
          subItems={
            roles.includes("ADMIN")
              ? ["Danh sách hủy hoa", "Danh sách đã duyệt"]
              : null
          }
          onItemClick={() => handleItemClick("Yêu cầu hủy sản phẩm")}
          onSubItemClick={handleSubItemClick}
          isOpen={openItem === "Yêu cầu hủy sản phẩm"}
          isActive={activeItem === "Yêu cầu hủy sản phẩm"}
        />
      )}
      <div className="logoutWrapper">
        <div className="logoutBox">
          <Button variant="contained" onClick={handleLogout}>
            <TbLogout />
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
