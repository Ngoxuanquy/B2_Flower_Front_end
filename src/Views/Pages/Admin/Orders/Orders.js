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

    Call_Post_Api(null, cleanedJwtString, cleanId, `/transaction/updateStatus/${transactionId}`)
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
              <div key={order._id} style={{ marginBottom: "20px", border: "1px solid #ccc", borderRadius: "5px", padding: "20px" }}>
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
                    {order.status === "Đang nhận đơn" ? <Button onClick={() => handelGuiDon(order._id)}>Gửi đơn</Button> : null}
                  </p>
                </div>
                <div>
                  <h5>Thông tin</h5>
                  <div>
                    {order.transaction_userId.map((item) => (
                      <i>
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
  );
}

export default Orders;
