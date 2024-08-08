import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import classNames from "classnames/bind";
import FloatCard from "../../../../../Components/Admin/FloatCard/FloatCard";
import { FaBagShopping } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import ListProduct from "../../../../../Components/Admin/Products/ListProduct/ListProduct";
import PageTitle from "../../../../../Components/Admin/PageTitle/PageTitle";
import { Call_Post_Api } from "../../../../../Components/CallApi/CallApis";
import { Pagination } from "@mui/material";

const cx = classNames.bind(styles);

const ProductList = () => {
  const pageTitleProps = {
    title: "Danh sách sản phẩm",
    items: [
      { text: "Admin", link: "/admin/dash-board" },
      { text: "Sản phẩm", link: "/admin/danh-sách-sản-phẩm" },
      { text: "Danh sách sản phẩm" },
    ],
  };

  const [apiproducts, setApiProduct] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchProducts = () => {
    Call_Post_Api(null, null, null, "/product/getAll")
      .then((data) => {
        const products = data.metadata;
        setApiProduct(data.metadata);
        setTotalProducts(data.metadata.length);
        const uniqueCategories = new Set(
          products.map((product) => product.product_type)
        );
        setTotalCategories(uniqueCategories.size);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = apiproducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <PageTitle title={pageTitleProps.title} items={pageTitleProps.items} />
        <div className={cx("list-floatcard")}>
          <FloatCard
            number={totalProducts}
            text="Tổng sản phẩm"
            backgroundColor="linear-gradient(#64b3f6, #2b77e5)"
            icon={<FaBagShopping />}
            iconColor="#96cefa"
          />
          <FloatCard
            number={totalCategories}
            text="Loại sản phẩm"
            backgroundColor="linear-gradient(#4eda89, #1a9f53)"
            icon={<AiFillProduct />}
            iconColor="#89ecb3"
          />
          {/* <FloatCard
            number="249"
            text="Total_brands"
            backgroundColor="linear-gradient(#ed68ff, #be0ee1)"
            icon={<IoShieldCheckmarkSharp />}
            iconColor="#f3a0ff"
          /> */}
        </div>
        <ListProduct apis={currentProducts} fetchProducts={fetchProducts} />
        <Pagination
          count={Math.ceil(totalProducts / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default ProductList;
