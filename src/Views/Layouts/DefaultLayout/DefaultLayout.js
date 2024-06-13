import { Header, Footer } from "../../../Components";

import classNames from "classnames/bind";
import styles from "./defaultlayout.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { FloatButton, Drawer, Input, Button, List, message, Space } from "antd";
import { CommentOutlined, CustomerServiceOutlined, DashboardOutlined } from "@ant-design/icons";
import socketIOClient from "socket.io-client";
import Cookies from "js-cookie";
import ThemeConText from "../../../config/themeConText";
import { EventRegister } from "react-event-listeners";

const ENDPOINT = "http://localhost:4000";
const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  const [theme, ordersLength] = useContext(ThemeConText);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const testId = Cookies.get("id");
  const testCleanId = testId?.replace(/^"|"$/g, "");
  const socketRef = useRef();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [isCustomerServiceClicked, setIsCustomerServiceClicked] = useState(false);
  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const handleDarkmode = () => {
    console.log(theme);
    EventRegister.emit("changeTheme", theme.theme === "dark" ? false : true);
  };

  const handleCustomerServiceClick = () => {
    setIsCustomerServiceClicked(!isCustomerServiceClicked);
    handleDarkmode();
  };

  const handleCommentClick = () => {
    setIsCommentClicked(!isCommentClicked);
  };

  const sendMessage = (e) => {
    // socket.emit('message', input);
  };

  return (
    <div className={cx("container_")}>
      <Header />
      {children}
      <Footer />
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        icon={
          <CustomerServiceOutlined
            style={{
              color: isCustomerServiceClicked ? "blue" : "inherit",
            }}
          />
        }
      >
        <FloatButton
          onClick={handleCustomerServiceClick}
          icon={
            <DashboardOutlined
              style={{
                color: isCustomerServiceClicked ? "blue" : "inherit",
              }}
            />
          }
        />
        <FloatButton
          onClick={showDrawer}
          icon={
            <CommentOutlined
              style={{
                color: isCommentClicked ? "blue" : "inherit",
              }}
            />
          }
        />
      </FloatButton.Group>
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <ul id="messages">
          {messages.map((msg, index) => (
            <li key={index}>{msg.content}</li>
          ))}
        </ul>
        <Space.Compact
          style={{
            width: "100%",
            position: "absolute",
            bottom: "2px",
            left: "0px",
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              height: "40px",
            }}
          />
          <Button
            type="primary"
            style={{
              height: "40px",
            }}
            onClick={sendMessage}
          >
            Submit
          </Button>
        </Space.Compact>
      </Drawer>
      <Drawer title="Chat" onClose={onClose} open={open}>
        <List
          dataSource={messages}
          renderItem={(item) => (
            <List.Item
              className={cx({
                right: item.id === testCleanId,
                left: item.id !== testCleanId,
              })}
            >
              {item?.message}
            </List.Item>
          )}
          style={{ maxHeight: "60vh", overflow: "auto" }}
        />
        <Input.TextArea
          rows={4}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onPressEnter={sendMessage}
          placeholder="Type your message..."
        />
        <Button type="primary" onClick={sendMessage} style={{ marginTop: 10 }}>
          Send
        </Button>
      </Drawer>
      {/* <ButtomNavigation /> */}
    </div>
  );
};

export default DefaultLayout;
