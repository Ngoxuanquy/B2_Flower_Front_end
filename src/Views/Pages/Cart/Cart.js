import React, { useEffect, useState, useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { Button, Form, Image, Input, Steps, message, Space, Checkbox, Divider, Radio, Spin, Tooltip, Table } from "antd";
import { Call_Post_Api } from "../../../Components/CallApi/CallApis";
import Cookies from "js-cookie";
import { DeleteOutlined } from "@ant-design/icons";
import ThemeConText from "../../../config/themeConText";
import { EventRegister } from "react-event-listeners";
import { Link, useNavigate } from "react-router-dom";
import { usePayOS, PayOSConfig } from "payos-checkout";
import axios from "axios";

const cx = classNames.bind(styles);

const Cart = () => {
  const { CheckboxGroup } = Checkbox;
  const [theme, ordersLength] = useContext(ThemeConText);
  const [isLoad, setIsLoad] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const [orders, setOrder] = useState([]);
  const [tong, setTong] = useState(0);
  const [phiShip, setPhiShip] = useState(0);
  const navigate = useNavigate();

  const [names, setName] = useState("");
  const [emails, setEmails] = useState("");
  const [adrees, setAdrees] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [value, setValue] = useState(1);
  const [checkedList, setCheckedList] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [address, setAddress] = useState([]);
  const [url, setUrl] = useState([]);

  const [selectedValueAdress, setSelectedValueAdress] = useState(null);

  const [distance, setDistance] = useState(null);

  const getCoordinates = async (address) => {
    setIsLoad(true);
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: address,
          format: "json",
        },
      });
      const { lat, lon } = response.data[0];
      setIsLoad(false);

      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } catch (error) {
      console.error(`Error fetching coordinates for ${address}: `, error);
      return null;
    }
  };

  const calculateDistance = (coord1, coord2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(coord2.latitude - coord1.latitude);
    const dLon = toRad(coord2.longitude - coord1.longitude);
    const lat1 = toRad(coord1.latitude);
    const lat2 = toRad(coord2.latitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km

    return distance;
  };

  const fetchAndCalculateDistance = async (payload) => {
    const hanoiCoords = await getCoordinates("96, Định công, hoàng mai, Hà Nội, Vietnam");
    const ngheAnCoords = await getCoordinates(`${(payload.diaChiCuThe, payload.phuongXa, payload.quanHuyen, payload.tinhThanh)}`);

    if (hanoiCoords && ngheAnCoords) {
      const distance = calculateDistance(hanoiCoords, ngheAnCoords);
      tinhPhiShip(distance);
      setDistance(distance);
    }
  };

  const onChangeAdress = (e) => {
    setSelectedValueAdress(e.target.value);
    fetchAndCalculateDistance(e.target.value);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    // Hàm này sẽ được gọi mỗi khi selectedOption thay đổi
    if (selectedOption !== null) {
      tinhPhiShip(distance);
    }
  }, [selectedOption, distance]);

  const tinhPhiShip = (distance) => {
    if (!distance) return; // Handle if distance is null or undefined

    let phiShip = 0;

    if (selectedOption === "fast") {
      if (distance < 10) {
        phiShip = 7 * distance;
      } else if (distance < 20) {
        phiShip = 4 * distance;
      } else if (distance < 30) {
        phiShip = 3 * distance;
      } else if (distance < 50) {
        phiShip = 2.5 * distance;
      } else if (distance < 100) {
        phiShip = 1.5 * distance;
      } else {
        phiShip = 1 * distance;
      }
    } else if (selectedOption === "slow") {
      if (distance < 10) {
        phiShip = 3 * distance;
      } else if (distance < 20) {
        phiShip = 2.5 * distance;
      } else if (distance < 30) {
        phiShip = 2 * distance;
      } else if (distance < 50) {
        phiShip = 1.5 * distance;
      } else if (distance < 100) {
        phiShip = 1 * distance;
      } else {
        phiShip = 0.5 * distance;
      }
    }
    console.log(phiShip.toFixed(2));
    setPhiShip(phiShip.toFixed(2));
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const checkAll = orders.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < orders.length;

  const toggleCheckbox = (value) => {
    const newCheckedList = checkedList.includes(value) ? checkedList.filter((item) => item !== value) : [...checkedList, value];
    setCheckedList(newCheckedList);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? orders : []);
  };

  const getApi = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    if (cleanedJwtString) {
      Call_Post_Api({ userId: cleanId }, cleanedJwtString, cleanId, "/cart/getlistCart")
        .then((data) => {
          setOrder(data?.metadata?.cart_products || []);
          EventRegister.emit("chaneLength", data.metadata?.cart_products?.length ?? 0);
          setIsLoad(false);
        })
        .catch((err) => {
          console.log({ err });
          setIsLoad(false);
        });
    } else {
      setIsLoad(false);
      messageApi.open({
        type: "warning",
        content: "Vui lòng đăng nhập để xem giỏ hàng!!",
      });
    }
  };

  const getApiAdrressUser = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(null, cleanedJwtString, cleanId, `/users/getAddressUser/${cleanId}`, "GET")
      .then((data) => {
        setAddress(data.metadata.address);
        return;
      })
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    getApi();
    getApiAdrressUser();
  }, []);

  const handlerDelete = (productId) => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(
      {
        userId: cleanId,
        productId,
      },
      cleanedJwtString,
      cleanId,
      "/cart/delete"
    ).then(() => {
      getApi();
      EventRegister.emit("chaneLength", ordersLength - 1);
      messageApi.open({
        type: "success",
        content: "Xóa thành công!!",
      });
    });
  };

  const handlerDatHang = () => {
    setIsLoad(true);
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    if (!address || address.length === 0) {
      messageApi.open({
        type: "error",
        content: "Vui lòng nhập địa chỉ ở trong thông tin cá nhân",
      });
      setIsLoad(false);

      return;
    }

    if (!selectedValueAdress || Object.keys(selectedValueAdress).length === 0) {
      messageApi.open({
        type: "error",
        content: "Địa chỉ không được trống.",
      });
      setIsLoad(false);

      return;
    }

    if (!selectedOption) {
      messageApi.open({
        type: "error",
        content: "Phương thức thanh toán không được trống.",
      });
      setIsLoad(false);

      return;
    }

    if (!value) {
      messageApi.open({
        type: "error",
        content: "Giá trị không được trống.",
      });
      setIsLoad(false);

      return;
    }

    if (value === 3) {
      setIsLoad(true);
      Call_Post_Api(
        {
          user: { ...selectedValueAdress, _id: cleanId },
          product: checkedList,
          shopId: "test",
          paymentExpression: selectedOption,
          phiShip,
          email: Cookies.get("name")?.replace(/"/g, ""),
        },
        cleanedJwtString,
        cleanId,
        "/transaction"
      ).then(() => {
        Call_Post_Api({ userId: cleanId, newCartData: checkedList }, cleanedJwtString, cleanId, "/cart/updateTransaciton").then(() => {
          setIsLoad(false);
          getApi();
          // setTimeout(() => {
          //   navigate("/information");
          // }, 3000);
          setCurrent(2);
          setIsLoad(false);

          messageApi.open({
            type: "success",
            content: "Đặt hàng thành công!!!",
          });
        });
      });
    } else if (value === 2) {
      setIsLoad(true);

      Call_Post_Api(
        {
          userId: cleanId,
          user: selectedValueAdress,
          product: checkedList,
          shopId: "test",
          amount: tong + phiShip,
        },
        null,
        null,
        "/vnpay/create-payment-link"
      ).then((data) => {
        console.log(data);
        setIsLoad(false);
        localStorage.setItem("products", JSON.stringify(checkedList));
        window.location.replace(data);
        Call_Post_Api(null, null, null, "/vnpay/receive-hook").then((data) => {
          console.log(data);
        });
      });
    }
  };

  useEffect(() => {
    Call_Post_Api(null, null, null, "/vnpay/receive-hook").then((data) => {
      console.log(data);
    });
  }, []);

  const GetHtmlCart = () => {
    return (
      <div>
        <div
          className={cx("box")}
          style={{
            backgroundColor: theme.background,
            color: theme.color,
          }}
        >
          {orders.length ? (
            <div className={cx("table")}>
              <div className={cx("table-head")}>
                <div className={cx("table-row")}>
                  <div className={cx("table-cell")}>
                    <Checkbox className={cx("checkbox")} indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                      All
                    </Checkbox>
                  </div>
                  <div className={cx("table-cell", "STT")}>#</div>
                  <div className={cx("table-cell")}>Sản phẩm</div>
                  <div className={cx("table-cell")}>Số lượng</div>
                  <div className={cx("table-cell")}>Tổng tiền</div>
                  <div className={cx("table-cell")}>#</div>
                </div>
              </div>
              <div className={cx("table-body")}>
                {orders.map((order, index) => (
                  <div key={order._id} className={cx("table-row")}>
                    <div className={cx("table-cell")}>
                      <Checkbox className={cx("checkbox")} checked={checkedList.includes(order)} onChange={() => toggleCheckbox(order)} />
                    </div>
                    <div className={cx("table-cell", "STT")}>{index + 1}</div>
                    <div className={cx("table-cell", "product")}>
                      <Image src={order.product_thumb} className={cx("Image")} />
                      <div>{order.product_name}</div>
                    </div>
                    <div className={cx("table-cell")}>{order.quantity}</div>
                    <div className={cx("table-cell")}>{order.quantity * order.product_price}</div>
                    <div className={cx("table-cell")}>
                      <DeleteOutlined className={cx("DeleteOutlined")} onClick={() => handlerDelete(order._id)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h2
              style={{
                color: "pink",
                fontSize: "18px",
                marginTop: "20px",
              }}
            >
              Chưa có sản phẩm nào
            </h2>
          )}
        </div>
      </div>
    );
  };

  const GetHtmlAddress = () => {
    return (
      <div
        className={cx("box")}
        style={{
          backgroundColor: theme.background,
          color: theme.color,
        }}
      >
        <div className={cx("Vanchuyen")}>
          <div className={cx("address")}>
            <h2 className={cx("title-address")}>Thông tin tài khoản</h2>

            <div>Địa chỉ nhận hàng</div>
            <Radio.Group onChange={onChangeAdress} value={selectedValueAdress}>
              {address?.map((item, index) => (
                <div key={index} style={{ textAlign: "left" }}>
                  <Radio value={item}>
                    <div style={{ textAlign: "left" }}>
                      <div>
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          Họ tên:{" "}
                        </span>
                        <span>{item.name}</span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          Số điện thoại:{" "}
                        </span>
                        <span> {item.number}</span>
                      </div>

                      <div>
                        <p>
                          {item.diaChiCuThe}, {item.phuongXa}, {item.quanHuyen}, {item.tinhThanh}
                        </p>
                      </div>
                    </div>
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className={cx("conten-vanchuyen")}>
            <h2>Hình thức giao hàng</h2>
            <div className={cx("box")}>
              <div className={cx("box1")} onClick={() => handleOptionChange("fast")}>
                <div className={cx("radio-label")}>
                  <input type="radio" name="deliveryOption" checked={selectedOption === "fast"} onChange={() => {}} />
                  <span>Giao hàng nhanh</span>
                </div>
                <div className={cx("description")}>
                  <div>Giao hàng muộn nhất là 17h ngày hôm sau</div>
                  <iframe src="https://lottie.host/embed/02d37c44-2fd8-4b50-872a-ef3d9974337d/cVZ6Y7ns0O.json"></iframe>
                </div>
              </div>
              <div className={cx("box1")} onClick={() => handleOptionChange("slow")}>
                <div className={cx("radio-label")}>
                  <input type="radio" name="deliveryOption" checked={selectedOption === "slow"} onChange={() => {}} />
                  <span>Giao hàng chậm</span>
                </div>
                <div className={cx("description")}>
                  <div>Khi nào có hàng thì chúng tôi chịu</div>
                  <iframe src="https://lottie.host/embed/51f5b5f3-1dd7-49ea-a970-30e9099cfa5c/wYp9X23fPi.json"></iframe>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "30px",
            }}
          ></div>
          <div className={cx("conten-thanhtoan")}>
            <h2>Thanh toán</h2>
            <div className={cx("phuongthucTT")}>
              <Radio.Group
                onChange={onChange}
                value={value}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Radio value={1} style={{ fontSize: "18px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      src="https://lacfarm.netlify.app/assets/vnpay-logo-82927e0d.webp"
                      style={{
                        width: "200px",
                        height: "80px",
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "italic",
                      }}
                    >
                      Thanh toán qua VN pay
                    </div>
                  </div>
                </Radio>
                <Radio value={2} style={{ fontSize: "18px" }}>
                  <img
                    src="https://lacfarm.netlify.app/assets/vnpay-qr-code-cbc23988.png"
                    style={{
                      width: "120px",
                      height: "120px",
                    }}
                  />
                  <div>Thanh toán qua QR code</div>
                </Radio>
                <Radio value={3} style={{ fontSize: "18px" }}>
                  <img
                    src="https://lacfarm.netlify.app/assets/vnpay-qr-code-cbc23988.png"
                    style={{
                      width: "120px",
                      height: "120px",
                    }}
                  />
                  <div>Thanh toán khi nhận hàng</div>
                </Radio>
              </Radio.Group>
            </div>
          </div>

          {/* sản phẩm đã chọn */}
          <div className={cx("Sp-daChon")}>
            <h2
              style={{
                backgroundColor: "rgb(170, 170, 170)",
                padding: "5px",
                fontSize: "20px",
                color: "white",
                borderRadius: "6px",
                marginTop: "20px",
              }}
            >
              Sản phẩm đã chọn
            </h2>
            <div>
              {checkedList.map((item, index) => (
                <div
                  key={item._id}
                  style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #ddd", padding: "1px 0", height: "100px" }}
                >
                  <div style={{ width: "10%", textAlign: "center" }} className={"STT"}>
                    {index + 1}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                    <img src={item.product_thumb} style={{ width: "50px", height: "50px", objectFit: "cover" }} className={"Image"} />
                    <div style={{ marginLeft: "10px" }}>{item.product_name}</div>
                  </div>
                  <div style={{ marginLeft: "auto", padding: "0 8px" }}>{item.quantity}</div>
                  <div style={{ marginLeft: "auto", padding: "0 8px" }}>{item.quantity * item.product_price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handelOpentData = () => {
    Call_Post_Api(null, null, null, "/vnpay/receive-hook").then((data) => {
      console.log(data);
    });
  };

  const GetOrdered = () => {
    return (
      <div>
        <div
          style={{
            fontSize: "20px",
          }}
        >
          Thanh toán thành công 🎈
        </div>
        <Button onClick={handelOpentData}>Xem data</Button>
      </div>
    );
  };

  const steps = [
    {
      title: "Giỏ Hàng",
      content: <GetHtmlCart />,
    },
    {
      title: "Thanh Toán",
      content: <GetHtmlAddress />,
    },
    {
      title: "Thanh toán hoàn tất",
      content: <GetOrdered />,
    },
  ];

  useEffect(() => {
    const total = checkedList.reduce((acc, current) => acc + current.product_price * current.quantity, 0);
    setTong(total);
  }, [checkedList]);

  const next = () => {
    console.log("ahshsh");
    setCurrent(current + 1);
  };
  const prev = () => setCurrent(current - 1);

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: theme.colorTextTertiary,
    backgroundColor: theme.colorFillAlter,
    borderRadius: theme.borderRadiusLG,
    border: `1px dashed ${theme.colorBorder}`,
    marginTop: 16,
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

      <div className={cx("box-class")}>
        <div className={cx("box-steps")}>
          <Steps current={current} items={items} className={cx("box")} />
          <div style={contentStyle}>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success("Processing complete!")}>
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={prev}>
                Previous
              </Button>
            )}
          </div>
        </div>
        <div className={cx("TongTien")}>
          <div>
            <h2>Nhập Mã Giảm Giá</h2>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Input placeholder="Mã giảm giá" />
              <button className={cx("button")}>Áp dụng</button>
            </div>
            <div className={cx("tamtinh")}>
              <div>Tạm tính</div>
              <div>{tong}</div>
            </div>
            <div className={cx("vanchuyen")}>
              <div>Phí vận chuyển</div>
              <div>{phiShip}</div>
            </div>
            <hr />
            <div className={cx("tongcong")}>
              <div>Tổng cộng</div>
              <div>{(tong + Number(phiShip)).toFixed(2)}</div>
            </div>
            {current < steps.length - 1 && (
              // <button
              //     onClick={() => next()}
              //     disabled={checkedList.length === 0}
              //     className={cx(
              //         checkedList.length === 0
              //             ? 'disabled-button'
              //             : '',
              //     )}
              // >
              //     Đặt hàng
              // </button>

              <Tooltip title={checkedList.length === 0 ? "Vui lòng chọn sản phẩm" : "Đặt hàng"}>
                <Button
                  type="primary"
                  disabled={current === 0 && checkedList.length === 0}
                  className={cx(current === 0 && checkedList.length === 0 ? "disabled-button" : "")}
                >
                  {current === 0 ? <div onClick={() => next()}> Next</div> : <div onClick={() => handlerDatHang()}>Đặt Hàng</div>}
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      {/* {contextHolder} */}
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
    </div>
  );
};

export default Cart;
