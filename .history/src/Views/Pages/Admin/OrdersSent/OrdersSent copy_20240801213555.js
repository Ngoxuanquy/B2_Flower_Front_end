import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./OrdersSent.module.scss";
import Cookies from "js-cookie";
import { Call_Post_Api } from "../../../../Components/CallApi/CallApis";
import { Button, Image } from "antd";
import ThemeConText from "../../../../config/themeConText";

const cx = classNames.bind(styles);

function OrdersSent() {
  const [orders, setOrder] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
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
      `/transaction/getFullOrder_done`,
      "Get"
    )
      .then((data) => {
        setOrder(data.metadata);
        calculateTopProducts(data.metadata);
        return;
      })
      .catch((err) => console.log({ err }));
  };

  const calculateTopProducts = (orders) => {
    const productMap = {};

    orders.forEach((order) => {
      order.transaction_products.forEach((product) => {
        if (productMap[product.product_name]) {
          productMap[product.product_name].quantity += product.quantity;
        } else {
          productMap[product.product_name] = {
            ...product,
            quantity: product.quantity,
          };
        }
      });
    });

    const sortedProducts = Object.values(productMap).sort(
      (a, b) => b.quantity - a.quantity
    );

    setTopProducts(sortedProducts.slice(0, 5));
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
      null,
      cleanedJwtString,
      cleanId,
      `/transaction/updateStatus/${transactionId}`
    )
      .then((data) => {
        getApiTransactionOrder();
        console.log(data);
        return;
      })
      .catch((err) => console.log({ err }));
  };

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
                    Đơn hàng {index + 1}
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
                  >
                    {order.status === "Đang nhận đơn" ? (
                      <Button onClick={() => handelGuiDon(order._id)}>
                        Gửi đơn
                      </Button>
                    ) : null}
                  </p>
                </div>
                <div>
                  <h5>Thông tin</h5>
                  <div>
                    {order.transaction_userId.map((item, i) => (
                      <i key={i}>
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
                    <div
                      className={cx("order-cell")}
                      style={{ flex: "2", padding: "10px" }}
                    >
                      Ngày đặt
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
                        {product.product_price}
                      </div>
                      <div
                        className={cx("order-cell")}
                        style={{ flex: "2", padding: "10px" }}
                      >
                        {new Date(product.updatedAt).toLocaleDateString(
                          "vi-VN"
                        )}
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

        <div
          className={cx("top-products-container")}
          style={{ marginTop: "40px" }}
        >
          <h2>Sản phẩm bán chạy nhất</h2>
          <div className={cx("top-products-list")}>
            {topProducts?.length > 0 ? (
              topProducts.map((product, index) => (
                <div
                  key={product._id}
                  className={cx("top-product-item")}
                  style={{
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "20px",
                  }}
                >
                  <div className={cx("top-product-header")}>
                    <h3 style={{ fontSize: "1.5rem", margin: "0" }}>
                      {product.product_name}
                    </h3>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src={product.product_thumb}
                      style={{
                        width: "80px",
                        height: "80px",
                        marginLeft: "20px",
                      }}
                    />
                  </div>
                  <p>Giá: {product.product_price}</p>
                  <p>Số lượng đã bán: {product.quantity}</p>
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
                Chưa có dữ liệu sản phẩm bán chạy
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersSent;
