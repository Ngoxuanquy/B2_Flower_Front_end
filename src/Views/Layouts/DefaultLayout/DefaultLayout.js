import { Header, Footer } from "../../../Components";
import classNames from "classnames/bind";
import styles from "./defaultlayout.module.scss";
import { useEffect, useState } from "react";
import { FloatButton, Drawer, Input, Button, List, message } from "antd";
import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);

    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("notification", (data) => {
      // Handle the notification data (e.g., display it to the user)
      console.log("Received notification:", data.message);
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

  const showDrawer = () => {
    const room = prompt("Enter room ID:");
    if (room) {
      setRoomId(room);
      setOpen(true);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const sendMessage = () => {
    if (!roomId) {
      alert("Please join a room first.");
      return;
    }

    if (messageInput.trim() !== "") {
      console.log({ roomId });

      socket.emit("message", { roomId, message: messageInput });
      setMessageInput("");
    }
  };

  const Test = () => {
    messageApi.open({
      type: "success",
      content: "123123",
    });
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
          <FloatButton onClick={Test} />
          <FloatButton icon={<CommentOutlined />} onClick={showDrawer} />
        </FloatButton.Group>
      </>
      <Drawer title="Chat" onClose={onClose} open={open}>
        <List dataSource={messages} renderItem={(item) => <List.Item>{item}</List.Item>} style={{ maxHeight: "60vh", overflow: "auto" }} />
        <Input placeholder="Recipient ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} style={{ marginBottom: 10 }} />
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
