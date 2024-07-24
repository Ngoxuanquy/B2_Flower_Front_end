import React from "react";
import "./ShopIntroduce.module.scss";
import classNames from "classnames/bind";
import styles from "./ShopIntroduce.module.scss";
import logo from "../../../access/logo-1.png";

const cx = classNames.bind(styles);

const ShopIntroduce = () => {
  const shopData = {
    name: "2BE Flower",
    description:
      "2BE Flower là cửa hàng hoa tươi chuyên cung cấp các loại hoa tươi đẹp nhất cho mọi dịp. Chúng tôi cam kết mang đến cho bạn những sản phẩm hoa tươi chất lượng, phong phú và dịch vụ chăm sóc khách hàng tốt nhất.",
    address: "123 Đường Hoa, Quận 1, TP.HCM",
    phone: "0123 456 789",
    email: "contact@2beflower.com",
    operatingHours: "08:00 - 20:00",
    image: logo,
    services: [
      "Hoa tươi cho ngày lễ, sinh nhật, cưới hỏi",
      "Dịch vụ giao hoa tận nơi",
      "Thiết kế hoa theo yêu cầu",
      "Tư vấn chăm sóc hoa",
    ],
    reviews: [
      {
        name: "Nguyễn Văn A",
        comment: "Hoa rất đẹp và tươi. Dịch vụ chăm sóc khách hàng tuyệt vời!",
        rating: 5,
      },
      {
        name: "Trần Thị B",
        comment: "Đặt hoa dễ dàng và giao hàng rất nhanh.",
        rating: 4.5,
      },
      {
        name: "Lê Văn C",
        comment: "Sản phẩm chất lượng, giá cả hợp lý.",
        rating: 4,
      },
    ],
  };

  return (
    <div className={cx("shop")}>
      <h1>{shopData.name}</h1>
      <img
        src={shopData.image}
        alt="2BE Flower Shop"
        className={cx("shop-image")}
      />
      <p className={cx("shop-description")}>{shopData.description}</p>

      <div className={cx("shop-contact")}>
        <h2>Thông Tin Liên Hệ</h2>
        <p>Địa chỉ: {shopData.address}</p>
        <p>Số điện thoại: {shopData.phone}</p>
        <p>
          Email: <a href={`mailto:${shopData.email}`}>{shopData.email}</a>
        </p>
        <p>Giờ hoạt động: {shopData.operatingHours}</p>
      </div>

      <div className={cx("shop-services")}>
        <h2>Dịch Vụ</h2>
        <ul>
          {shopData.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>

      <div className={cx("shop-reviews")}>
        <h2>Đánh Giá Khách Hàng</h2>
        {shopData.reviews.map((review, index) => (
          <div key={index} className={cx("review")}>
            <p>
              <strong>{review.name}</strong>: {review.comment} ({review.rating}
              ⭐️)
            </p>
          </div>
        ))}
      </div>

      <div className={cx("shop-contact-form")}>
        <h2>Liên Hệ</h2>
        <form>
          <div>
            <label>Tên:</label>
            <input type="text" name="name" required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" required />
          </div>
          <div>
            <label>Tin nhắn:</label>
            <textarea name="message" required></textarea>
          </div>
          <button type="submit">Gửi</button>
        </form>
      </div>
    </div>
  );
};

export default ShopIntroduce;
