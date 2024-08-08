import React, { useState, useEffect, useContext } from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./SideBarItem.module.scss";
import classNames from "classnames/bind";
import ThemeConText from "../../../config/themeConText";
const SideBarItem = ({
  icon,
  primary,
  subItems,
  onItemClick,
  onSubItemClick,
  isOpen,
  isActive,
}) => {
  const [open, setOpen] = useState(isOpen);
  const navigate = useNavigate(); // Initialize useNavigate
  const cx = classNames.bind(styles);
  const [themeContext, ordersLength, isToggled, setIsToggled] =
    useContext(ThemeConText);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClick = () => {
    setOpen(!open);
    onItemClick && onItemClick(primary);
  };

  const handleSubItemClick = (subItem) => {
    onSubItemClick(subItem);
    navigate(`/admin/${subItem.replace(/\s+/g, "-").toLowerCase()}`); // Navigate to the route
  };

  return (
    <div>
      <List
        sx={{
          padding: "5px",
          width: "100%",

          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon className="icon">{icon}</ListItemIcon>
          {!isToggled && (
            <ListItemText primary={primary} className="text-sidebar" />
          )}

          {!isToggled &&
            subItems &&
            subItems.length > 0 &&
            (open ? <FaAngleDown /> : <FaAngleRight />)}
        </ListItemButton>
        {subItems && subItems.length > 0 && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {subItems.map((subItem, index) => (
                <ListItemButton
                  key={index}
                  sx={{ pl: 4 }}
                  onClick={() => handleSubItemClick(subItem)}
                  className={cx(`${isActive ? "active" : ""}`)}
                >
                  <ListItemText primary={subItem} className="list-item" />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </List>
    </div>
  );
};

export default SideBarItem;
