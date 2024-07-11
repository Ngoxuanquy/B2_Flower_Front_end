import React from "react";
import styles from "./ProductList.module.scss";
import classNames from "classnames/bind";
import PageTitle from "../../../../../Components/Admin/PageTitle/PageTitle";

const cx = classNames.bind(styles);
const ProductUpload = () => {
  const pageTitleProps = {
    title: "Product List",
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
      </div>
    </div>
  );
};

export default ProductUpload;
