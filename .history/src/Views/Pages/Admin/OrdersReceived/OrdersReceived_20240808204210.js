import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./OrdersReceived.module.scss";
import Cookies from "js-cookie";
import { Call_Post_Api } from "../../../../Components/CallApi/CallApis";
import { Button, Image } from "antd";
import ThemeConText from "../../../../config/themeConText";

const cx = classNames.bind(styles);

function OrdersReceived() {
  const [orders, setOrder] = useState([]);
  const [theme, ordersLength] = useContext(ThemeConText);

  const getApiTransactionOrder = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(
      null,
      cleanedJwtString,
      cleanId,
      `/transaction/getFullOrderReceived`,
      "Get"
    )
      .then((data) => {
        setOrder(data.metadata);
        return;
      })
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    getApiTransactionOrder();
  }, []);

  return (
    <div className={cx("container")}>
      <div>
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
                  <h2 style={{ fontSize: "1.5rem", margin: "0" }}>
                    Đơn hàng{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {order?.transactionId}
                    </span>
                  </h2>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "1.2rem",
                      color: theme.color,
                    }}
                  >
                    Ngày đặt:{" "}
                    {new Date(order.createdOn).toLocaleDateString("vi-VN")}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "1.2rem",
                      color: theme.color,
                    }}
                  ></p>
                </div>
                <div>
                  <h4>Thông tin</h4>
                  <div>
                    {order.transaction_products.map((product, prodIndex) => (
                      <div>
                        <span>Giá sản phẩm : </span>
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          {product?.product_discount ? (
                            <>
                              <span
                                style={{
                                  textDecoration: "line-through",
                                  marginRight: "8px",
                                }}
                              >
                                {product.product_price.toLocaleString()} đ
                              </span>
                              <span>
                                {(
                                  product.product_price *
                                  (1 - product.product_discount / 100)
                                ).toLocaleString()}{" "}
                                đ
                              </span>
                            </>
                          ) : (
                            <span>
                              {product.product_price.toLocaleString()} đ
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <span>Phí ship : </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {order.phiShip?.toLocaleString()} đ
                    </span>
                  </div>
                  <div>
                    <span>Giảm giá : </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {order.discount}
                    </span>
                  </div>
                  <div>
                    <span>Tồng tiền : </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {order.total_amounts?.toLocaleString()} đ
                    </span>
                    <div>
                      {" "}
                      <label>Trạng thái : </label>{" "}
                      {order.notifications != "null" ? (
                        <span
                          style={{
                            color: "green",
                            fontSize: "14px",
                          }}
                        >
                          {order.notifications}
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "red",
                            fontSize: "14px",
                          }}
                        >
                          Chưa thanh toán
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    {order.transaction_userId.map((item) => (
                      <i
                        style={{
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        {item?.name}, {item?.number} , {item?.diaChiCuThe},{" "}
                        {item?.phuongXa} , {item?.quanHuyen}, {item?.tinhThanh}{" "}
                      </i>
                    ))}
                  </div>
                </div>
                <div
                  className={cx("order-table")}
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <div
                    className={cx("order-row", "order-header")}
                    style={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}
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
                  {order.transaction_products.map((product, prodIndex) => (
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
                                  textDecoration: "line-through",
                                  marginRight: "8px",
                                  fontSize: "12px",
                                }}
                              >
                                {product.product_price}
                              </span>
                              <span>
                                {product.product_price *
                                  (1 - product.product_discount / 100)}{" "}
                                đ
                              </span>
                            </>
                          ) : (
                            <span>{product.product_price} đ</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
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
  );
}

export default OrdersReceived;
