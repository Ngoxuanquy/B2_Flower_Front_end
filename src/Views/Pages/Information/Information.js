import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Information.module.scss";
import { Tabs } from "antd";
import ModalMap from "../../../Components/ModalMap/ModalMap";
import { Call_Post_Api } from "../../../Components/CallApi/CallApis";
import Cookies from "js-cookie";
import { Radio } from "antd";
const { TabPane } = Tabs;

const Information = () => {
  const [address, setAddress] = useState([]);

  const cx = classNames.bind(styles);
  const titles = ["Tài khoản", "Ví của B2-FLOWER", "Đơn hàng", "Địa chỉ"];
  const [activeTab, setActiveTab] = useState("0"); // State to track the active tab

  const handleTabChange = (key) => {
    setActiveTab(key);

    if (key === "3") {
      getApiAdrressUser();
    }
  };

  const getApiAdrressUser = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");

    Call_Post_Api(null, cleanedJwtString, cleanId, `/users/getAddressUser/${cleanId}`, "GET")
      .then((data) => {
        setAddress(data.metadata.address);
        console.log(data.metadata.address);
        return;
      })
      .catch((err) => console.log({ err }));
  };

  const [selectedValue, setSelectedValue] = useState(null);

  const onChange = (e) => {
    setSelectedValue(e.target.value);
    console.log(e.target);
  };

  return (
    <div className={cx("container_")}>
      <div className={cx("box-title")}>
        <div className={cx("imformation")}>
          <div>Quy</div>
        </div>
        <div className={cx("conten")}>{titles[activeTab]}</div>
      </div>
      <hr
        style={{
          width: "90%",
          margin: "0 auto", // Để căn giữa theo chiều ngang
          borderTop: "1px solid #000", // Để định dạng màu sắc và độ dày của đường kẻ
          marginTop: "20px",
        }}
      />
      <div className={cx("tabs")}>
        <Tabs
          activeKey={activeTab} // Set active tab based on state
          tabPosition={"left"}
          style={{
            height: 220,
          }}
          onChange={handleTabChange} // Handle tab change
        >
          {titles.map((title, index) => (
            <TabPane tab={title} key={String(index)}>
              {title === "Địa chỉ" ? (
                <div className={cx("tabs-item")}>
                  <div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontFamily: "bold",
                      }}
                    >
                      Địa chỉ của tôi
                    </div>
                    <Radio.Group onChange={onChange} value={selectedValue}>
                      {address?.map((item, index) => (
                        <div key={index}>
                          <Radio value={item}>
                            <div>
                              <div className="number">
                                <span>{item.name}</span>
                                <span
                                  style={{
                                    marginLeft: "20px",
                                  }}
                                >
                                  {item.number}
                                </span>
                              </div>
                              <div>
                                <p>
                                  {item.diaChiCuThe}, {item.phuongXa}, {item.quanHuyen}, {item.tinhThanh}
                                </p>
                              </div>
                            </div>
                          </Radio>
                        </div>
                      ))}
                    </Radio.Group>
                    <div>
                      <button
                        style={{
                          padding: "5px",
                        }}
                      >
                        Địa chỉ lấy hàng
                      </button>
                    </div>
                  </div>
                  <div>
                    <div>
                      <ModalMap props={"Cập Nhật"} />
                    </div>
                  </div>
                </div>
              ) : (
                "Chưa có địa chỉ, vui lòng nhập địa chỉ "
              )}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Information;
