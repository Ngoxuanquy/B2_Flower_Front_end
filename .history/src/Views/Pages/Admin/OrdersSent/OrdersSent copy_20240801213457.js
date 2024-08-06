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
  const [totalSold, setTotalSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
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
    const productMap = new Map();

    orders.forEach((order) => {
      order.transaction_products.forEach((product) => {
        if (productMap.has(product.product_id)) {
          const existingProduct = productMap.get(product.product_id);
          existingProduct.sold_quantity += product.quantity;
          existingProduct.total_price +=
            product.quantity * product.product_price;
        } else {
          productMap.set(product.product_id, {
            ...product,
            sold_quantity: product.quantity,
            total_price: product.quantity * product.product_price,
          });
        }
      });
    });

    const productList = Array.from(productMap.values());
    productList.sort((a, b) => b.sold_quantity - a.sold_quantity);

    const topProductsList = productList.slice(0, 5);
    setTopProducts(topProductsList);

    const totalSoldQuantity = productList.reduce(
      (total, product) => total + product.sold_quantity,
      0
    );
    const totalRevenueAmount = productList.reduce(
      (total, product) => total + product.total_price,
      0
    );

    setTotalSold(totalSoldQuantity);
    setTotalRevenue(totalRevenueAmount);
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
                    {order.transaction_userId.map((item) => (
                      <i>
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

        <div className={cx("top-products-container")}>
          <h2 style={{ textAlign: "center", marginTop: "20px" }}>
            Top 5 Sản Phẩm Bán Chạy Nhất
          </h2>
          <div>
            {topProducts.length > 0 ? (
              topProducts.map((product, index) => (
                <div
                  key={product.product_id}
                  style={{
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "20px",
                  }}
                >
                  <h3>
                    {index + 1}. {product.product_name}
                  </h3>
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
                  <p>Số lượng đã bán: {product.sold_quantity}</p>
                  <p>Tổng tiền: {product.total_price}</p>
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
          <div className={cx("totals-container")}>
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>
              Tổng Số Lượng Và Tổng Tiền Bán Được
            </h2>
            <p>Tổng số lượng đã bán: {totalSold}</p>
            <p>Tổng tiền bán được: {totalRevenue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersSent;
