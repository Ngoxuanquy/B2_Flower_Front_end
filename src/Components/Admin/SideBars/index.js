import React, { useState } from "react";
import { MdContactMail, MdDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaBell, FaCircleUser } from "react-icons/fa6";
import { BsCartCheckFill } from "react-icons/bs";
import SideBarItem from "../SideBarItem/SideBarItem";
import { IoSettings } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [openItem, setOpenItem] = useState(null);
  const navigate = useNavigate();

  const handleItemClick = (primary) => {
    setOpenItem(primary === openItem ? null : primary);
    console.log("open ", primary);
    navigate(`/admin/${primary}`);
  };

  const handleSubItemClick = (subItem) => {
    console.log(`Clicked on subItem: ${subItem}`);
  };
  const handleOpenDashBroad = (primary) => {
    setOpenItem(primary);
    console.log("Open Dashboard", primary);
  };

  return (
    <div className="sidebar">
      <SideBarItem icon={<MdDashboard />} primary="Dashboard" onItemClick={handleOpenDashBroad} isOpen={openItem === "Dashboard"} />
      <SideBarItem
        icon={<IoMdLock />}
        primary="Authentication"
        subItems={["Starred", "Starred"]}
        onItemClick={handleItemClick}
        onSubItemClick={handleSubItemClick}
        isOpen={openItem === "Authentication"}
      />
      <SideBarItem
        icon={<AiFillProduct />}
        primary="Products"
        subItems={["Product 1", "Product 2", "Product 3"]}
        onItemClick={handleItemClick}
        onSubItemClick={handleSubItemClick}
        isOpen={openItem === "Products"}
      />
      <SideBarItem
        icon={<BsCartCheckFill />}
        primary="Order"
        subItems={["Product 1", "Product 2", "Product 3"]}
        onItemClick={handleItemClick}
        onSubItemClick={handleSubItemClick}
        isOpen={openItem === "Order"}
      />
      <SideBarItem
        icon={<FaCircleUser />}
        primary="User"
        subItems={["User List", "User Profile ", "My Account"]}
        onItemClick={handleItemClick}
        onSubItemClick={handleSubItemClick}
        isOpen={openItem === "User"}
      />
      <SideBarItem icon={<MdContactMail />} primary="Message" onItemClick={handleItemClick} isOpen={openItem === "Message"} />
      <SideBarItem icon={<FaBell />} primary="Notification" onItemClick={handleItemClick} isOpen={openItem === "Notification"} />
      <SideBarItem icon={<IoSettings />} primary="Setting" onItemClick={handleItemClick} isOpen={openItem === "Setting"} />
    </div>
  );
};

export default Sidebar;
