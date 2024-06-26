import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./LienHe.module.scss";
import { Button, Checkbox, Form, Input } from "antd";
import ThemeConText from "../../../config/themeConText";

const cx = classNames.bind(styles);

const LienHe = () => {
  const [theme, ordersLength] = useContext(ThemeConText);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className={cx("container_")}
      style={{
        backgroundColor: theme.background,
        color: theme.color,
      }}
    >
      <div className="container_">
        <div className={cx("box-layout")}>
          <div className={cx("layout")}>
            <div>
              <div className={cx("contac")}>Liên Hệ</div>
              <img className={cx("img_layout1")} src="https://static.vinwonders.com/production/qua-tang-vip-1.jpg" />
            </div>

            {/* Conten */}
            <div className={cx("conten")}>
              <div className={cx("text-conten")}>
                Xe đạp điện tử của chúng tôi cho phép bạn khám phá nhiều ngọn núi hơn và vượt qua nhiều vòng đua hơn bao giờ hết. Cảm giác
                tự nhiên, khả năng tăng tốc phù hợp với đường mòn sẽ giúp bạn leo lên và cho phép bạn trở thành con thoi của riêng mình.
              </div>
            </div>

            {/* Lieen hee */}
            <div className={cx("LienHe")}>
              <div className={cx("Layout-lienhe")}>
                <div>
                  Ghé thăm địa điểm
                  <span>51, ngox 252, Trinh dinh cuu, Hoang Mai, HN</span>
                </div>
                <div>
                  Hãy gọi cho chúng tôi
                  <span>0332062668</span>
                </div>
                <div>
                  Tìm kiếm công việc
                  <span>Email: ngoxuanquy1812@gmail.com</span>
                </div>
              </div>
            </div>

            {/* map */}

            <div className={cx("map")}>
              <div className={cx("box")}>
                <div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.33841883971!2d105.8321561747949!3d20.979067289484348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac595f3702d1%3A0x2f13a2b3724d451!2zTmcuIDI1MiBQLiBUcuG7i25oIMSQw6xuaCBD4butdSwgxJDhu4tuaCBDw7RuZyBI4bqhLCDEkOG7i25oIEPDtG5nLCBIb8OgbmcgTWFpLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1698416291205!5m2!1svi!2s"
                    allowfullscreen=""
                    style={{
                      borderRadius: "10px",
                    }}
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className={cx("gmail")}>
                  <div className={cx("conten")}>Gửi tin nhắn</div>
                  <div>
                    <Form
                      name="basic"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      style={{ maxWidth: 700 }}
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                      >
                        <Input
                          style={{
                            backgroundColor: theme.background,
                            color: theme.color,
                          }}
                        />
                      </Form.Item>

                      <Form.Item
                        label="Email"
                        name="Email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Email!",
                          },
                        ]}
                      >
                        <Input
                          style={{
                            backgroundColor: theme.background,
                            color: theme.color,
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Chủ đề"
                        name="Chủ đề"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Chủ đề!",
                          },
                        ]}
                      >
                        <Input
                          style={{
                            backgroundColor: theme.background,
                            color: theme.color,
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Nội dung "
                        name="Nội dung"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Nội dung !",
                          },
                        ]}
                      >
                        <Input
                          style={{
                            backgroundColor: theme.background,
                            color: theme.color,
                          }}
                        />
                      </Form.Item>

                      <Form.Item
                        style={{
                          width: "100px",
                          display: "inline",
                        }}
                      >
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{
                            width: "100px",
                            display: "inline",
                          }}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LienHe;
