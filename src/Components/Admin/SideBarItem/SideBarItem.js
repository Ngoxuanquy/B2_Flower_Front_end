import React, { useState, useEffect } from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

const SideBarItem = ({
  icon,
  primary,
  subItems,
  onItemClick,
  onSubItemClick,
  isOpen,
}) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClick = () => {
    setOpen(!open);
    onItemClick && onItemClick(primary);
  };

  const handleSubItemClick = (subItem) => {
    onSubItemClick(subItem);
  };

  return (
    <div>
      <List
        sx={{
          padding: 0,
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon className="icon">{icon}</ListItemIcon>
          <ListItemText primary={primary} className="text-sidebar" />
          {subItems && subItems.length > 0 ? (
            open ? (
              <FaAngleDown />
            ) : (
              <FaAngleRight />
            )
          ) : null}
        </ListItemButton>
        {subItems && subItems.length > 0 && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {subItems.map((subItem, index) => (
                <ListItemButton
                  key={index}
                  sx={{ pl: 4 }}
                  onClick={() => handleSubItemClick(subItem)}
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
