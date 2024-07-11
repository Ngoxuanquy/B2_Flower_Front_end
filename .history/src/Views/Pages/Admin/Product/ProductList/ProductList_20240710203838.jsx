import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import classNames from "classnames/bind";
import FloatCard from "../../../../../Components/Admin/FloatCard/FloatCard";
import { FaBagShopping } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import ListProduct from "../../../../../Components/Admin/Products/ListProduct/ListProduct";
import PageTitle from "../../../../../Components/Admin/PageTitle/PageTitle";

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
  const URL = process.env.REACT_APP_URL;
  const [apiproducts, setApiProduct] = useState("");

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token.replace(/^"|"$/g, "");
    const cleanId = id.replace(/^"|"$/g, "");

    const requestOptions = {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": URL,
        authorization: cleanedJwtString,
        "x-client-id": cleanId,
      },
    };

    // Lấy dữ liệu của khách hàng
    fetch(URL + "/product/drafts/all", requestOptions)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setApiProduct(data.metadata);
        console.log(apiproducts);
      });
  }, [URL]);
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
        <ListProduct apis={apiproducts} />
      </div>
    </div>
  );
};

export default ProductList;
