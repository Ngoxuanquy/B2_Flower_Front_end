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

const ENDPOINT = "https://chat-b2-flower.onrender.com";
const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  const [apis, setApi] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [theme, ordersLength] = useContext(ThemeConText);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const testId = Cookies.get("id");
  const testCleanId = testId?.replace(/^"|"$/g, "");
  const [roomId, setRoomId] = useState("");
  const socketRef = useRef();

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

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/^"|"$/g, "");
    const cleanId = id?.replace(/^"|"$/g, "");

    const requestOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
        authorization: cleanedJwtString,
        "x-client-id": cleanId,
      },
    };

    // Lấy dữ liệu của khách hàng
    fetch(URL + "/users/userId/" + cleanId, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setApi(res.metadata);
      });
  }, []);

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);

    newSocket.on("message", ({ cleanId, message }) => {
      console.log({ cleanId });
      console.log({ message });
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: cleanId,
          message: message,
        },
      ]);
    });

    newSocket.on("notification", (data) => {
      messageApi.open({
        type: "success",
        content: data.message,
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", roomId);
    }
  }, [roomId, socket]);

  const handleOpentChat = (id) => {
    if (id) {
      setRoomId(id);
      fetchMessages(id);
      setMessages([]);
    }
  };

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const id = Cookies.get("id");
      const cleanId = id?.replace(/^"|"$/g, "");

      socket.emit("message", { cleanId, roomId, message: messageInput });

      const requestOptions = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: roomId,
          message: {
            message: messageInput,
            id: cleanId,
          },
          name: "admin",
          email: "admin",
        }),
      };
      fetch("https://chat-b2-flower.onrender.com/v1/api/chat/create", requestOptions)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setMessageInput("");
        });
    }
  };

  const fetchMessages = async (id) => {
    try {
      const response = await fetch("https://chat-b2-flower.onrender.com/v1/api/chat/getMessageUser/" + id);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const messages = await response.json();
      console.log(messages);
      setMessages(messages.metadata.message);
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  };

  const showDrawer = () => {
    const id = Cookies.get("id");
    const cleanId = id?.replace(/^"|"$/g, "");
    if (cleanId) {
      setRoomId(cleanId);
      setOpen(true);
      fetchMessages(cleanId);
    }
  };

  const onClose = () => {
    setOpen(false);
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
