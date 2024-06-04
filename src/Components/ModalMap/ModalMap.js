import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Select } from "antd";
import classNames from "classnames/bind";
import styles from "./ModalMap.module.scss";
import axios from "axios";
import { Call_Post_Api } from "../CallApi/CallApis";
import Cookies from "js-cookie";

function ModalMap({ props }) {
  const cx = classNames.bind(styles);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiTinhThanhs, setApiTinhThanh] = useState([]);
  const [apiQuanHuyens, setApiQuanHuyen] = useState([]);
  const [apiPhuongXas, setApiPhuongXa] = useState([]);

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
    const options = {
      method: "GET",
      url: "https://toinh-api-tinh-thanh.onrender.com/province",
    };

    try {
      const response = await axios.request(options);
      setApiTinhThanh(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hanldeQuanHuyen = async (data) => {
    console.log(data);
    const options = {
      method: "GET",
      url: `https://toinh-api-tinh-thanh.onrender.com/district/?idProvince=${data}`,
    };

    try {
      const response = await axios.request(options);
      setApiQuanHuyen(response.data);
      console.log(response.data);
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
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOk = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");
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
      "/users/updateAddress"
    )
      .then((data) => {
        console.log(data);
        return;
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props}
      </Button>
      <Modal title="Thông tin cá nhân" width={700} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                filterOption={(input, option) => option.name?.toLowerCase().indexOf(input?.toLowerCase()) >= 0}
                filterSort={(optionA, optionB) => {
                  const nameA = ((optionA && optionA.name) || "")?.toLowerCase();
                  const nameB = ((optionB && optionB.name) || "")?.toLowerCase();
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
                filterOption={(input, option) => option.name?.toLowerCase().indexOf(input?.toLowerCase()) >= 0}
                filterSort={(optionA, optionB) => {
                  const nameA = ((optionA && optionA.name) || "")?.toLowerCase();
                  const nameB = ((optionB && optionB.name) || "")?.toLowerCase();
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
                filterOption={(input, option) => option.name?.toLowerCase().indexOf(input?.toLowerCase()) >= 0}
                filterSort={(optionA, optionB) => {
                  const nameA = ((optionA && optionA.name) || "")?.toLowerCase();
                  const nameB = ((optionB && optionB.name) || "")?.toLowerCase();
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
              <Input className={cx("input")} value={valueAddressCuThe} onChange={handleChangeAddressCuThe} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalMap;
