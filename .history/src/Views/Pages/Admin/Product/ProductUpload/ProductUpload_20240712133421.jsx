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
          <Row>
            <Col span={12}>
              <Row>
                <Col span={6}>Tên sản phẩm:</Col>
                <Col span={18}>1</Col>
              </Row>
              <Row>
                <Col span={6}>Giá:</Col>
                <Col span={18}>1</Col>
              </Row>
              <Row>
                <Col span={6}>Hình ảnh:</Col>
                <Col span={18}>1</Col>
              </Row>
              <Row>
                <Col span={6}>Kích cỡ:</Col>
                <Col span={18}>1</Col>
              </Row>
              <Row>
                <Col span={6}>Màu sắc:</Col>
                <Col span={18}>1</Col>
              </Row>
              <Row>
                <Col span={6}>Số lượng:</Col>
                <Col span={18}>1</Col>
              </Row>
            </Col>
            <Col span={12}>col-12</Col>
          </Row>
        </div>
        <CreateProduct />
      </div>
    </div>
  );
};

export default ProductUpload;
