import React from "react";
import styles from "./ProductList.module.scss";
import classNames from "classnames/bind";
import PageTitle from "../../../../Components/Admin/PageTitle/PageTitle";
import FloatCard from "../../../../Components/Admin/FloatCard/FloatCard";
import { FaBagShopping } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import ListProduct from "../../../../Components/Admin/Products/ListProduct/ListProduct";

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
            backgroundColor="linear-gradient(#64b3f6, #2b77e5)"
            icon={<FaBagShopping />}
            iconColor="#96cefa"
          />
          <FloatCard
            number="605"
            text="Total_categories"
            backgroundColor="linear-gradient(#4eda89, #1a9f53)"
            icon={<AiFillProduct />}
            iconColor="#89ecb3"
          />
          <FloatCard
            number="249"
            text="Total_barnds"
            backgroundColor="linear-gradient(#ed68ff, #be0ee1)"
            icon={<IoShieldCheckmarkSharp />}
            iconColor="#f3a0ff"
          />
        </div>
        <ListProduct />
      </div>
    </div>
  );
};

export default ProductList;
