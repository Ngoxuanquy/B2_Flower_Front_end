import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./FlowerCancellationList.module.scss";
import Cookies from "js-cookie";
import { Call_Post_Api } from "../../../Components/CallApi/CallApis";
import { Button, Image } from "antd";

const cx = classNames.bind(styles);

const FlowerCancellationList = () => {
  const [apis, setApi] = useState([]);

  const getApi = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api({ status: "Yêu cầu" }, cleanedJwtString, cleanId, "/brokenFlowers/getBrokenFlowers", "Post")
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
      case "Approved":
        return "approved";
      case "Rejected":
        return "rejected";
      case "In Progress":
        return "in-progress";
      default:
        return "";
    }
  };

  const handelDuyet = (brokenFlowerid, quantity, productId) => {
    console.log("acccc");
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api({ id: brokenFlowerid, quantity, productId }, cleanedJwtString, cleanId, "/brokenFlowers/updateBrokenFlowers", "Post")
      .then((data) => {
        getApi();
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <div className={cx("container")}>
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
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {apis.map((flower) => (
            <tr key={flower._id}>
              <td>{flower.email}</td>
              <td>{flower.product_Name}</td>
              <td>{flower.quantity}</td>
              <td>
                <Image src={flower.img} />
              </td>
              <td className={cx("status", getStatusClass(flower.status))}>{flower.status}</td>
              <td>{new Date(flower.date).toLocaleDateString()}</td>
              <td>
                <Button onClick={() => handelDuyet(flower._id, flower.quantity, flower?.productId)}>Duyệt</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlowerCancellationList;
