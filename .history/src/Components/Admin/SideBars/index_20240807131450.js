import React, { useEffect, useState } from "react";
import { MdContactMail, MdDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaBell, FaBoltLightning, FaCircleUser } from "react-icons/fa6";
import { BsCartCheckFill } from "react-icons/bs";
import SideBarItem from "../SideBarItem/SideBarItem";
import { IoSettings } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { TbLogout } from "react-icons/tb";
import { Call_Post_Api } from "../../CallApi/CallApis";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [openItem, setOpenItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [roles, setRoles] = useState([]);

  const navigate = useNavigate();

  const handleItemClick = (primary) => {
    setOpenItem(primary === openItem ? null : primary);
    setActiveItem(primary); // Set active item
    console.log("open ", primary);
    // navigate(`/admin/${primary}`);
  };

  const handleSubItemClick = (subItem) => {
    console.log(`Clicked on subItem: ${subItem}`);
    navigate();
  };

  const handleDiscount = (primary) => {
    setActiveItem("Discount");
    navigate("/admin/discount");
  };

  const handleCancelProducts = (primary) => {
    setActiveItem("Yêu cầu hủy sản phẩm");
    navigate("/admin/cancelProduct");
  };

  const handleOpenDashBroad = (primary) => {
    setOpenItem(primary);
    setActiveItem(primary); // Set active item
    navigate("/admin/dash-board");
    console.log("Open Dashboard", primary);
  };

  const handleOpenMessage = () => {
    setActiveItem("Message"); // Set active item
    navigate("/admin/message");
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(
      null,
      cleanedJwtString,
      cleanId,
      `/shop/get_roles/${cleanId}`,
      "GET"
    )
      .then((data) => {
        setRoles(data.metadata);
        console.log(data);
      })
      .catch((err) => console.log({ err }));
  }, []);

  return (
    <div className="sidebar">
      {roles.includes("ADMIN") && (
        <SideBarItem
          icon={<MdDashboard />}
          primary="Bảng điều khiển"
          onItemClick={handleOpenDashBroad}
          isOpen={openItem === "Dashboard"}
          isActive={activeItem === "Dashboard"} // Set active state
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
              ? ["Danh sách sản phẩm", "Thêm sảm phẩm"]
              : roles.includes("CREATE")
              ? ["Thêm sảm phẩm"]
              : roles.includes("READ")
              ? ["Danh sách sản phẩm"]
              : []
          }
          onItemClick={handleItemClick}
          onSubItemClick={handleSubItemClick}
          isOpen={openItem === "Products"}
          isActive={activeItem === "Products"} // Set active state
        />
      )}

      {roles.includes("ADMIN") && (
        <SideBarItem
          icon={<BsCartCheckFill />}
          primary="Đơn hàng"
          subItems={["Orders List", "Orders Sent", "Sản phẩm đã giao"]}
          onItemClick={handleItemClick}
          onSubItemClick={handleSubItemClick}
          isOpen={openItem === "Order"}
          isActive={activeItem === "Order"} // Set active state
        />
      )}

      {(roles.includes("ADMIN") || roles.includes("DISCOUNT")) && (
        <SideBarItem
          icon={<FaCircleUser />}
          primary="User"
          subItems={["User List"]}
          onItemClick={handleItemClick}
          onSubItemClick={handleSubItemClick}
          isOpen={openItem === "User"}
          isActive={activeItem === "User"} // Set active state
        />
      )}

      {(roles.includes("ADMIN") || roles.includes("CHAT")) && (
        <SideBarItem
          icon={<MdContactMail />}
          primary="Message"
          onItemClick={handleOpenMessage}
          isOpen={openItem === "Message"}
          isActive={activeItem === "Message"} // Set active state
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
          onItemClick={handleCancelProducts}
          onSubItemClick={handleSubItemClick}
          isOpen={openItem === "Yêu cầu hủy sản phẩm"}
          isActive={activeItem === "Yêu cầu hủy sản phẩm"} // Set active state
        />
      )}

      {roles.includes("ADMIN") && (
        <SideBarItem
          icon={<FaBell />}
          primary="Discount"
          onItemClick={handleDiscount}
          isOpen={openItem === "Discount"}
          isActive={activeItem === "Discount"} // Set active state
        />
      )}

      <div className="logoutWrapper">
        <div className="logoutBox">
          <Button
            variant="contained"
            onClick={() => {
              const cookies = document.cookie.split(";");
              cookies.forEach((cookie) => {
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie =
                  name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
              });
              navigate("/login");
            }}
          >
            <TbLogout />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
