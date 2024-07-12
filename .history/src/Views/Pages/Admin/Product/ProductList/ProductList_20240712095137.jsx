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
import { Call_Post_Api } from "../../../../../Components/CallApi/CallApis";

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
  const [totalProducts, setTotalProducts] = useState(0);
  // useEffect(() => {
  //   const token = Cookies.get("accessToken");
  //   const id = Cookies.get("id");

  //   if (token && id) {
  //     const cleanedJwtString = token.replace(/^"|"$/g, "");
  //     const cleanId = id.replace(/^"|"$/g, "");
  //     const requestOptions = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-api-key": process.env.REACT_APP_API_KEY,
  //         authorization: cleanedJwtString,
  //         "x-client-id": cleanId,
  //       },
  //     };

  //     fetch(`${URL}/product/getAll`, requestOptions)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setApiProduct(data.metadata);
  //         setTotalProducts(data.metadata.length);
  //       })
  //       .catch((error) => {
  //         console.error("Fetch error: ", error);
  //       });
  //   } else {
  //     console.error("Token or ID is not set in cookies.");
  //   }
  // }, [URL]);
  useEffect(() => {
    let isMounted = true; // flag to track if component is mounted

    Call_Post_Api(null, null, null, "/product/getAll")
      .then((data) => {
        if (isMounted) {
          setApiProduct(data.metadata);
          setTotalProducts(data.metadata.length);
          console.log(data.metadata);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    return () => {
      isMounted = false; // cleanup function to set isMounted to false
    };
  }, []);
  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <PageTitle title={pageTitleProps.title} items={pageTitleProps.items} />
        <div className={cx("list-floatcard")}>
          <FloatCard
            number={totalProducts}
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
            text="Total_brands"
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
