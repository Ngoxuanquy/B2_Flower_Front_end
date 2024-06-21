import React, { useEffect, useState } from "react";
import { MdContactMail, MdDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaBell, FaCircleUser } from "react-icons/fa6";
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
  const [roles, setRoles] = useState([]);

  const navigate = useNavigate();

  const handleItemClick = (primary) => {
    setOpenItem(primary === openItem ? null : primary);
    console.log("open ", primary);
    // navigate(`/admin/${primary}`);
  };

  const handleSubItemClick = (subItem) => {
    console.log(`Clicked on subItem: ${subItem}`);
    navigate();
  };

  const handleOpenDashBroad = (primary) => {
    setOpenItem(primary);
    navigate("/admin/dash-board");
    console.log("Open Dashboard", primary);
  };

  const handleOpenMessage = () => {
    navigate("/admin/message");
  };

  const handleOpentProduct = () => {
    navigate("/admin/products");
  };

  // const handleOpentUser = () => {
  //   navigate("/admin/user");
  // };

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
    <div
      className="sidebar"
      style={{
        marginTop: "80px",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      {roles.includes("ADMIN") && (
        <SideBarItem
          icon={<MdDashboard />}
          primary="Dashboard"
          onItemClick={handleOpenDashBroad}
          isOpen={openItem === "Dashboard"}
        />
      )}

      {roles.includes("ADMIN") && (
        <SideBarItem
          icon={<IoMdLock />}
          primary="Authentication"
          subItems={["Starred", "Starred"]}
          onItemClick={handleItemClick}
          onSubItemClick={handleSubItemClick}
          isOpen={openItem === "Authentication"}
        />
      )}

      {(roles.includes("READ") || roles.includes("ADMIN")) && (
        <SideBarItem
          icon={<AiFillProduct />}
          primary="Products"
          subItems={
            roles.includes("READ")
              ? ["Product List", "Product View"]
              : ["Product List", "Product View", "Product Upload"]
          }
          onItemClick={handleOpentProduct}
          onSubItemClick={handleSubItemClick}
          isOpen={openItem === "Products"}
        />
      )}
      {roles.includes("ADMIN") && (
        <SideBarItem
          icon={<BsCartCheckFill />}
          primary="Order"
          subItems={["Product 1", "Product 2", "Product 3"]}
          onItemClick={handleItemClick}
          onSubItemClick={handleSubItemClick}
          isOpen={openItem === "Order"}
        />
      )}

      {roles.includes("ADMIN") && (
        <SideBarItem
          icon={<FaCircleUser />}
          primary="User"
          subItems={["User List", "User Profile", "My Account"]}
          onItemClick={handleItemClick}
          onSubItemClick={handleSubItemClick}
          isOpen={openItem === "User"}
        />
      )}

      {roles.includes("ADMIN") && (
        <SideBarItem
          icon={<MdContactMail />}
          primary="Message"
          onItemClick={handleOpenMessage}
          isOpen={openItem === "Message"}
        />
      )}

      {roles.includes("ADMIN") && (
        <SideBarItem
          icon={<FaBell />}
          primary="Notification"
          onItemClick={handleItemClick}
          isOpen={openItem === "Notification"}
        />
      )}

      {roles.includes("ADMIN") && (
        <SideBarItem
          icon={<IoSettings />}
          primary="Setting"
          onItemClick={handleItemClick}
          isOpen={openItem === "Setting"}
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
