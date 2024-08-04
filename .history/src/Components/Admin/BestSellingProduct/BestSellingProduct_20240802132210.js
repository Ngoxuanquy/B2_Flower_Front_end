import React, { useEffect, useState } from "react";
import { Button, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "../../../Views/Pages/Admin/DashBoard/DashBoard.module.scss";
import classNames from "classnames/bind";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const cx = classNames.bind(styles);

const BestSellingProduct = ({ data, onNumTopProductsChange }) => {
  const [apis, setApis] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectShow, setSelectShow] = useState(5);
  const [selectCategory, setSelectCategory] = useState("");

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setApis(data);

      // Compute categories
      const allCategories = data.map((product) => product.product_type);
      const uniqueCategories = [...new Set(allCategories)];
      setCategories(uniqueCategories);
    }
  }, [data]);
  console.log(apis);
  useEffect(() => {
    if (onNumTopProductsChange) {
      onNumTopProductsChange(selectShow);
    }
  }, [selectShow]);

  const handleChangeSelectShow = (event) => {
    setSelectShow(event.target.value);
  };

  const handleChangeSelectCategory = (event) => {
    setSelectCategory(event.target.value);
  };

  const filteredProducts = selectCategory
    ? apis.filter((item) => item.product_type === selectCategory)
    : apis;

  // Function to export data to Excel
  const exportToExcel = () => {
    const topProducts = filteredProducts.slice(0, selectShow);

    // Thêm số thứ tự (STT) vào từng sản phẩm
    const dataWithIndex = topProducts.map((item, index) => ({
      STT: index + 1, // Số thứ tự bắt đầu từ 1
      "Sản Phẩm": item.product_name,
      Loại: item.product_type,
      Giá: `${item.product_price} đ`,
      Kho: item.product_quantity,
      "Đã bán": item.quantity,
      "Tổng tiền": `${item.product_price * item.quantity} đ`,
    }));

    // Chuyển đổi dữ liệu thành bảng tính
    const ws = XLSX.utils.json_to_sheet(dataWithIndex);

    // Tạo workbook mới và thêm sheet vào đó
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BestSellingProducts");

    // Ghi workbook vào file Excel
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    // Tải xuống file Excel
    saveAs(blob, "BestSellingProducts.xlsx");
  };

  return (
    <div className={cx("bestSelling")}>
      <h3 className={cx("titleSelling")}>Sản phẩm bán chạy nhất</h3>
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
              <MenuItem value={5}>Top 5</MenuItem>
              <MenuItem value={10}>Top 10</MenuItem>
              <MenuItem value={15}>Top 15</MenuItem>
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
        <Button onClick={exportToExcel} className={cx("export-button")}>
          Export to Excel
        </Button>
      </div>
      <div className={cx("table-responsive")}>
        <table className={cx("table", "table-bordered")}>
          <thead className={cx("thead-dark")}>
            <tr>
              <td>STT</td>
              <td>Sản Phẩm</td>
              <td>Loại</td>
              <td>Giá</td>
              <td>Kho</td>
              <td>Đã bán</td>
              <td>Tổng tiền</td>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.slice(0, selectShow).map((item, index) => (
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
                      <p>{item.product_description}</p>
                    </div>
                  </div>
                </td>
                <td>{item.product_type}</td>
                <td>
                  <del className={cx("old")}>${item.old_price}</del>
                  <span className={cx("new")}>{item.product_price} đ</span>
                </td>
                <td>{item.product_quantity}</td>
                <td>{item.quantity}</td>
                <td>{item.product_price * item.quantity} đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestSellingProduct;
