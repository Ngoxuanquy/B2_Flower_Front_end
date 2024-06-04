import { Header, Footer } from "../../../Components";

import classNames from "classnames/bind";
import styles from "./defaultlayout.module.scss";
import { useEffect, useState } from "react";
import { FloatButton, Drawer, Input, Button, List, message } from "antd";
import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import socketIOClient from "socket.io-client";
import Cookies from "js-cookie";

const ENDPOINT = "http://localhost:4000";
const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  const [apis, setApi] = useState([]);
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const testId = Cookies.get("id");
  const testCleanId = testId?.replace(/^"|"$/g, "");

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
      fetch("http://localhost:4000/v1/api/chat/create", requestOptions)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setMessageInput("");
        });
    }
  };

  const fetchMessages = async (id) => {
    try {
      const response = await fetch("http://localhost:4000/v1/api/chat/getMessageUser/" + id);
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
      {contextHolder}
      <Header />
      {children}
      <Footer />
      <>
        <FloatButton.Group
          trigger="click"
          type="primary"
          style={{
            right: 24,
          }}
          icon={<CustomerServiceOutlined />}
        >
          <FloatButton />
          <FloatButton icon={<CommentOutlined />} onClick={showDrawer} />
        </FloatButton.Group>
      </>
      <Drawer title="Chat" onClose={onClose} open={open}>
        <List
          dataSource={messages}
          renderItem={(item) => (
            <List.Item className={cx({ right: item.id === testCleanId, left: item.id !== testCleanId })}>{item?.message}</List.Item>
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
    </div>
  );
};

export default DefaultLayout;
