import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Information.module.scss";
import { Button, Image, Spin, Tabs, message } from "antd";
import ModalMap from "../../../Components/ModalMap/ModalMap";
import { Call_Post_Api } from "../../../Components/CallApi/CallApis";
import Cookies from "js-cookie";
import { Radio } from "antd";
import ThemeConText from "../../../config/themeConText";
const { TabPane } = Tabs;

const Information = () => {
  const elementRef = useRef(null);
  const [theme, ordersLength] = useContext(ThemeConText);

  const [address, setAddress] = useState([]);
  const [orders, setOrder] = useState([]);
  const [ordersSend, setOrderSend] = useState([]);
  const [moneys, setMoneys] = useState(0);

  const [tabPaneHeight, setTabPaneHeight] = useState("auto"); // State to track height of TabPane dynamically
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoad, setIsLoad] = useState(false);
  const name = Cookies.get("name")?.replace(/"/g, "");

  const cx = classNames.bind(styles);
  const titles = ["Tài khoản", "Ví của B2-FLOWER", "Đơn hàng", "Địa chỉ"];
  const [activeTab, setActiveTab] = useState("0"); // State to track the active tab
  const madonhang = Cookies.get("MaDonHang");

  const getOrder = () => {
    if (madonhang) {
      const Clearmadonhang = madonhang.replace(/"/g, "");

      Call_Post_Api(null, null, null, `/vnpay/abc/${Clearmadonhang}`, "GET")
        .then((data) => {
          console.log(data);
          // Delete the madonhang cookie after successful API call
          document.cookie = "MaDonHang=; Max-Age=0; path=/";
          return;
        })
        .catch((err) => console.log({ err }));
    } else {
      console.log("No madonhang found in cookies");
    }
  };

  useEffect(() => {
    if (madonhang) {
      getOrder();
    }
  }, [madonhang]);

  const getApiAdrressUser = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(null, cleanedJwtString, cleanId, `/users/getAddressUser/${cleanId}`, "GET")
      .then((data) => {
        console.log(data);
        setAddress(data.metadata.address);
        setMoneys(data.metadata.moneys);
        setIsLoad(false);
        return;
      })
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    getApiAdrressUser();
  }, []);

  const getApiTransactionOrder = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(null, cleanedJwtString, cleanId, `/transaction/getFullUseId/${cleanId}`, "Get")
      .then((data) => {
        setOrder(data.metadata.reverse());
        setIsLoad(false);
        return;
      })
      .catch((err) => console.log({ err }));
  };

  const getApiTransactionOrderSend = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(null, cleanedJwtString, cleanId, `/transaction/getFullOrder_doneUseId/${cleanId}`, "Get")
      .then((data) => {
        setOrderSend(data.metadata.reverse());
        setIsLoad(false);
        return;
      })
      .catch((err) => console.log({ err }));
  };

  const [selectedValue, setSelectedValue] = useState(null);

  const onChange = (e) => {
    setSelectedValue(e.target.value);
    console.log(e.target);
  };

  const handelHuyDon = (transactionId, status, moneys) => {
    setIsLoad(true);

    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");
    Call_Post_Api(null, cleanedJwtString, cleanId, `/transaction/deleteTransaction/${transactionId}`)
      .then((data) => {
        setIsLoad(false);
        messageApi.open({
          type: "success",
          content: data.metadata.mgs,
        });
        getApiTransactionOrder();

        if (status === "Đã thanh toán" || status === "Thanh toán qua Ví 2Be Flower") {
          const token = Cookies.get("accessToken");
          const id = Cookies.get("id");
          const cleanedJwtString = token?.replace(/"/g, "");
          const cleanId = id?.replace(/"/g, "");
          Call_Post_Api(
            {
              userId: cleanId,
              moneys: moneys,
            },
            cleanedJwtString,
            cleanId,
            `/users/updateMoney/${cleanId}`
          )
            .then((data) => {
              setIsLoad(false);

              getApiTransactionOrder();
              return;
            })
            .catch((err) => console.log({ err }));
        } else {
        }
        return;
      })
      .catch((err) => console.log({ err }));
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    switch (key) {
      case "2":
        getApiTransactionOrder();
        getApiTransactionOrderSend();
        break;
      case "3":
        getApiAdrressUser();
        break;
      case "1":
        getApiAdrressUser();
        break;
      default:
        break;
    }
  };

  const handleEventFromChild = (info) => {
    // Handle event from child component here
    getApiAdrressUser();
  };

  // Effect to update TabPane height dynamically
  useEffect(() => {
    // Adjust TabPane height based on footer height
    const footerHeight = document.querySelector(".footer")?.offsetHeight || 0;
    const newTabPaneHeight = `calc(100vh - ${footerHeight}px)`;
    setTabPaneHeight(newTabPaneHeight);
  }, [orders, address]); // Adjust when orders or address change

  return (
    <div
      className={cx("container_")}
      style={{
        backgroundColor: theme.background,
        color: theme.color,
      }}
    >
      {contextHolder}
      {isLoad && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100vh",
            zIndex: 100,
            top: 0,
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin />
        </div>
      )}
      <div className={cx("box-title")}>
        <div className={cx("imformation")}>
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "150px",
            }}
          >
            {name}
          </div>
        </div>
        <div className={cx("conten")}>{titles[activeTab]}</div>
      </div>
      <hr
        style={{
          width: "90%",
          margin: "0 auto", // Để căn giữa theo chiều ngang
          borderTop: "1px solid #000", // Để định dạng màu sắc và độ dày của đường kẻ
          marginTop: "20px",
        }}
      />
      <div className={cx("tabs")} style={{ height: tabPaneHeight }}>
        <Tabs
          activeKey={activeTab}
          tabPosition={"left"}
          style={{ height: "100%", backgroundColor: theme.background, color: theme.color }}
          onChange={handleTabChange}
        >
          {titles?.map((title, index) => (
            <TabPane tab={title} key={String(index)}>
              {activeTab === "0" && (
                <div>
                  {/* Content for Tab 0 */}
                  <p>Tab 0 content goes here.</p>
                </div>
              )}
              {activeTab === "1" && (
                <div
                  style={{
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {/* Content for Tab 1 */}
                  <p>
                    Ví:{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {moneys} đ
                    </span>{" "}
                  </p>
                  <div>
                    <Button>Nạp tiền vào ví</Button>
                  </div>
                </div>
              )}
              {activeTab === "3" ? (
                <div className={cx("tabs-item1")} id="height-client">
                  <div>
                    <div style={{ fontSize: "20px", fontWeight: "bold", color: theme.color }}>Địa chỉ của tôi</div>
                    <Radio.Group onChange={onChange} value={selectedValue}>
                      {address?.map((item, index) => (
                        <div key={index}>
                          <Radio value={item}>
                            <div
                              style={{
                                marginTop: "10px",
                                color: theme.color,
                              }}
                            >
                              <div
                                className="number"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  flexDirection: "column",
                                }}
                              >
                                <div>
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      fontFamily: "blod",
                                    }}
                                  >
                                    Họ tên:
                                  </span>{" "}
                                  {item.name}
                                </div>
                                <div>
                                  {" "}
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      fontFamily: "blod",
                                    }}
                                  >
                                    Số điện thoại:
                                  </span>{" "}
                                  {item.number}
                                </div>
                              </div>
                              <div>
                                {item.diaChiCuThe}, {item.phuongXa}, {item.quanHuyen}, {item.tinhThanh}
                              </div>
                            </div>
                          </Radio>
                        </div>
                      ))}
                    </Radio.Group>
                    <div>
                      <button
                        style={{
                          marginTop: "20px",
                          borderRadius: "10px",
                          padding: "10px",
                          backgroundColor: theme.button,
                          color: theme.color,
                        }}
                      >
                        Địa chỉ lấy hàng
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      marginRight: "50px",
                    }}
                  >
                    <ModalMap props={"Cập Nhật"} onClickHandler={handleEventFromChild} />
                  </div>
                </div>
              ) : (
                activeTab === "2" && (
                  <div
                    className={cx("tabs-item")}
                    id="height-client"
                    style={{
                      backgroundColor: theme.background,
                      color: theme.color,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                        Đơn hàng của tôi -{" "}
                        <i
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                          }}
                        >
                          Đơn đặt hàng
                        </i>
                      </div>
                      <div className={cx("orders-container")}>
                        {orders?.length > 0 ? (
                          orders.map((order, index) => (
                            <div
                              key={order._id}
                              style={{ marginBottom: "20px", border: "1px solid #ccc", borderRadius: "5px", padding: "20px" }}
                            >
                              <div
                                className={cx("order-header")}
                                style={{
                                  marginBottom: "10px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px",
                                  backgroundColor: theme.button,
                                  color: theme.color,
                                }}
                              >
                                <h2 style={{ fontSize: "1.5rem", margin: "0" }}>Đơn hàng {index + 1}</h2>
                                {order.notifications === "Đã thanh toán" || order.notifications === "Thanh toán qua Ví 2Be Flower" ? (
                                  <span
                                    style={{
                                      color: "green",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {" "}
                                    Đã thanh toán
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Chưa thanh toán
                                  </span>
                                )}
                                <p style={{ margin: "0", fontSize: "1.2rem", color: theme.color }}>
                                  Ngày đặt: {new Date(order.createdOn).toLocaleDateString("vi-VN")}
                                </p>
                                <p style={{ margin: "0", fontSize: "1.2rem", color: theme.color }}>
                                  {order.status === "Đang nhận đơn" ? (
                                    <Button onClick={() => handelHuyDon(order._id, order.notifications, order.total_amounts)}>
                                      Hủy đơn
                                    </Button>
                                  ) : null}
                                </p>
                              </div>
                              <div className={cx("order-table")} style={{ width: "100%", borderCollapse: "collapse" }}>
                                <div className={cx("order-row", "order-header")} style={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}>
                                  <div className={cx("order-cell")} style={{ flex: "1", padding: "10px" }}>
                                    STT
                                  </div>
                                  <div className={cx("order-cell")} style={{ flex: "2", padding: "10px" }}>
                                    Sản phẩm
                                  </div>
                                  <div className={cx("order-cell")} style={{ flex: "3", padding: "10px" }}>
                                    Hình ảnh
                                  </div>
                                  <div className={cx("order-cell")} style={{ flex: "1", padding: "10px" }}>
                                    Số lượng
                                  </div>
                                  <div className={cx("order-cell")} style={{ flex: "1", padding: "10px" }}>
                                    Giá
                                  </div>
                                  <div className={cx("order-cell")} style={{ flex: "2", padding: "10px" }}>
                                    Ngày đặt
                                  </div>
                                </div>
                                {order.transaction_products.map((product, prodIndex) => (
                                  <div
                                    key={prodIndex}
                                    className={cx("order-row")}
                                    style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #eee", padding: "10px 0" }}
                                  >
                                    <div className={cx("order-cell")} style={{ flex: "1", padding: "10px" }}>
                                      {prodIndex + 1}
                                    </div>
                                    <div className={cx("order-cell")} style={{ flex: "2", padding: "10px" }}>
                                      {product.product_name}
                                    </div>
                                    <div className={cx("order-cell")} style={{ flex: "3", padding: "10px" }}>
                                      <Image
                                        src={product.product_thumb}
                                        style={{
                                          width: "80px",
                                          height: "80px",
                                        }}
                                      />
                                    </div>
                                    <div className={cx("order-cell")} style={{ flex: "1", padding: "10px" }}>
                                      {product.quantity}
                                    </div>
                                    <div className={cx("order-cell")} style={{ flex: "1", padding: "10px" }}>
                                      {product.product_price}
                                    </div>
                                    <div className={cx("order-cell")} style={{ flex: "2", padding: "10px" }}>
                                      {new Date(product.updatedAt).toLocaleDateString("vi-VN")}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p style={{ fontStyle: "italic", textAlign: "center", marginTop: "20px" }}>Chưa có đơn hàng</p>
                        )}
                      </div>

                      <div
                        style={{
                          marginBottom: "50px",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>
                            Đơn hàng của tôi -{" "}
                            <i
                              style={{
                                fontSize: "16px",
                                fontWeight: 400,
                              }}
                            >
                              Đơn đã gửi
                            </i>
                          </div>
                          <div className={cx("orders-container")}>
                            {ordersSend?.length > 0 ? (
                              ordersSend.map((order, index) => (
                                <div
                                  key={order._id}
                                  style={{ marginBottom: "20px", border: "1px solid #ccc", borderRadius: "5px", padding: "20px" }}
                                >
                                  <div
                                    className={cx("order-header")}
                                    style={{
                                      marginBottom: "10px",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "10px",
                                      backgroundColor: theme.button,
                                      color: theme.color,
                                    }}
                                  >
                                    <h2 style={{ fontSize: "1.5rem", margin: "0" }}>Đơn hàng {index + 1}</h2>
                                    <p style={{ margin: "0", fontSize: "1.2rem", color: theme.color }}>
                                      Ngày đặt: {new Date(order.createdOn).toLocaleDateString("vi-VN")}
                                    </p>
                                    <p style={{ margin: "0", fontSize: "1.2rem", color: theme.color }}>
                                      {order.status === "Đang nhận đơn" ? (
                                        <Button onClick={() => handelHuyDon(order._id)}>Hủy đơn</Button>
                                      ) : null}
                                    </p>
                                  </div>
                                  <div className={cx("order-table")} style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <div
                                      className={cx("order-row", "order-header")}
                                      style={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}
                                    >
                                      <div className={cx("order-cell")} style={{ flex: "1", padding: "10px" }}>
                                        STT
                                      </div>
                                      <div className={cx("order-cell")} style={{ flex: "2", padding: "10px" }}>
                                        Sản phẩm
                                      </div>
                                      <div className={cx("order-cell")} style={{ flex: "3", padding: "10px" }}>
                                        Hình ảnh
                                      </div>
                                      <div className={cx("order-cell")} style={{ flex: "1", padding: "10px" }}>
                                        Số lượng
                                      </div>
                                      <div className={cx("order-cell")} style={{ flex: "1", padding: "10px" }}>
                                        Giá
                                      </div>
                                      <div className={cx("order-cell")} style={{ flex: "2", padding: "10px" }}>
                                        Ngày đặt
                                      </div>
                                    </div>
                                    {order.transaction_products.map((product, prodIndex) => (
                                      <div
                                        key={prodIndex}
                                        className={cx("order-row")}
                                        style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #eee", padding: "10px 0" }}
                                      >
                                        <div className={cx("order-cell")} style={{ flex: "1", padding: "10px" }}>
                                          {prodIndex + 1}
                                        </div>
                                        <div className={cx("order-cell")} style={{ flex: "2", padding: "10px" }}>
                                          {product.product_name}
                                        </div>
                                        <div className={cx("order-cell")} style={{ flex: "3", padding: "10px" }}>
                                          <Image
                                            src={product.product_thumb}
                                            style={{
                                              width: "80px",
                                              height: "80px",
                                            }}
                                          />
                                        </div>
                                        <div className={cx("order-cell")} style={{ flex: "1", padding: "10px" }}>
                                          {product.quantity}
                                        </div>
                                        <div className={cx("order-cell")} style={{ flex: "1", padding: "10px" }}>
                                          {product.product_price}
                                        </div>
                                        <div className={cx("order-cell")} style={{ flex: "2", padding: "10px" }}>
                                          {new Date(product.updatedAt).toLocaleDateString("vi-VN")}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p style={{ fontStyle: "italic", textAlign: "center", marginTop: "20px" }}>Chưa có đơn hàng</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
              {/* {activeTab !== "2" && activeTab !== "3" && <div>Chưa có địa chỉ, vui lòng nhập địa chỉ</div>} */}
            </TabPane>
          ))}
        </Tabs>
      </div>
      <footer className={cx("footer")}>{/* Nội dung footer */}</footer>
    </div>
  );
};

export default Information;
