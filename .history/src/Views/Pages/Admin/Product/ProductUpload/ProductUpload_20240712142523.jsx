import React from "react";
import styles from "./ProductUpload.module.scss";
import classNames from "classnames/bind";
import PageTitle from "../../../../../Components/Admin/PageTitle/PageTitle";
import CreateProduct from "../CreateProduct";
import { Col, Row } from "antd";

const cx = classNames.bind(styles);
const ProductUpload = () => {
  const pageTitleProps = {
    title: "Product Upload",
    items: [
      { text: "Admin", link: "/admin/dash-board" },
      { text: "Product", link: "/admin/product-list" },
      { text: "Product Upload" },
    ],
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
                <Col
                  span={6}
                  style={{ display: "block", alignItems: "center" }}
                >
                  <label className={cx("lable")}>Tên sản phẩm:</label>
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
                  <label className={cx("lable")}></label>Giá:
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
                  <label className={cx("lable")}></label>Hình ảnh:
                </Col>
                <Col span={18}>1</Col>
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
