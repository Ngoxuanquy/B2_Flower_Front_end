import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Select, Spin, message } from "antd";
import classNames from "classnames/bind";
import styles from "./ModalMap.module.scss";
import axios from "axios";
import { Call_Post_Api } from "../CallApi/CallApis";
import Cookies from "js-cookie";

function ModalMap({ props, onClickHandler }) {
  const cx = classNames.bind(styles);
  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiTinhThanhs, setApiTinhThanh] = useState([]);
  const [apiQuanHuyens, setApiQuanHuyen] = useState([]);
  const [apiPhuongXas, setApiPhuongXa] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  const [valueTinhThanh, setValueTinhThanh] = useState("");
  const [valueQuanHuyen, setValueQuanHuyen] = useState("");
  const [valuePhuongXa, setValuePhuongXa] = useState("");
  const [valueAddressCuThe, setValueAddressCuThe] = useState("");
  const [valueNumber, setValueNumber] = useState("");
  const [valueName, setValueName] = useState("");

  const handleChangeAddressCuThe = (event) => {
    setValueAddressCuThe(event.target.value);
  };

  const handleNumber = (event) => {
    setValueNumber(event.target.value);
  };

  const handleName = (event) => {
    setValueName(event.target.value);
  };

  const showModal = () => {
    fetchData();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    setIsLoad(true);

    const options = {
      method: "GET",
      url: "https://toinh-api-tinh-thanh.onrender.com/province",
    };

    try {
      const response = await axios.request(options);
      setApiTinhThanh(response.data);
      setIsLoad(false);
    } catch (error) {
      console.error(error);
    }
  };

  const hanldeQuanHuyen = async (data) => {
    console.log(data);
    const options = {
      method: "GET",
      url: `https://toinh-api-tinh-thanh.onrender.com/district/?idProvince=${data}`,
    };

    try {
      const response = await axios.request(options);
      setApiQuanHuyen(response.data);
      setIsLoad(false);
    } catch (error) {
      console.error(error);
    }
  };

  const hanldephuongXa = async (data) => {
    console.log(data);
    const options = {
      method: "GET",
      url: `https://toinh-api-tinh-thanh.onrender.com/commune/?idDistrict=${data}`,
    };

    try {
      const response = await axios.request(options);
      setApiPhuongXa(response.data);
      setIsLoad(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOk = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    // List of required fields
    const requiredFields = [
      { value: cleanId, name: "ID" },
      { value: valuePhuongXa, name: "Phường/Xã" },
      { value: valueQuanHuyen, name: "Quận/Huyện" },
      { value: valueTinhThanh, name: "Tỉnh/Thành phố" },
      { value: valueAddressCuThe, name: "Địa chỉ cụ thể" },
      { value: valueNumber, name: "Số điện thoại" },
      { value: valueName, name: "Tên" },
    ];

    // Check for missing fields
    const missingFields = requiredFields
      .filter((field) => !field.value)
      .map((field) => field.name);

    if (missingFields.length > 0) {
      messageApi.open({
        type: "warning",
        content: `Vui lòng nhập đủ trường: ${missingFields.join(", ")}!`,
      });
      return;
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10,15}$/; // Adjust based on your requirements
    if (!phoneRegex.test(valueNumber)) {
      messageApi.open({
        type: "warning",
        content: "Số điện thoại không hợp lệ!",
      });
      return;
    }

    setIsModalOpen(false);

    Call_Post_Api(
      {
        userId: cleanId,
        address: {
          phuongXa: valuePhuongXa,
          quanHuyen: valueQuanHuyen,
          tinhThanh: valueTinhThanh,
          diaChiCuThe: valueAddressCuThe,
          number: valueNumber,
          name: valueName,
        },
      },
      cleanedJwtString,
      cleanId,
      "/users/createAddress"
    )
      .then((data) => {
        setIsLoad(false);
        messageApi.open({
          type: "success",
          content: `Thêm địa chỉ thành công!`,
        });
        onClickHandler("Thông tin từ modal");
        return;
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <>
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
      <Button type="primary" onClick={showModal}>
        {props}
      </Button>
      <Modal
        title="Thông tin cá nhân"
        width={700}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <div className={cx("box-1")}>
            <div className={cx("item-box-1")}>
              <div>Họ và Tên :</div>
              <Input onChange={handleName} />
            </div>
            <div className={cx("item-box-1")}>
              <div>Số điện thoại :</div>
              <Input onChange={handleNumber} />
            </div>
          </div>
          <div className={cx("box-2")}>
            <div className={cx("item-box-2")}>
              <div>Tỉnh thành :</div>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.name?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) => {
                  const nameA = (
                    (optionA && optionA.name) ||
                    ""
                  )?.toLowerCase();
                  const nameB = (
                    (optionB && optionB.name) ||
                    ""
                  )?.toLowerCase();
                  return nameA?.localeCompare(nameB);
                }}
                options={apiTinhThanhs?.map((province) => ({
                  value: province.idProvince,
                  label: province.name,
                }))}
                onChange={(value, option) => {
                  console.log("Selected value:", value);
                  hanldeQuanHuyen(value);
                  setValueTinhThanh(option.label);
                }}
              />
            </div>
            <div className={cx("item-box-2")}>
              <div>Quận huyện :</div>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.name?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) => {
                  const nameA = (
                    (optionA && optionA.name) ||
                    ""
                  )?.toLowerCase();
                  const nameB = (
                    (optionB && optionB.name) ||
                    ""
                  )?.toLowerCase();
                  return nameA?.localeCompare(nameB);
                }}
                options={apiQuanHuyens?.map((province) => ({
                  value: province.idDistrict,
                  label: province.name,
                }))}
                onChange={(value, option) => {
                  hanldephuongXa(value);
                  setValueQuanHuyen(option.label);
                }}
              />
            </div>
          </div>
          <div className={cx("box-3")}>
            <div className={cx("item-box-3")}>
              <div>Phường xã :</div>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.name?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) => {
                  const nameA = (
                    (optionA && optionA.name) ||
                    ""
                  )?.toLowerCase();
                  const nameB = (
                    (optionB && optionB.name) ||
                    ""
                  )?.toLowerCase();
                  return nameA?.localeCompare(nameB);
                }}
                options={apiPhuongXas?.map((province) => ({
                  value: province.idCommune,
                  label: province.name,
                }))}
                onChange={(value, option) => {
                  setValuePhuongXa(option.label);
                }}
              />
            </div>
          </div>
          <div className={cx("box-4")}>
            <div className={cx("item-box-4")}>
              <div>Địa chỉ chi tiết :</div>
              <Input
                className={cx("input")}
                value={valueAddressCuThe}
                onChange={handleChangeAddressCuThe}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalMap;
