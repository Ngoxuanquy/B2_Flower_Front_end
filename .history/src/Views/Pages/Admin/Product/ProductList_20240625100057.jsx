import React from "react";
import styles from "./ProductList.module.scss";
import classNames from "classnames/bind";
import { MdPending } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import PageTitle from "../../../../Components/Admin/PageTitle/PageTitle";
import FloatCard from "../../../../Components/Admin/FloatCard/FloatCard";
import { FaBagShopping } from "react-icons/fa6";

const cx = classNames.bind(styles);
const ProductList = () => {
  const pageTitleProps = {
    title: "Product List",
    items: [
      { text: "Admin", link: "/admin/dash-board" },
      { text: "Product", link: "/admin/product-list" },
      { text: "Product List" },
    ],
  };
  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <PageTitle title={pageTitleProps.title} items={pageTitleProps.items} />
        <div className={cx("list-floatcard")}>
          <FloatCard
            number="547"
            text="Total Products"
            backgroundColor="linear-gradient(#ed68ff, #be0ee1)"
            icon={<FaBagShopping />}
            iconColor="#f3a0ff"
          />
          <FloatCard
            number="605"
            text="Approved Users"
            backgroundColor="linear-gradient(#4eda89, #1a9f53)"
            icon={<FaCheckCircle />}
            iconColor="#89ecb3"
          />
          <FloatCard
            number="249"
            text="Blocked Users"
            backgroundColor="linear-gradient(#ff6179, #f11133)"
            icon={<IoIosRemoveCircle />}
            iconColor="#ff9baa"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
