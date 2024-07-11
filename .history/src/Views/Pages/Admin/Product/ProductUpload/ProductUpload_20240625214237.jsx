import React from "react";
import styles from "./ProductList.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const ProductUpload = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <PageTitle title={pageTitleProps.title} items={pageTitleProps.items} />
      </div>
    </div>
  );
};

export default ProductUpload;
