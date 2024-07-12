import React from "react";
import styles from "./ProductUpload.module.scss";
import classNames from "classnames/bind";
import PageTitle from "../../../../../Components/Admin/PageTitle/PageTitle";
import CreateProduct from "../CreateProduct";
import { TextField } from "@mui/material";

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
          <div>
            <p>Name: </p>
            <input type="text" />
          </div>
        </div>
      </div>
      <
    </div>
  );
};

export default ProductUpload;
