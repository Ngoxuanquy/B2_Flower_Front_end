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
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  useEffect(() => {
    let isMounted = true;

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
      isMounted = false;
    };
  }, []);

  // Tính toán index bắt đầu và kết thúc của sản phẩm trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = apiproducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Chuyển đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
        <ListProduct apis={currentProducts} />
        {/* Phân trang */}
        <ul className={cx("pagination")}>
          {Array.from(
            { length: Math.ceil(totalProducts / productsPerPage) },
            (_, i) => i + 1
          ).map((page) => (
            <li key={page} className={cx("page-item")}>
              <button
                onClick={() => paginate(page)}
                className={cx("page-link")}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
