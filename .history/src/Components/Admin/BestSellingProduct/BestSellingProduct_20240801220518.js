import React, { useEffect, useState } from "react";
import { FaEye, FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Button, MenuItem, Pagination } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "../../../Views/Pages/Admin/DashBoard/DashBoard.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const BestSellingProduct = (datas) => {
  const [apis, setApis] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectShow, setSelectShow] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const handleChangeSelectShow = (event) => {
    setSelectShow(event.target.value);
  };
  const handleChangeSelectCategory = (event) => {
    setSelectCategory(event.target.value);
  };
  useEffect(() => {
    setApis(datas);
  }, [datas]);
  console.log(apis);
  return (
    <div className={cx("bestSelling")}>
      <h3 className={cx("titleSelling")}>Best Selling Products</h3>
      <div className={cx("select_by")}>
        <div className="col-md-3">
          <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }} size="small">
            <InputLabel id="demo-select-small-label">Show by</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectShow}
              label="Age"
              onChange={handleChangeSelectShow}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>10 row</MenuItem>
              <MenuItem value={20}>20 row</MenuItem>
              <MenuItem value={30}>30 row</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3 " style={{ marginLeft: "10px" }}>
          <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }} size="small">
            <InputLabel id="demo-select-small-label">Category by</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectCategory}
              label="Age"
              onChange={handleChangeSelectCategory}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
              <tr>
                <td>#{index + 1}</td>
                <td className={cx("info-products")}>
                  <div className={cx("productBox")}>
                    <div className={cx("imgWrapper")}>
                      <div className={cx("img")}>
                        <img
                          src={item.product_thumb}
                          alt="image_products"
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
                  <del className={cx("old")}>$35.00</del>
                  <span className={cx("new")}>$21.00</span>
                </td>
                <td>{item.product_quantity}</td>
                <td>{item.quantity}</td>
                <td>{item.product_quantity * item.quantity} </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={cx("page")}>
          <Pagination count={10} />
        </div>
      </div>
    </div>
  );
};

export default BestSellingProduct;
