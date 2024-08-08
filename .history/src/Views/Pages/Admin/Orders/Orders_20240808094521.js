import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Orders.module.scss";
import Cookies from "js-cookie";
import { Call_Post_Api } from "../../../../Components/CallApi/CallApis";
import { Button, Image } from "antd";
import ThemeConText from "../../../../config/themeConText";

const cx = classNames.bind(styles);

function Orders() {
  const [orders, setOrder] = useState([]);
  const [theme, ordersLength] = useContext(ThemeConText);

  const getApiTransactionOrder = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(null, cleanedJwtString, cleanId, `/transaction/getFull`, "Get")
      .then((data) => {
        setOrder(data.metadata);
        return;
      })
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    getApiTransactionOrder();
  }, []);

  const handelGuiDon = (transactionId) => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(
      {
        transactionId,
        status: "Đã gửi hàng",
      },
      cleanedJwtString,
      cleanId,
      `/transaction/updateStatus`
    )
      .then((data) => {
        getApiTransactionOrder();
        console.log(data);
        return;
      })
      .catch((err) => console.log({ err }));
  };

  const handlePrint = (orders) => {
    console.log(orders);
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print</title></head><body>");

    printWindow.document.write("<div style='margin-bottom: 20px; border: 1px solid #ccc; border-radius: 5px; padding: 20px;'>");
    printWindow.document.write(
      `<div style='margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; padding: 10px; background-color: ${theme.button}; color: ${theme.color};'>`
    );
    printWindow.document.write(
      `<h2 style='font-size: 1.5rem; margin: 0;'>Đơn hàng: <span style='font-weight: bold; font-size: 12px;'>${orders?.transactionId}</span></h2>`
    );
    printWindow.document.write(
      `<p style='margin: 0; font-size: 1.2rem; color: ${theme.color};'>Ngày đặt: ${new Date(orders.createdOn).toLocaleDateString(
        "vi-VN"
      )}</p>`
    );
    printWindow.document.write(
      `<p style='margin: 0; font-size: 1.2rem; color: ${theme.color};'>Trạng thái: ${
        orders.status === "Đang nhận đơn" ? "Đang nhận đơn" : ""
      }</p>`
    );
    printWindow.document.write("</div>");

    printWindow.document.write("<div>");
    printWindow.document.write("<h4>Thông tin</h4>");
    orders.transaction_products.forEach((product, prodIndex) => {
      printWindow.document.write("<div>");
      printWindow.document.write(
        `<span>Giá sản phẩm: </span><span style='font-weight: bold; font-size: 14px;'>${
          product?.product_discount
            ? `<span style='text-decoration: line-through; margin-right: 8px;'>${product.product_price.toLocaleString()} đ</span><span>${(
                product.product_price *
                (1 - product.product_discount / 100)
              ).toLocaleString()} đ</span>`
            : `${product.product_price.toLocaleString()} đ`
        }</span>`
      );
      printWindow.document.write("</div>");
    });

    printWindow.document.write(
      `<div><span>Phí ship: </span><span style='font-weight: bold; font-size: 14px;'>${orders.phiShip?.toLocaleString()} đ</span></div>`
    );
    printWindow.document.write(
      `<div><span>Giảm giá: </span><span style='font-weight: bold; font-size: 14px;'>${orders.discount}</span></div>`
    );
    printWindow.document.write(
      `<div><span>Tổng tiền: </span><span style='font-weight: bold; font-size: 14px;'>${orders.total_amounts?.toLocaleString()} đ</span></div>`
    );
    printWindow.document.write(
      `<div><label>Trạng thái: </label><span style='color: ${orders.notifications !== "null" ? "green" : "red"}; font-size: 14px;'>${
        orders.notifications !== "null" ? orders.notifications : "Chưa thanh toán"
      }</span></div>`
    );

    orders.transaction_userId.forEach((item) => {
      printWindow.document.write(
        `<i style='font-weight: bold; font-size: 14px;'>${item?.name}, ${item?.number}, ${item?.diaChiCuThe}, ${item?.phuongXa}, ${item?.quanHuyen}, ${item?.tinhThanh}</i>`
      );
    });

    printWindow.document.write("<div style='width: 100%; border-collapse: collapse;'>");
    printWindow.document.write("<div style='background-color: #f0f0f0; font-weight: bold; display: flex;'>");
    printWindow.document.write("<div style='flex: 1; padding: 10px;'>STT</div>");
    printWindow.document.write("<div style='flex: 2; padding: 10px;'>Sản phẩm</div>");
    printWindow.document.write("<div style='flex: 3; padding: 10px;'>Hình ảnh</div>");
    printWindow.document.write("<div style='flex: 1; padding: 10px;'>Số lượng</div>");
    printWindow.document.write("<div style='flex: 1; padding: 10px;'>Giá</div>");
    printWindow.document.write("</div>");
    orders.transaction_products.forEach((product, prodIndex) => {
      printWindow.document.write("<div style='display: flex; align-items: center; border-bottom: 1px solid #eee; padding: 10px 0;'>");
      printWindow.document.write(`<div style='flex: 1; padding: 10px;'>${prodIndex + 1}</div>`);
      printWindow.document.write(`<div style='flex: 2; padding: 10px;'>${product.product_name}</div>`);
      printWindow.document.write(
        `<div style='flex: 3; padding: 10px;'><img src='${product.product_thumb}' style='width: 80px; height: 80px;' /></div>`
      );
      printWindow.document.write(`<div style='flex: 1; padding: 10px;'>${product.quantity}</div>`);
      printWindow.document.write(
        `<div style='flex: 1; padding: 10px;'>${
          product?.product_discount
            ? `<span style='text-decoration: line-through; margin-right: 8px; font-size: 12px;'>${product.product_price}</span><span>${
                product.product_price * (1 - product.product_discount / 100)
              } đ</span>`
            : `${product.product_price} đ`
        }</div>`
      );
      printWindow.document.write("</div>");
    });
    printWindow.document.write("</div>");
    printWindow.document.write("</div>");

    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className={cx("container")} id="printableArea">
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
                    Đơn hàng :{" "}
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
                    Ngày đặt: {new Date(order.createdOn).toLocaleDateString("vi-VN")}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "1.2rem",
                      color: theme.color,
                    }}
                  >
                    {order.status === "Đang nhận đơn" ? <Button onClick={() => handelGuiDon(order._id)}>Gửi đơn</Button> : null}
                    <Button onClick={() => handlePrint(order)}>In hóa đơn</Button>
                  </p>
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
                              <span>{(product.product_price * (1 - product.product_discount / 100)).toLocaleString()} đ</span>
                            </>
                          ) : (
                            <span>{product.product_price.toLocaleString()} đ</span>
                          )}
                        </span>
                      </div>
                    ))}

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
                    </div>
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
                        {item?.name}, {item?.number} , {item?.diaChiCuThe}, {item?.phuongXa} , {item?.quanHuyen}, {item?.tinhThanh}{" "}
                      </i>
                    ))}
                  </div>
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
                              <span>{product.product_price * (1 - product.product_discount / 100)} đ</span>
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

export default Orders;
