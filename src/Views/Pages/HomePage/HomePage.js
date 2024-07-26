import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./homepage.module.scss";
import AnhNen from "../../../access/anhnen.png";
import Banner1 from "../../../access/banner1.png";
import { Button, Radio, Space, Divider, Modal } from "antd";
import AOS from "aos";
import ButtomNavigation from "../../../Components/ButtomNavigation/ButtomNavigation";
import ThemeConText from "../../../config/themeConText";
import Cookies from "js-cookie";
import { Call_Post_Api } from "../../../Components/CallApi/CallApis";

const cx = classNames.bind(styles);

const HomePage = () => {
  const [theme] = useContext(ThemeConText);
  const [colorButton, setColorButton] = useState("rgb(253, 124, 147)"); // Default color

  const [isModalOpen, setModalOpen] = useState(true);
  const [apis, setApis] = useState(true);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const colorButtonFromCookie = Cookies.get("buttonColor");
    if (colorButtonFromCookie) {
      setColorButton(colorButtonFromCookie.replace(/"/g, ""));
    }

    AOS.init(); // Initialize AOS animation library
  }, []); // Empty dependency array means this effect runs only once on mount

  const getApiDiscount = () => {
    const name = Cookies.get("name")?.replace(/"/g, "");

    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");
    Call_Post_Api(
      { email: name },
      cleanedJwtString,
      cleanId,
      `/discount/updateNotification`
    )
      .then((data) => {
        const convertedProducts = data.metadata.map((product) => ({
          id: product._id,
        }));
        setIds(convertedProducts);
        setApis(data.metadata);
      })
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    getApiDiscount();
  }, []);

  const UpdateNotication = () => {
    const name = Cookies.get("name")?.replace(/"/g, "");

    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");
    Call_Post_Api(
      { email: name },
      cleanedJwtString,
      cleanId,
      `/discount/addUpdateNotification`
    )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log({ err }));
  };

  const openModal = () => setModalOpen(true);
  const handleCancel = () => {
    UpdateNotication();
    setModalOpen(false);
  };
  const handleOk = () => {
    UpdateNotication();
    setModalOpen(false);
  };

  return (
    <div
      className={cx("container_")}
      style={{
        backgroundColor: theme.background,
        color: theme.color,
      }}
    >
      {apis.length > 0 ? (
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <h2>Chúc mừng</h2>
          <p
            style={{
              marginTop: "20px",
            }}
          >
            Bạn đã nhận được mã khuyến mãi từ cửa hàng:
          </p>
          <div>
            {apis.map((api) => (
              <div>
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Tên khuyến mãi:
                </span>
                {api.discount_code}
                <p>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Value:
                  </span>{" "}
                  {api.discount_value}
                </p>
              </div>
            ))}
          </div>
        </Modal>
      ) : null}
      <div className="container_">
        <div className={cx("elementor-widget-container_")}>
          <div className={cx("layout1")}>
            <div
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              <h1>2Be Flower</h1>
              <h3>
                Chào quý khách hàng thân yêu
                <br /> Chúng tôi rất tự hào và hân hạnh được giới thiệu đến bạn
                dịch vụ độc đáo và phong cách của chúng tôi trong lĩnh vực đồ
                tặng quà. Với tâm huyết và kinh nghiệm dày dặn <br />
                Tại đây, bạn sẽ tìm thấy một sự đa dạng độc đáo của các món quà
                độc đáo, từ những chiếc quyển sách tuyệt vời, đồ trang sức tinh
                xảo, cho đến những sản phẩm thủ công tỉ mỉ được tạo ra bởi những
                nghệ nhân tài năng. chúng tôi cam kết mang đến cho bạn những
                trải nghiệm mua sắm đầy ý nghĩa và độc đáo.
              </h3>
              <div className={cx("muangay")}>Mua ngay bây giờ</div>
            </div>
            <div
              data-aos="fade-left"
              data-aos-anchor="#example-anchor"
              data-aos-offset="500"
              data-aos-duration="1500"
            >
              <img src={AnhNen} className={cx("img_layout1")} alt="AnhNen" />
            </div>
          </div>

          {/* Layout 2 */}
          <div className={cx("layout2")}>
            <div className={cx("box_layout")}>
              <div
                className={cx("box")}
                style={{
                  backgroundColor: colorButton,
                }}
              >
                <div className={cx("conten")}>
                  <div>Tặng quà 20/11</div>
                  <h3>Các mẫu thiết kế</h3>
                  <button>XEM TẤT CẢ</button>
                </div>
                <img
                  src={Banner1}
                  className={cx("img_conten1")}
                  alt="Banner1"
                />
              </div>
            </div>
            <div className={cx("box_layout")}>
              <div
                className={cx("box")}
                style={{
                  backgroundColor: theme.button || colorButton,
                }}
              >
                <div className={cx("conten")}>
                  <div>Tặng quà 20/11</div>
                  <h3>Các mẫu thiết kế</h3>
                  <button>XEM TẤT CẢ</button>
                </div>
                <img
                  src={Banner1}
                  className={cx("img_conten1")}
                  alt="Banner1"
                />
              </div>
            </div>
            <div className={cx("box_layout")}>
              <div
                className={cx("box")}
                style={{
                  backgroundColor:
                    theme.button !== null ? colorButton : theme.button,
                }}
              >
                <div className={cx("conten")}>
                  <div>Tặng quà 20/11</div>
                  <h3>Các mẫu thiết kế</h3>
                  <button>XEM TẤT CẢ</button>
                </div>
                <img
                  src={Banner1}
                  className={cx("img_conten1")}
                  alt="Banner1"
                />
              </div>
            </div>
          </div>

          {/* Layout 3 */}
          <div
            className={cx("layout3")}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <div className={cx("box_layout3")}>
              <div className={cx("conten")}>
                <div className={cx("SPECIAL")}>
                  <div>
                    <p />
                    <span style={{}}>SPECIAL</span>
                    <p />
                  </div>
                </div>
                <div className={cx("sanphamnoibat")}>
                  <div>SẢN PHẨM NỔI BẬT</div>
                </div>
                <div>
                  <Radio.Group>
                    <Radio.Button value="large" className={cx("Radio")}>
                      Đồ có sẵn
                    </Radio.Button>
                    <Radio.Button value="default" className={cx("Radio")}>
                      Đồ thiết kế
                    </Radio.Button>
                    <Radio.Button value="small" className={cx("Radio")}>
                      Đồ yêu cầu
                    </Radio.Button>
                    <Radio.Button value="small" className={cx("Radio")}>
                      Khác
                    </Radio.Button>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>

          {/* Sản phẩm */}
          <div
            className={cx("sanpham")}
            data-aos="fade-up"
            data-aos-duration="3000"
            style={{ marginBottom: "50px" }}
          >
            <div className={cx("box_sanpham")}>
              <div>
                <img
                  className={cx("img1")}
                  src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/46dddd2899d84ae726305a643600b091-23-09-18-29.jpg"
                  alt="Img1"
                />
              </div>
              <div>
                <img
                  src="https://res.cloudinary.com/dvqmndx5j/image/upload/v1698825956/banhang/cq5dxtvrcssx6lsphmni.jpg"
                  alt="Img2"
                />
                <img
                  src="https://res.cloudinary.com/dvqmndx5j/image/upload/v1698826029/banhang/yyptfqyrcuyuweziyhew.jpg"
                  alt="Img3"
                />
                <img
                  src="https://res.cloudinary.com/dvqmndx5j/image/upload/v1698826142/banhang/omqv445si5b4r0ax0wqs.jpg"
                  alt="Img4"
                />
                <img
                  src="https://res.cloudinary.com/dvqmndx5j/image/upload/v1698826172/banhang/ms5adyn7olihvzdofsll.jpg"
                  alt="Img5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <ButtomNavigation />
    </div>
  );
};

export default HomePage;
