import React, { useState } from "react";
import styles from "./ProductUpload.module.scss";
import classNames from "classnames/bind";
import PageTitle from "../../../../../Components/Admin/PageTitle/PageTitle";
import CreateProduct from "../CreateProduct";
import { Col, Row } from "antd";

const cx = classNames.bind(styles);
const ProductUpload = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const pageTitleProps = {
    title: "Product Upload",
    items: [
      { text: "Admin", link: "/admin/dash-board" },
      { text: "Product", link: "/admin/product-list" },
      { text: "Product Upload" },
    ],
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };
  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <PageTitle title={pageTitleProps.title} items={pageTitleProps.items} />
        <div className={cx("information")}>
          <div className={cx("info-header")}>
            <h4>Basic Information</h4>
          </div>
          <Row className={cx("row")}>
            <Col span={12} className={cx("col")}>
              <Row style={{ marginBottom: 10 }}>
                <Col span={6}>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      fontSize: "16px",
                    }}
                  >
                    Tên sản phẩm:
                  </div>
                </Col>
                <Col span={18}>
                  <div className={cx("wave-group")}>
                    <input required type="text" className={cx("input")} />
                    <span className={cx("bar")}></span>
                    <label className={cx("label")}>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 0 }}
                      >
                        N
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 1 }}
                      >
                        a
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 2 }}
                      >
                        m
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 3 }}
                      >
                        e
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginBottom: 10 }}>
                <Col span={6} style={{ alignItems: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      fontSize: "16px",
                    }}
                  >
                    Giá:
                  </div>
                </Col>
                <Col span={18}>
                  <div className={cx("wave-group")}>
                    <input required type="text" className={cx("input")} />
                    <span className={cx("bar")}></span>
                    <label className={cx("label")}>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 0 }}
                      >
                        G
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 1 }}
                      >
                        i
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 2 }}
                      >
                        á
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginBottom: 10 }}>
                <Col span={6} style={{ alignItems: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      fontSize: "16px",
                    }}
                  >
                    Hình ảnh:
                  </div>
                </Col>
                <Col span={18}>
                  <div className={cx("image-input")}>
                    <input
                      type="file"
                      accept="image/*"
                      id="imageInput"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="imageInput" className={cx("image-button")}>
                      <i className="far fa-image"></i> Choose image
                    </label>
                  </div>
                  {uploadedImage && (
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      style={{
                        width: 100,
                        height: 100,
                        opacity: 0.9,
                        marginLeft: 20,
                      }}
                    />
                  )}
                </Col>
              </Row>
            </Col>
            <Col span={12} className={cx("col")}>
              <Row style={{ marginBottom: 10 }}>
                <Col span={6} style={{ alignItems: "center" }}>
                  <label className={cx("lable")}></label>Kích cỡ:
                </Col>
                <Col span={18}>1</Col>
              </Row>
              <Row style={{ marginBottom: 10 }}>
                <Col span={6} style={{ alignItems: "center" }}>
                  <label className={cx("lable")}></label>Màu sắc:
                </Col>
                <Col span={18}>1</Col>
              </Row>
              <Row style={{ marginBottom: 10 }}>
                <Col span={6} style={{ alignItems: "center" }}>
                  <label className={cx("lable")}></label>Số lượng:
                </Col>
                <Col span={18}>1</Col>
              </Row>
            </Col>
          </Row>
        </div>
        <CreateProduct />
      </div>
    </div>
  );
};

export default ProductUpload;
