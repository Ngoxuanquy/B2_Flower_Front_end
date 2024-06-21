import { Header, Footer } from "../../../Components";

import classNames from "classnames/bind";
import styles from "./defaultlayout.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { FloatButton, Drawer, Input, Button, List, message, Space, Badge, ColorPicker } from "antd";
import { CommentOutlined, CustomerServiceOutlined, DashboardOutlined } from "@ant-design/icons";
import socketIOClient from "socket.io-client";
import Cookies from "js-cookie";
import ThemeConText from "../../../config/themeConText";
import { EventRegister } from "react-event-listeners";

// const ENDPOINT = "https://chat-b2-flower.onrender.com";
const ENDPOINT = "http://localhost:4000";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  const URL = process.env.REACT_APP_URL;

  const [countMessage, setCountMessage] = useState();
  const [socket, setSocket] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [theme, ordersLength] = useContext(ThemeConText);
  const [open, setOpen] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [test, setTest] = useState(false);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const testId = Cookies.get("id");
  const testCleanId = testId?.replace(/^"|"$/g, "");
  const [roomId, setRoomId] = useState("");
  const socketRef = useRef();

  const [isCustomerServiceClicked, setIsCustomerServiceClicked] = useState(false);
  const [isCommentClicked, setIsCommentClicked] = useState(false);

  const [colorText, setColorText] = useState("#000000");
  const [colorButton, setColorButton] = useState("rgb(253, 124, 147)");
  const [colorBackground, setColorBackground] = useState("#ffffff");

  const handleTextColorChange = (color) => {
    setColorText(color.toHexString());
  };

  const handleButtonColorChange = (color) => {
    setColorButton(color.toHexString());
  };

  const handleBackgroundColorChange = (color) => {
    setColorBackground(color.toHexString());
  };

  const handleDarkmode = () => {
    console.log(theme);
    console.log(test);
    setTest(!test);
    // EventRegister.emit("changeTheme", theme.theme === "dark" ? false : true);
    EventRegister.emit("changeupdateTheme", {
      theme: test ? "dark" : "light",
      colorBackground: colorBackground,
      colorButton: colorButton,
      colorText: colorText,
    });
  };

  const handleCustomerServiceClick = () => {
    setOpenColor(true);
    setIsCustomerServiceClicked(!isCustomerServiceClicked);
    // handleDarkmode();
  };

  const handleCommentClick = () => {
    setIsCommentClicked(!isCommentClicked);
  };

  const getApi = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/^"|"$/g, "");
    const cleanId = id?.replace(/^"|"$/g, "");

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
        authorization: cleanedJwtString,
        "x-client-id": cleanId,
      },
    };

    // Lấy dữ liệu của khách hàng
    fetch(URL + "/users/countMessage/" + cleanId, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.metadata);
        setCountMessage(res.metadata.countMessage);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);

    newSocket.on("message", ({ cleanId, message }) => {
      const token = Cookies.get("accessToken");
      const id = Cookies.get("id");
      const cleanedJwtString = token?.replace(/^"|"$/g, "");
      const Idclean = id?.replace(/^"|"$/g, "");

      setCountMessage((prevCountMessage) => {
        const newCountMessage = prevCountMessage !== undefined && prevCountMessage !== null ? prevCountMessage + 1 : 1;

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_API_KEY,
            authorization: cleanedJwtString,
            "x-client-id": Idclean,
          },
          body: JSON.stringify({
            id: Idclean,
            count: newCountMessage,
          }),
        };

        fetch(URL + "/shop/updateCountMessage", requestOptions)
          .then((res) => res.json())
          .then((res) => {
            console.log({ res });
          });

        return newCountMessage;
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: cleanId,
          message: message,
        },
      ]);
    });
    newSocket.on("notification", (data) => {
      console.log(data);
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
      const name = Cookies.get("name")?.replace(/"/g, "");

      socket.emit("message", { cleanId, roomId, message: messageInput });
      const notificationMessage = {
        email: `${name} `,
        message: messageInput,
      };
      socket.emit("globalNotification", notificationMessage);

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

  const onCloseColor = () => {
    setOpenColor(false);
  };

  return (
    <div className={cx("container_")}>
      {contextHolder}
      <Header colorHeader={colorButton} />
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
        <Badge count={countMessage}>
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
        </Badge>
      </FloatButton.Group>
      <Drawer title="Basic Drawer" onClose={onCloseColor} open={openColor}>
        <div>
          <div>
            <ColorPicker defaultValue="#000000" onChange={handleTextColorChange} />
            <span> Text: {colorText}</span>
          </div>
          <div>
            <ColorPicker defaultValue="rgb(253, 124, 147)" onChange={handleButtonColorChange} />
            <span> Button: {colorButton}</span>
          </div>
          <div>
            <ColorPicker defaultValue="#ffffff" onChange={handleBackgroundColorChange} />
            <span> Background: {colorBackground}</span>
          </div>
        </div>

        <Button type="primary" onClick={handleDarkmode}>
          Cập nhật
        </Button>
      </Drawer>
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
      <Drawer title="Chat với admin" onClose={onClose} open={open}>
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
          style={{ maxHeight: "75vh", overflow: "auto" }}
        />
        <div
          style={{
            position: "fixed",
            bottom: "0px",
            width: "340px",
          }}
        >
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
        </div>
      </Drawer>
      {/* <ButtomNavigation /> */}
    </div>
  );
};

export default DefaultLayout;
