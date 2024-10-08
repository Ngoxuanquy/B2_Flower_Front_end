import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Information.module.scss";
import { Button, Form, Image, Input, Modal, Spin, Tabs, message } from "antd";
import ModalMap from "../../../Components/ModalMap/ModalMap";
import { Call_Post_Api } from "../../../Components/CallApi/CallApis";
import Cookies from "js-cookie";
import { Radio } from "antd";
import ThemeConText from "../../../config/themeConText";
import { EventRegister } from "react-event-listeners";
import { EditOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;

const Information = () => {
  const elementRef = useRef(null);
  const [theme, ordersLength] = useContext(ThemeConText);

  const [address, setAddress] = useState([]);
  const [orders, setOrder] = useState([]);
  const [ordersSend, setOrderSend] = useState([]);
  const [ordersReceived, setOrderReceived] = useState([]);
  const [orderEdit, setOrderEdit] = useState([]);

  const [moneys, setMoneys] = useState(0);

  const [tabPaneHeight, setTabPaneHeight] = useState("auto"); // State to track height of TabPane dynamically
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoad, setIsLoad] = useState(false);
  const name = Cookies.get("name")?.replace(/"/g, "");

  const cx = classNames.bind(styles);
  const titles = ["Tài khoản", "Ví của B2-FLOWER", "Đơn hàng", "Địa chỉ"];
  const [activeTab, setActiveTab] = useState("0"); // State to track the active tab
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [isModalOpenUpdateAddress, setIsModalOpenUpdateAddress] =
    useState(false);

  const [isModalOpenEditOrder, setIsModalOpenEditOrder] = useState(false);
  const showModalEditOrder = () => {
    setIsModalOpenEditOrder(true);
  };
  const handleEditOrderOk = () => {
    setIsModalOpenEditOrder(false);
  };
  const handleEditOrderCancel = () => {
    setIsModalOpenEditOrder(false);
  };

  const showEditOrderModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log(amount);
    if (Number(amount.replace(/\./g, "")) > 1000 && amount !== undefined) {
      const token = Cookies.get("accessToken");
      const id = Cookies.get("id");
      const cleanedJwtString = token?.replace(/"/g, "");
      const cleanId = id?.replace(/"/g, "");
      Call_Post_Api(
        {
          amount: amount.replace(/\./g, ""),
          userId: cleanId,
        },
        null,
        null,
        "/vnpay/create-payment-link-donet"
      ).then((data) => {
        window.location.replace(data);
      });
    } else {
      messageApi.open({
        type: "warning",
        content: "Vui lòng nhập số tiền lớn hơn 1000",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getApi = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(
      { userId: cleanId },
      cleanedJwtString,
      cleanId,
      "/cart/getlistCart"
    )
      .then((data) => {
        EventRegister.emit(
          "chaneLength",
          data.metadata?.cart_products?.length ?? 0
        );
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const formatNumberWithDots = (value) => {
    // Remove existing dots and non-numeric characters
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (e) => {
    let value = e.target.value;
    value = formatNumberWithDots(value);
    setAmount(value);
  };

  const getOrder = () => {
    let madonhang = Cookies.get("MaDonHang");

    if (madonhang) {
      const Clearmadonhang = madonhang.replace(/"/g, "");

      Call_Post_Api(null, null, null, `/vnpay/abc/${Clearmadonhang}`, "GET")
        .then((data) => {
          getApi();
          // Delete the madonhang cookie after successful API call
          document.cookie = "MaDonHang=; Max-Age=0; path=/";
        })
        .catch((err) => console.log({ err }));
    } else {
      console.log("No madonhang found in cookies");
    }
  };

  const getDonnet = () => {
    Call_Post_Api(null, null, null, `/vnpay/statusDonet`, "GET")
      .then((data) => {})
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    getApi();
    getDonnet();
  }, []);

  useEffect(() => {
    const madonhang = Cookies.get("MaDonHang");
    if (madonhang) {
      getOrder();
      document.cookie = "MaDonHang=; Max-Age=0; path=/";
    }
  }, []);

  const getApiAdrressUser = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(
      null,
      cleanedJwtString,
      cleanId,
      `/users/getAddressUser/${cleanId}`,
      "GET"
    )
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

    Call_Post_Api(
      null,
      cleanedJwtString,
      cleanId,
      `/transaction/getFullUseId/${cleanId}`,
      "Get"
    )
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

    Call_Post_Api(
      null,
      cleanedJwtString,
      cleanId,
      `/transaction/getFullOrder_doneUseId/${cleanId}`,
      "Get"
    )
      .then((data) => {
        const orders = data.metadata.reverse();
        setOrderSend(orders);
        setIsLoad(false);

        // Get today's date
        // Assuming today is defined as the current date and time
        const today = new Date();

        orders.forEach((order) => {
          // Ensure createdOn is in Date format
          const createdOn = new Date(order.createdOn);

          // Calculate the difference in time
          const diffTime = Math.abs(today - createdOn);

          // Convert time difference to minutes
          const diffMinutes = Math.ceil(diffTime / (1000 * 60));

          // If the order is older than 1 minute, call handelNhanDon
          if (diffMinutes > 1) {
            if (order._id) {
              // Check if transactionId is available
              handelNhanDon(order._id, order.notifications);
            } else {
              console.error(
                `Order with createdOn ${order.createdOn} does not have a transactionId.`
              );
            }
          }
        });

        return;
      })
      .catch((err) => console.log({ err }));
  };

  const getApiTransactionOrderReceived = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(
      null,
      cleanedJwtString,
      cleanId,
      `/transaction/getFullOrder_receivedUseId/${cleanId}`,
      "Get"
    )
      .then((data) => {
        setOrderReceived(data.metadata.reverse());
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

  const handelDonet = () => {
    setIsModalVisible(true);
  };

  const updateQuantity = (products) => {
    console.log(products);
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    const convertedProducts = products.map((product) => ({
      id: product._id,
      quantity: product.quantity,
    }));

    Call_Post_Api(
      convertedProducts,
      cleanedJwtString,
      cleanId,
      "/product/updateQuantity"
    ).then((data) => {
      console.log(data);
    });
  };

  const handelHuyDon = (transactionId, status, moneys, product) => {
    setIsLoad(true);

    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");
    Call_Post_Api(
      null,
      cleanedJwtString,
      cleanId,
      `/transaction/deleteTransaction/${transactionId}`
    )
      .then((data) => {
        setIsLoad(false);
        messageApi.open({
          type: "success",
          content: data.metadata.mgs,
        });
        getApiTransactionOrder();
        updateQuantity(product);

        if (
          status === "Đã thanh toán" ||
          status === "Thanh toán qua Ví 2Be Flower"
        ) {
          const token = Cookies.get("accessToken");
          const id = Cookies.get("id");
          const cleanedJwtString = token?.replace(/"/g, "");
          const cleanId = id?.replace(/"/g, "");
          Call_Post_Api(
            {
              userId: cleanId,
              moneys: Number(moneys),
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
        getApiTransactionOrderReceived();
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

  const [idUpdateAddress, setUpdateAddress] = useState("");

  const handelUpdateAdrees = (item) => {
    setIsModalOpenUpdateAddress(true);

    setUpdateAddress(item?.id);
    setAddresUpdate(item);
  };

  const [addresUpdate, setAddresUpdate] = useState({
    phuongXa: "",
    quanHuyen: "",
    tinhThanh: "",
    diaChiCuThe: "",
    number: "",
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddresUpdate((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleUpdateAddressOk = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    // Check for required fields in addresUpdate
    const { phuongXa, quanHuyen, tinhThanh, diaChiCuThe, number, name } =
      addresUpdate;
    if (
      !idUpdateAddress ||
      !phuongXa ||
      !quanHuyen ||
      !tinhThanh ||
      !diaChiCuThe ||
      !number ||
      !name
    ) {
      messageApi.open({
        type: "warning",
        content: "Vui lòng nhập đầy đủ thông tin địa chỉ",
      });
      return;
    }

    // Proceed with the API call
    Call_Post_Api(
      {
        userId: cleanId,
        id: idUpdateAddress,
        newAddress: addresUpdate,
      },
      cleanedJwtString,
      cleanId,
      "/users/updateAddress"
    )
      .then((data) => {
        getApiAdrressUser();
        setIsModalOpenUpdateAddress(false);
      })
      .catch((err) => console.log({ err }));
  };

  const handleUpdateAddressCancel = () => {
    setIsModalOpenUpdateAddress(false);
  };

  const handeDeleteAdress = (idAdress) => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");
    Call_Post_Api(
      {
        userId: cleanId,
        id: idAdress,
      },
      cleanedJwtString,
      cleanId,
      "/users/deleteAddress"
    )
      .then((data) => {
        getApiAdrressUser();
        return;
      })
      .catch((err) => console.log({ err }));
  };

  const handelNhanDon = (transactionId, notifications) => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(
      {
        transactionId,
        status: "Đã nhận hàng",
        notifications:
          notifications == "null" ? "Đã thanh toán" : notifications,
      },
      cleanedJwtString,
      cleanId,
      `/transaction/updateStatus`
    )
      .then((data) => {
        getApiTransactionOrderSend();
        getApiTransactionOrderReceived();

        return;
      })
      .catch((err) => console.log({ err }));
  };

  const handelEditOrder = (order) => {
    setIsModalOpenEditOrder(true);
    console.log(order);
    setOrderEdit(order);
  };

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
          style={{
            height: "100%",
            backgroundColor: theme.background,
            color: theme.color,
          }}
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
                  <Modal
                    title="Nạp tiền vào ví 2Be flower"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <div>
                      <div>Số tiền cần Nạp</div>
                      <Input value={amount} onChange={handleChange} />
                    </div>
                  </Modal>
                  <p>
                    Ví:{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {Number(moneys)?.toLocaleString()} đ
                    </span>{" "}
                  </p>
                  <div>
                    <Button onClick={handelDonet}>Nạp tiền vào ví</Button>
                  </div>
                </div>
              )}
              {activeTab === "3" ? (
                <div className={cx("tabs-item1")} id="height-client">
                  <div>
                    <Modal
                      title="Update Address"
                      open={isModalOpenUpdateAddress}
                      onOk={handleUpdateAddressOk}
                      onCancel={handleUpdateAddressCancel}
                    >
                      <Form layout="vertical">
                        <Form.Item label="Tên">
                          <Input
                            placeholder="Tên"
                            name="name"
                            value={addresUpdate.name}
                            onChange={handleInputChange}
                          />
                        </Form.Item>
                        <Form.Item label="Số điện thoại">
                          <Input
                            placeholder="Số điện thoại"
                            name="number"
                            value={addresUpdate.number}
                            onChange={handleInputChange}
                          />
                        </Form.Item>
                        <Form.Item label="Phường/Xã">
                          <Input
                            placeholder="Phường/Xã"
                            name="phuongXa"
                            value={addresUpdate.phuongXa}
                            onChange={handleInputChange}
                          />
                        </Form.Item>
                        <Form.Item label="Quận/Huyện">
                          <Input
                            placeholder="Quận/Huyện"
                            name="quanHuyen"
                            value={addresUpdate.quanHuyen}
                            onChange={handleInputChange}
                          />
                        </Form.Item>
                        <Form.Item label="Tỉnh/Thành">
                          <Input
                            placeholder="Tỉnh/Thành"
                            name="tinhThanh"
                            value={addresUpdate.tinhThanh}
                            onChange={handleInputChange}
                          />
                        </Form.Item>
                        <Form.Item label="Địa chỉ cụ thể">
                          <Input
                            placeholder="Địa chỉ cụ thể"
                            name="diaChiCuThe"
                            value={addresUpdate.diaChiCuThe}
                            onChange={handleInputChange}
                          />
                        </Form.Item>
                      </Form>
                    </Modal>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: theme.color,
                      }}
                    >
                      Địa chỉ của tôi
                    </div>
                    {address?.map((item, index) => (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          minWidth: "70vw",
                        }}
                      >
                        <div
                          key={index}
                          style={{
                            width: "70%",
                          }}
                        >
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
                              {item.diaChiCuThe}, {item.phuongXa},{" "}
                              {item.quanHuyen}, {item.tinhThanh}
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => handelUpdateAdrees(item)}
                        >
                          Cập nhật
                        </div>
                        <div
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => handeDeleteAdress(item.id)}
                        >
                          Xóa
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      marginRight: "50px",
                      lineHeight: "50px",
                    }}
                  >
                    <ModalMap
                      props={"Thêm"}
                      onClickHandler={handleEventFromChild}
                    />
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
                    <Modal
                      title="Edit Order"
                      open={isModalOpenEditOrder}
                      onOk={handleEditOrderOk}
                      onCancel={handleEditOrderCancel}
                      className={cx("custom-modal")}
                    >
                      {orderEdit ? (
                        <div className={cx("modal-content")}>
                          <div>
                            <strong>Order ID:</strong> {orderEdit._id}
                          </div>

                          <div>
                            <strong>Transaction ID:</strong>{" "}
                            {orderEdit.transactionId}
                          </div>

                          <div>
                            <strong>Products:</strong>
                            <ul>
                              {orderEdit.transaction_products?.map(
                                (product) => (
                                  <li key={product._id}>
                                    <img
                                      src={product.product_thumb}
                                      alt={product.product_name}
                                    />
                                    <div>
                                      <strong>Name:</strong>{" "}
                                      {product.product_name}
                                    </div>
                                    <div>
                                      <strong>Description:</strong>{" "}
                                      {product.product_description}
                                    </div>
                                    <div>
                                      <strong>Price:</strong>{" "}
                                      {product?.product_discount ? (
                                        <>
                                          <span
                                            style={{
                                              textDecoration: "line-through",
                                              marginRight: "8px",
                                              fontSize: "12px",
                                            }}
                                          >
                                            {product.product_price}
                                          </span>
                                          <span>
                                            {product.product_price *
                                              (1 -
                                                product.product_discount /
                                                  100)}{" "}
                                            đ
                                          </span>
                                        </>
                                      ) : (
                                        <span>{product.product_price} đ</span>
                                      )}
                                    </div>
                                    <div>
                                      <strong>Quantity:</strong>{" "}
                                      {product.quantity}
                                    </div>
                                    <div>
                                      <strong>Discount:</strong>{" "}
                                      {product.product_discount}
                                    </div>
                                    <div>
                                      <strong>Attributes:</strong> Color:{" "}
                                      {product.product_attributes.color}, Size:{" "}
                                      {product.product_attributes.size}
                                    </div>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          <div>
                            <strong>Status:</strong> {orderEdit.status}
                          </div>
                          <div>
                            <strong>Transaction User:</strong>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                listStyleType: "none",
                              }}
                            >
                              {orderEdit.transaction_userId?.map((user) => (
                                <div key={user._id}>
                                  <div>
                                    <strong>Name:</strong> {user.name}
                                  </div>
                                  <div>
                                    <strong>Address:</strong> {user.diaChiCuThe}
                                  </div>
                                  <div>
                                    <strong>Phone:</strong> {user.number}
                                  </div>
                                  <div>
                                    <strong>Address Details:</strong>{" "}
                                    {user.phuongXa}, {user.quanHuyen},{" "}
                                    {user.tinhThanh}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <strong>Payment Expression:</strong>{" "}
                            {orderEdit.payment_expression}
                          </div>
                          <div>
                            <strong>Total Amount:</strong>{" "}
                            {orderEdit.total_amounts?.toLocaleString()} đ
                          </div>
                          <div>
                            <strong>Discount:</strong>{" "}
                            {orderEdit.discount ? orderEdit.discount : 0}
                          </div>
                          <div>
                            <strong>Shipping Fee:</strong>{" "}
                            {orderEdit.phiShip ? orderEdit.phiShip : 0}
                          </div>
                        </div>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </Modal>
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
                              style={{
                                marginBottom: "20px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                padding: "20px",
                              }}
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
                                <span>
                                  <EditOutlined
                                    onClick={() => handelEditOrder(order)}
                                  />
                                </span>
                                <h2 style={{ fontSize: "1.5rem", margin: "0" }}>
                                  Đơn hàng {order.transactionId}
                                </h2>
                                <h6
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  {order.total_amounts?.toLocaleString()} đ
                                </h6>
                                {order.notifications === "Đã thanh toán" ||
                                order.notifications ===
                                  "Thanh toán qua Ví 2Be Flower" ? (
                                  <span
                                    style={{
                                      color: "green",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {" "}
                                    {order?.notifications}
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
                                <p
                                  style={{
                                    margin: "0",
                                    fontSize: "1.2rem",
                                    color: theme.color,
                                  }}
                                >
                                  Ngày đặt:{" "}
                                  {new Date(order.createdOn).toLocaleDateString(
                                    "vi-VN"
                                  )}
                                </p>
                                <p
                                  style={{
                                    margin: "0",
                                    fontSize: "1.2rem",
                                    color: theme.color,
                                  }}
                                >
                                  {order.status === "Đang nhận đơn" ? (
                                    <Button
                                      onClick={() =>
                                        handelHuyDon(
                                          order._id,
                                          order.notifications,
                                          order.total_amounts,
                                          order.transaction_products
                                        )
                                      }
                                    >
                                      Hủy đơn
                                    </Button>
                                  ) : null}
                                </p>
                              </div>
                              <div
                                className={cx("order-table")}
                                style={{
                                  width: "100%",
                                  borderCollapse: "collapse",
                                }}
                              >
                                <div
                                  className={cx("order-row", "order-header")}
                                  style={{
                                    backgroundColor: "#f0f0f0",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <div
                                    className={cx("order-cell")}
                                    style={{ flex: "1", padding: "10px" }}
                                  >
                                    STT
                                  </div>
                                  <div
                                    className={cx("order-cell")}
                                    style={{ flex: "2", padding: "10px" }}
                                  >
                                    Sản phẩm
                                  </div>
                                  <div
                                    className={cx("order-cell")}
                                    style={{ flex: "3", padding: "10px" }}
                                  >
                                    Hình ảnh
                                  </div>
                                  <div
                                    className={cx("order-cell")}
                                    style={{ flex: "1", padding: "10px" }}
                                  >
                                    Số lượng
                                  </div>
                                  <div
                                    className={cx("order-cell")}
                                    style={{ flex: "1", padding: "10px" }}
                                  >
                                    Giá
                                  </div>
                                </div>
                                {order.transaction_products.map(
                                  (product, prodIndex) => (
                                    <div
                                      key={prodIndex}
                                      className={cx("order-row")}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        borderBottom: "1px solid #eee",
                                        padding: "10px 0",
                                      }}
                                    >
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "1", padding: "10px" }}
                                      >
                                        {prodIndex + 1}
                                      </div>
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "2", padding: "10px" }}
                                      >
                                        {product.product_name}
                                      </div>
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "3", padding: "10px" }}
                                      >
                                        <Image
                                          src={product.product_thumb}
                                          style={{
                                            width: "80px",
                                            height: "80px",
                                          }}
                                        />
                                      </div>
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "1", padding: "10px" }}
                                      >
                                        {product.quantity}
                                      </div>
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "1", padding: "10px" }}
                                      >
                                        <div>
                                          {product?.product_discount ? (
                                            <>
                                              <span
                                                style={{
                                                  textDecoration:
                                                    "line-through",
                                                  marginRight: "8px",
                                                  fontSize: "12px",
                                                }}
                                              >
                                                {product.product_price}
                                              </span>
                                              <span>
                                                {product.product_price *
                                                  (1 -
                                                    product.product_discount /
                                                      100)}{" "}
                                                đ
                                              </span>
                                            </>
                                          ) : (
                                            <span>
                                              {product.product_price} đ
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p
                            style={{
                              fontStyle: "italic",
                              textAlign: "center",
                              marginTop: "20px",
                            }}
                          >
                            Chưa có đơn hàng
                          </p>
                        )}
                      </div>

                      <div
                        style={{
                          marginBottom: "50px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              marginTop: "20px",
                            }}
                          >
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
                                  style={{
                                    marginBottom: "20px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    padding: "20px",
                                  }}
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
                                    <span>
                                      <EditOutlined
                                        onClick={() => handelEditOrder(order)}
                                      />
                                    </span>
                                    <h2
                                      style={{
                                        fontSize: "1.5rem",
                                        margin: "0",
                                      }}
                                    >
                                      Đơn hàng {order.transactionId}
                                    </h2>
                                    <h6
                                      style={{
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {order.total_amounts?.toLocaleString()} đ
                                    </h6>
                                    {order.notifications === "Đã thanh toán" ||
                                    order.notifications ===
                                      "Thanh toán qua Ví 2Be Flower" ? (
                                      <span
                                        style={{
                                          color: "green",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {" "}
                                        {order?.notifications}
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
                                    <p
                                      style={{
                                        margin: "0",
                                        fontSize: "1.2rem",
                                        color: theme.color,
                                      }}
                                    >
                                      Ngày đặt:{" "}
                                      {new Date(
                                        order.createdOn
                                      ).toLocaleDateString("vi-VN")}
                                    </p>
                                    <p
                                      style={{
                                        margin: "0",
                                        fontSize: "1.2rem",
                                        color: theme.color,
                                      }}
                                    >
                                      <Button
                                        onClick={() =>
                                          handelNhanDon(
                                            order._id,
                                            order.notifications
                                          )
                                        }
                                      >
                                        Đã nhận đơn
                                      </Button>
                                    </p>
                                  </div>
                                  <div
                                    className={cx("order-table")}
                                    style={{
                                      width: "100%",
                                      borderCollapse: "collapse",
                                    }}
                                  >
                                    <div
                                      className={cx(
                                        "order-row",
                                        "order-header"
                                      )}
                                      style={{
                                        backgroundColor: "#f0f0f0",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "1", padding: "10px" }}
                                      >
                                        STT
                                      </div>
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "2", padding: "10px" }}
                                      >
                                        Sản phẩm
                                      </div>
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "3", padding: "10px" }}
                                      >
                                        Hình ảnh
                                      </div>
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "1", padding: "10px" }}
                                      >
                                        Số lượng
                                      </div>
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "1", padding: "10px" }}
                                      >
                                        Giá
                                      </div>
                                    </div>
                                    {order.transaction_products.map(
                                      (product, prodIndex) => (
                                        <div
                                          key={prodIndex}
                                          className={cx("order-row")}
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            borderBottom: "1px solid #eee",
                                            padding: "10px 0",
                                          }}
                                        >
                                          <div
                                            className={cx("order-cell")}
                                            style={{
                                              flex: "1",
                                              padding: "10px",
                                            }}
                                          >
                                            {prodIndex + 1}
                                          </div>
                                          <div
                                            className={cx("order-cell")}
                                            style={{
                                              flex: "2",
                                              padding: "10px",
                                            }}
                                          >
                                            {product.product_name}
                                          </div>
                                          <div
                                            className={cx("order-cell")}
                                            style={{
                                              flex: "3",
                                              padding: "10px",
                                            }}
                                          >
                                            <Image
                                              src={product.product_thumb}
                                              style={{
                                                width: "80px",
                                                height: "80px",
                                              }}
                                            />
                                          </div>
                                          <div
                                            className={cx("order-cell")}
                                            style={{
                                              flex: "1",
                                              padding: "10px",
                                            }}
                                          >
                                            {product.quantity}
                                          </div>
                                          <div
                                            className={cx("order-cell")}
                                            style={{
                                              flex: "1",
                                              padding: "10px",
                                            }}
                                          >
                                            <div>
                                              {product?.product_discount ? (
                                                <>
                                                  <span
                                                    style={{
                                                      textDecoration:
                                                        "line-through",
                                                      marginRight: "8px",
                                                      fontSize: "12px",
                                                    }}
                                                  >
                                                    {product.product_price}
                                                  </span>
                                                  <span>
                                                    {product.product_price *
                                                      (1 -
                                                        product.product_discount /
                                                          100)}{" "}
                                                    đ
                                                  </span>
                                                </>
                                              ) : (
                                                <span>
                                                  {product.product_price} đ
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p
                                style={{
                                  fontStyle: "italic",
                                  textAlign: "center",
                                  marginTop: "20px",
                                }}
                              >
                                Chưa có đơn hàng
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          marginBottom: "50px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              marginTop: "20px",
                            }}
                          >
                            Đơn hàng của tôi -{" "}
                            <i
                              style={{
                                fontSize: "16px",
                                fontWeight: 400,
                              }}
                            >
                              Đơn đã nhận (Nếu không xác nhận thì sau 5 ngày đơn
                              sẽ tự động xác nhận)
                            </i>
                          </div>
                          <div className={cx("orders-container")}>
                            {ordersReceived?.length > 0 ? (
                              ordersReceived.map((order, index) => (
                                <div
                                  key={order._id}
                                  style={{
                                    marginBottom: "20px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    padding: "20px",
                                  }}
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
                                    <span>
                                      <EditOutlined
                                        onClick={() => handelEditOrder(order)}
                                      />
                                    </span>
                                    <h2
                                      style={{
                                        fontSize: "1.5rem",
                                        margin: "0",
                                      }}
                                    >
                                      Đơn hàng {order.transactionId}
                                    </h2>
                                    <h6
                                      style={{
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {order.total_amounts?.toLocaleString()} đ
                                    </h6>
                                    {order.notifications === "Đã thanh toán" ||
                                    order.notifications ===
                                      "Thanh toán qua Ví 2Be Flower" ? (
                                      <span
                                        style={{
                                          color: "green",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {" "}
                                        {order?.notifications}
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
                                    <p
                                      style={{
                                        margin: "0",
                                        fontSize: "1.2rem",
                                        color: theme.color,
                                      }}
                                    >
                                      Ngày đặt:{" "}
                                      {new Date(
                                        order.createdOn
                                      ).toLocaleDateString("vi-VN")}
                                    </p>
                                    <p
                                      style={{
                                        margin: "0",
                                        fontSize: "1.2rem",
                                        color: theme.color,
                                      }}
                                    >
                                      {order.status === "Đang nhận đơn" ? (
                                        <Button
                                          onClick={() =>
                                            handelHuyDon(order._id)
                                          }
                                        >
                                          Hủy đơn
                                        </Button>
                                      ) : null}
                                    </p>
                                  </div>
                                  <div
                                    className={cx("order-table")}
                                    style={{
                                      width: "100%",
                                      borderCollapse: "collapse",
                                    }}
                                  >
                                    <div
                                      className={cx(
                                        "order-row",
                                        "order-header"
                                      )}
                                      style={{
                                        backgroundColor: "#f0f0f0",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "1", padding: "10px" }}
                                      >
                                        STT
                                      </div>
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "2", padding: "10px" }}
                                      >
                                        Sản phẩm
                                      </div>
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "3", padding: "10px" }}
                                      >
                                        Hình ảnh
                                      </div>
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "1", padding: "10px" }}
                                      >
                                        Số lượng
                                      </div>
                                      <div
                                        className={cx("order-cell")}
                                        style={{ flex: "1", padding: "10px" }}
                                      >
                                        Giá
                                      </div>
                                    </div>
                                    {order.transaction_products.map(
                                      (product, prodIndex) => (
                                        <div
                                          key={prodIndex}
                                          className={cx("order-row")}
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            borderBottom: "1px solid #eee",
                                            padding: "10px 0",
                                          }}
                                        >
                                          <div
                                            className={cx("order-cell")}
                                            style={{
                                              flex: "1",
                                              padding: "10px",
                                            }}
                                          >
                                            {prodIndex + 1}
                                          </div>
                                          <div
                                            className={cx("order-cell")}
                                            style={{
                                              flex: "2",
                                              padding: "10px",
                                            }}
                                          >
                                            {product.product_name}
                                          </div>
                                          <div
                                            className={cx("order-cell")}
                                            style={{
                                              flex: "3",
                                              padding: "10px",
                                            }}
                                          >
                                            <Image
                                              src={product.product_thumb}
                                              style={{
                                                width: "80px",
                                                height: "80px",
                                              }}
                                            />
                                          </div>
                                          <div
                                            className={cx("order-cell")}
                                            style={{
                                              flex: "1",
                                              padding: "10px",
                                            }}
                                          >
                                            {product.quantity}
                                          </div>
                                          <div
                                            className={cx("order-cell")}
                                            style={{
                                              flex: "1",
                                              padding: "10px",
                                            }}
                                          >
                                            <div>
                                              {product?.product_discount ? (
                                                <>
                                                  <span
                                                    style={{
                                                      textDecoration:
                                                        "line-through",
                                                      marginRight: "8px",
                                                      fontSize: "12px",
                                                    }}
                                                  >
                                                    {product.product_price}
                                                  </span>
                                                  <span>
                                                    {product.product_price *
                                                      (1 -
                                                        product.product_discount /
                                                          100)}{" "}
                                                    đ
                                                  </span>
                                                </>
                                              ) : (
                                                <span>
                                                  {product.product_price} đ
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p
                                style={{
                                  fontStyle: "italic",
                                  textAlign: "center",
                                  marginTop: "20px",
                                }}
                              >
                                Chưa có đơn hàng
                              </p>
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
