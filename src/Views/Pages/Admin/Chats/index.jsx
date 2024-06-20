import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { Call_Post_Api } from "../../../../Components/CallApi/CallApis";
import Cookies from "js-cookie";
import socketIOClient from "socket.io-client";
import { Badge, Button, Input, List, message } from "antd";

// const ENDPOINT = "https://chat-b2-flower.onrender.com";
const ENDPOINT = "http://localhost:4000";

const Chats = () => {
  const cx = classNames.bind(styles);
  const URL = process.env.REACT_APP_URL;
  const [apis, setApi] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const testId = Cookies.get("id");
  const testCleanId = testId?.replace(/^"|"$/g, "");

  const getAPi = () => {
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
        const sortedMetadata = res.metadata.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });

        console.log(sortedMetadata);
        setApi(sortedMetadata);
      });
  };

  useEffect(() => {
    getAPi();
  }, []);

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);

    newSocket.on("notification", (data) => {
      getAPi();
    });

    newSocket.on("message", ({ cleanId, message }) => {
      getAPi();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: cleanId,
          message: message,
        },
      ]);
    });

    newSocket.on("notification123", (data) => {
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
    }
  };

  const handleOpentChat = (id, email) => {
    if (id) {
      console.log(id);

      setRoomId(id);
      fetchMessages(id);
      setEmail(email);
      setMessages([]);
    }
  };

  const sendMessage = () => {
    if (!roomId) {
      alert("Please join a room first.");
      return;
    }

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
          updateCountMessage();
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

  const hanldeTest = () => {
    console.log(messages);
  };

  const updateCountMessage = () => {
    const token = Cookies.get("accessToken");
    const id12 = Cookies.get("id");
    const cleanedJwtString = token?.replace(/^"|"$/g, "");
    const Idclean = id12?.replace(/^"|"$/g, "");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
        authorization: cleanedJwtString,
        "x-client-id": Idclean,
      },
      body: JSON.stringify({
        id: roomId,
        count: 0,
      }),
    };

    fetch(URL + "/shop/updateCountMessage", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        getAPi();
      });
  };

  const getColorForMessage = (message) => {
    // Define colors for different message contents
    const colors = {
      error: "#f8d7da",
      success: "#d1e7dd",
      warning: "#fff3cd",
      info: "#d1ecf1",
      default: "#f8f9fa",
    };

    if (message.includes("error")) return colors.error;
    if (message.includes("success")) return colors.success;
    if (message.includes("warning")) return colors.warning;
    if (message.includes("info")) return colors.info;

    return colors.default;
  };

  return (
    <div className={cx("container_")}>
      <div className={cx("box")}>
        <div className={cx("box-title")}>
          {apis.map((api) => (
            <div className={cx("box-chat", { active: roomId === api._id })} onClick={() => handleOpentChat(api._id, api.email)}>
              <div>
                <Badge count={api.countMessage}>
                  <img
                    style={{
                      borderRadius: "20px",
                      width: "50px",
                      height: "50px",
                      margin: 0,
                    }}
                    src="https://scontent.xx.fbcdn.net/v/t1.15752-9/441570670_802929555136374_1350330455299972228_n.jpg?stp=dst-jpg_p206x206&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=91HeDsJJZNkQ7kNvgHu9Jur&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QGfs4Qv1AuLHqZ9HHGwwc_mVoRelzACXi0oV7mkiqnIFw&oe=6686363C"
                  />
                </Badge>
              </div>
              <div
                className={cx("title")}
                style={{
                  marginLeft: "10px",
                }}
              >
                <div>{api.email}</div>
                <div
                  className={cx("title-status")}
                  style={{
                    display: "flex",
                  }}
                >
                  <div
                    className={cx("online")}
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: "green",
                      borderRadius: "50%",
                      marginTop: "2px",
                      marginRight: "5px",
                    }}
                  ></div>
                  <div>18/12/2002</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={cx("box-messege")}>
          <div>
            <div className={cx("header")}>
              <div>
                <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/441570670_802929555136374_1350330455299972228_n.jpg?stp=dst-jpg_p206x206&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=91HeDsJJZNkQ7kNvgHu9Jur&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QGfs4Qv1AuLHqZ9HHGwwc_mVoRelzACXi0oV7mkiqnIFw&oe=6686363C" />
              </div>
              <div className={cx("title")}>
                <div>{email}</div>
                <div className={cx("title-status")}>
                  <div className={cx("online")}></div>
                  <div>18/12/2002</div>
                </div>
              </div>
            </div>

            <div className={cx("input")}>
              <Input
                style={{
                  height: "40px",
                  width: "70%",
                  zIndex: 100,
                }}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onPressEnter={sendMessage}
              />
              <Button type="primary" onClick={() => hanldeTest()}>
                Gửi
              </Button>
            </div>
            <List
              dataSource={messages}
              renderItem={(item) => (
                <List.Item
                  className={cx({ right: item.id === testCleanId, left: item.id !== testCleanId })}
                  style={{ backgroundColor: getColorForMessage(item.message) }}
                >
                  <div>{item.message}</div>
                </List.Item>
              )}
              style={{ maxHeight: "80vh", overflow: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
