import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./FlowerApprovedList.module.scss";
import Cookies from "js-cookie";
import { Call_Post_Api } from "../../../Components/CallApi/CallApis";
import { Button, Image } from "antd";

const cx = classNames.bind(styles);

const FlowerApprovedList = () => {
  const [apis, setApi] = useState([]);

  const getApi = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(
      { status: "Đã duyệt", status2: "Không duyệt" },
      cleanedJwtString,
      cleanId,
      "/brokenFlowers/getBrokenFlowers",
      "Post"
    )
      .then((data) => {
        setApi(data.metadata.reverse() || []); // Ensure you set an empty array if metadata is undefined
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Yêu cầu":
        return "pending";
      case "Đã duyệt":
        return "approved";
      case "Rejected":
        return "Không duyệt";
      case "Không duyệt":
        return "NoProgress";
      default:
        return "";
    }
  };

  return (
    <div className={cx("container")}>
      <div>
        <h1>Flower Cancellation List</h1>
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>Người yêu cầu</th>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Ảnh</th>
              <th>Trạng thái</th>
              <th>Ngày kiểm hàng</th>
            </tr>
          </thead>
          <tbody>
            {apis.map((flower) => (
              <tr key={flower.id}>
                <td>{flower.email}</td>
                <td>{flower.product_Name}</td>
                <td>{flower.quantity}</td>
                <td>
                  <Image src={flower.img} />
                </td>
                <td className={cx("status", getStatusClass(flower.status))}>
                  {flower.status}
                </td>
                <td>{new Date(flower.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlowerApprovedList;
