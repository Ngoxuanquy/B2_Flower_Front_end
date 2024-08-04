import React, { useEffect, useState } from "react";
import { MenuItem, Pagination } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "../../../Views/Pages/Admin/DashBoard/DashBoard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const BestSellingProduct = ({ data }) => {
  const [apis, setApis] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectShow, setSelectShow] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  console.log(data);
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setApis(data);

      // Compute categories
      const allCategories = data.map((product) => product.product_type);
      const uniqueCategories = [...new Set(allCategories)];
      setCategories(uniqueCategories);
    }
  }, [data]);

  const handleChangeSelectShow = (event) => {
    setSelectShow(event.target.value);
  };

  const handleChangeSelectCategory = (event) => {
    setSelectCategory(event.target.value);
  };

  return (
    <div className={cx("bestSelling")}>
      <h3 className={cx("titleSelling")}>Best Selling Products</h3>
      <div className={cx("select_by")}>
        <div className="col-md-3">
          <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }} size="small">
            <InputLabel id="select-show-label">Show by</InputLabel>
            <Select
              labelId="select-show-label"
              id="select-show"
              value={selectShow}
              onChange={handleChangeSelectShow}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>10 rows</MenuItem>
              <MenuItem value={20}>20 rows</MenuItem>
              <MenuItem value={30}>30 rows</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3" style={{ marginLeft: "10px" }}>
          <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }} size="small">
            <InputLabel id="select-category-label">Category by</InputLabel>
            <Select
              labelId="select-category-label"
              id="select-category"
              value={selectCategory}
              onChange={handleChangeSelectCategory}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={cx("table-responsive")}>
        <table className={cx("table", "table-bordered")}>
          <thead className={cx("thead-dark")}>
            <tr>
              <td>UID</td>
              <td>PRODUCT</td>
              <td>CATEGORY</td>
              <td>PRICE</td>
              <td>STOCK</td>
              <td>ORDER</td>
              <td>SALES</td>
            </tr>
          </thead>
          <tbody>
            {apis?.map((item, index) => (
              <tr key={item.product_id}>
                <td>#{index + 1}</td>
                <td className={cx("info-products")}>
                  <div className={cx("productBox")}>
                    <div className={cx("imgWrapper")}>
                      <div className={cx("img")}>
                        <img
                          src={item.product_thumb}
                          alt="product"
                          className="w-100"
                        />
                      </div>
                    </div>
                    <div className={cx("info")}>
                      <h6>{item.product_name}</h6>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit.
                      </p>
                    </div>
                  </div>
                </td>
                <td>{item.product_type}</td>
                <td>
                  <del className={cx("old")}>${item.old_price}</del>
                  <span className={cx("new")}>${item.product_price}</span>
                </td>
                <td>{item.product_quantity}</td>
                <td>{item.quantity}</td>
                <td>${item.product_quantity * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={cx("page")}>
          <Pagination count={Math.ceil(apis.length / (selectShow || 10))} />
        </div>
      </div>
    </div>
  );
};

export default BestSellingProduct;
