import React, { useContext } from "react";
import ReactPlayer from "react-player";
import BLog from "../../../access/blog.mp4";
import classNames from "classnames/bind";
import styles from "./Blog.module.scss";
// import type { Dayjs } from 'dayjs';
import { Calendar } from "antd";
import ThemeConText from "../../../config/themeConText";
// import type { CalendarProps } from 'antd';

const cx = classNames.bind(styles);

function Blog() {
  const [theme, ordersLength] = useContext(ThemeConText);

  return (
    <div
      className={cx("container_")}
      style={{
        backgroundColor: theme.background,
        color: theme.color,
      }}
    >
      <div className="container_">
        {/* conten-blog */}
        <div className={cx("box-layout")}>
          <div className={cx("layout1")}>
            <h1>
              BLOG
              <p>Trang Chủ | Blog</p>
            </h1>
          </div>
          <div className={cx("video")}>
            <ReactPlayer
              url={BLog} // Thay đổi URL bằng URL của video bạn muốn nhúng
              controls={true} // Hiển thị thanh điều khiển
              width="100%" // Điều chỉnh kích thước video
              height="360px"
            />
          </div>
          <div className={cx("layout2")}>
            <div className={cx("left")}>
              <div>
                {/* ddanhs gia */}
                <div className={cx("danhgia")}>
                  <div className={cx("button-layout")}>
                    <div>
                      <div
                        className={cx("button")}
                        style={{
                          backgroundColor: theme.button,
                          color: theme.color,
                        }}
                      >
                        Quà tặng
                      </div>
                      <div
                        className={cx("button")}
                        style={{
                          backgroundColor: theme.button,
                          color: theme.color,
                        }}
                      >
                        Hộp quà
                      </div>
                      <div
                        className={cx("button")}
                        style={{
                          backgroundColor: theme.button,
                          color: theme.color,
                        }}
                      >
                        Đóng gói
                      </div>
                    </div>
                  </div>
                  <div className={cx("conten")}>
                    <div className={cx("box")}>
                      <div className={cx("text")}>Hộp quà mới</div>
                      <div className={cx("avata")}>
                        <img src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg" />
                        <div>Ngo Xuan Quy</div>
                        <li>28/10/2023</li>
                      </div>
                      <div className={cx("text-conten")}>
                        Cho dù bạn đạp xe qua mùa đông ẩm ướt và hoang dã hay cất xe đạp vào kho để chờ những ngày ấm áp hơn, những đêm dài,
                        nhiệt độ lạnh giá và thời gian ban ngày ngắn ngủi sẽ mang lại nhiều thời gian để dành cho chiếc xe đạp của bạn thêm
                        một chút tình yêu. Hãy…
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("right")}>
              <div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 500,
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  Lưu trữ
                </div>
                <Calendar
                  fullscreen={false}
                  style={{
                    backgroundColor: theme.background,
                    color: theme.color,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
