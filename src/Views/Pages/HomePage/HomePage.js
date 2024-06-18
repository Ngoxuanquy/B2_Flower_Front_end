import React, { useContext, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./homepage.module.scss";
import AnhNen from "../../../access/anhnen.png";
import Banner1 from "../../../access/banner1.png";
import { Button, Radio, Space, Divider } from "antd";
import AOS from "aos";
// import 'aos/dist/aos.css';
import ButtomNavigation from "../../../Components/ButtomNavigation/ButtomNavigation";
import ThemeConText from "../../../config/themeConText";

const cx = classNames.bind(styles);
const HomePage = () => {
  const [theme, ordersLength] = useContext(ThemeConText);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      className={cx("container_")}
      style={{
        backgroundColor: theme.background,
        color: theme.color,
      }}
    >
      <div className="container_">
        <div className={cx("elementor-widget-container_")}>
          <div className={cx("layout1")}>
            <div data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
              <h1>LI GIFT</h1>
              <h3>
                Chào quý khách hàng thân yêu
                <br /> Chúng tôi rất tự hào và hân hạnh được giới thiệu đến bạn dịch vụ độc đáo và phong cách của chúng tôi trong lĩnh vực
                đồ tặng quà. Với tâm huyết và kinh nghiệm dày dặn <br />
                Tại đây, bạn sẽ tìm thấy một sự đa dạng độc đáo của các món quà độc đáo, từ những chiếc quyển sách tuyệt vời, đồ trang sức
                tinh xảo, cho đến những sản phẩm thủ công tỉ mỉ được tạo ra bởi những nghệ nhân tài năng. chúng tôi cam kết mang đến cho bạn
                những trải nghiệm mua sắm đầy ý nghĩa và độc đáo.
              </h3>
              <div className={cx("muangay")}>Mua ngay bây giờ</div>
            </div>
            <div data-aos="fade-left" data-aos-anchor="#example-anchor" data-aos-offset="500" data-aos-duration="1500">
              <img src={AnhNen} className={cx("img_layout1")} />
            </div>
          </div>
          {/* layout2 */}
          <div className={cx("layout2")}>
            <div className={cx("box_layout")}>
              <div className={cx("box")}>
                <div className={cx("conten")}>
                  <div>Tặng quà 20/11</div>
                  <h3>Các mẫu thiết kế</h3>
                  <button>XEM TẤT CẢ</button>
                </div>
                <img src={Banner1} className={cx("img_conten1")} />
              </div>
            </div>
            <div className={cx("box_layout")}>
              <div className={cx("box")}>
                <div className={cx("conten")}>
                  <div>Tặng quà 20/11</div>
                  <h3>Các mẫu thiết kế</h3>
                  <button>XEM TẤT CẢ</button>
                </div>
                <img src={Banner1} className={cx("img_conten1")} />
              </div>
            </div>
            <div className={cx("box_layout")}>
              <div className={cx("box")}>
                <div className={cx("conten")}>
                  <div>Tặng quà 20/11</div>
                  <h3>Các mẫu thiết kế</h3>
                  <button>XEM TẤT CẢ</button>
                </div>
                <img src={Banner1} className={cx("img_conten1")} />
              </div>
            </div>
          </div>

          {/* layout3 */}

          <div className={cx("layout3")} data-aos="fade-up" data-aos-duration="3000">
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
          {/* sản phẩm */}

          <div
            className={cx("sanpham")}
            data-aos="fade-up"
            data-aos-duration="3000"
            style={{
              marginBottom: "50px",
            }}
          >
            <div className={cx("box_sanpham")}>
              <div>
                <img
                  className={cx("img1")}
                  src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/46dddd2899d84ae726305a643600b091-23-09-18-29.jpg"
                />
              </div>
              <div>
                <img src="https://res.cloudinary.com/dvqmndx5j/image/upload/v1698825956/banhang/cq5dxtvrcssx6lsphmni.jpg" />
                <img src="https://res.cloudinary.com/dvqmndx5j/image/upload/v1698826029/banhang/yyptfqyrcuyuweziyhew.jpg" />
                <img src="https://res.cloudinary.com/dvqmndx5j/image/upload/v1698826142/banhang/omqv445si5b4r0ax0wqs.jpg" />
                <img src="https://res.cloudinary.com/dvqmndx5j/image/upload/v1698826172/banhang/ms5adyn7olihvzdofsll.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
