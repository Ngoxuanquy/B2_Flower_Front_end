import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { MdOutlineBlock } from "react-icons/md";
import Cookies from "js-cookie";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Pagination,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import styles from "./ListProduct.module.scss";
import { Call_Post_Api } from "../../../../Components/CallApi/CallApis";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const ListProduct = ({ apis }) => {
  const [api, setApi] = useState([]);
  const [selectShow, setSelectShow] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [updateProductData, setUpdateProductData] = useState({
    name: "",
    price: "",
    quantity: "",
    size: "",
    color: "",
  });

  useEffect(() => {
    if (apis && Array.isArray(apis)) {
      setApi(apis);
      setLoading(false);
    }
  }, [apis]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("accessToken")?.replace(/"/g, "");
        const id = Cookies.get("id")?.replace(/"/g, "");

        const data = await Call_Post_Api(
          null,
          token,
          id,
          `/shop/get_roles/${id}`,
          "GET"
        );
        setRoles(data.metadata);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const token = Cookies.get("accessToken")?.replace(/"/g, "");
      const id = Cookies.get("id")?.replace(/"/g, "");

      if (!token || !id) {
        console.error("Thiếu token hoặc client ID");
        return;
      }

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_API_KEY,
          Authorization: token,
          "x-client-id": id,
        },
      };

      const response = await fetch(
        `${process.env.REACT_APP_URL}/product/delete/${productId}`,
        requestOptions
      );

      if (response.ok) {
        alert("Xóa thành công!");
        window.location.reload();
      } else {
        console.error(
          "Yêu cầu xóa thất bại!",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleClickOpenDelete = (productId) => {
    setSelectedProductId(productId);
    setOpenDelete(true);
  };

  const handleCloseDelete = (confirm) => {
    setOpenDelete(false);
    if (confirm && selectedProductId) {
      handleDelete(selectedProductId);
    }
  };

  const handleClickOpenUpdate = (product) => {
    setSelectedProductId(product._id);
    setUpdateProductData({
      name: product.product_name,
      price: product.product_price,
      quantity: product.product_quantity,
      size: product.product_attributes.size,
      color: product.product_attributes.color,
    });
    setOpenUpdate(true);
  };

  const handleCloseUpdate = (confirm) => {
    setOpenUpdate(false);
    if (confirm) {
      handleUpdate();
    }
  };

  const handleUpdate = async () => {
    try {
      const token = Cookies.get("accessToken")?.replace(/"/g, "");
      const id = Cookies.get("id")?.replace(/"/g, "");

      if (!token || !id) {
        console.error("Thiếu token hoặc client ID");
        return;
      }

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_API_KEY,
          Authorization: token,
          "x-client-id": id,
        },
        body: JSON.stringify(updateProductData),
      };

      const response = await fetch(
        `${process.env.REACT_APP_URL}/product/update/${selectedProductId}`,
        requestOptions
      );

      if (response.ok) {
        alert("Cập nhật thành công!");
        window.location.reload();
      } else {
        console.error(
          "Yêu cầu cập nhật thất bại!",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  const handleChangeUpdateProductData = (event) => {
    const { name, value } = event.target;
    setUpdateProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeSelectShow = (event) => {
    setSelectShow(event.target.value);
  };

  const handleChangeSelectCategory = (event) => {
    setSelectCategory(event.target.value);
  };

  return (
    <div className={cx("container")}>
      <h4 className={cx("titleRegistered")}>Products List</h4>
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
          <thead>
            <tr>
              <th>UID</th>
              <th>NAME</th>
              <th>RATING</th>
              <th>PRICE</th>
              <th>STOCK</th>
              <th>SIZE</th>
              <th>COLOR</th>
              <th>ACTION</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {api?.map((item, index) => (
                <React.Fragment key={item._id}>
                  <tr>
                    <td>#{index + 1}</td>
                    <td>
                      <div className={cx("info-user")}>
                        <div className={cx("imgWrapper")}>
                          <img
                            src={item.product_thumb}
                            alt="image_products"
                            className="w-100"
                          />
                        </div>
                        <p>{item.product_name}</p>
                      </div>
                    </td>
                    <td>{item.product_ratingsAverage}</td>
                    <td>
                      <div className={cx("role")}>{item.product_price}</div>
                    </td>
                    <td>
                      <span>{item.product_quantity}</span>
                    </td>
                    <td>{item.product_attributes.size}</td>
                    <td>{item.product_attributes.color}</td>
                    <td>
                      <div className={cx("actions")}>
                        <Button
                          className={cx("success")}
                          color="success"
                          onClick={() => handleClickOpenUpdate(item)}
                        >
                          <FaPencil />
                        </Button>
                        {(roles.includes("DELETE") ||
                          roles.includes("ADMIN")) &&
                          (item.product_quantity === 0 ? (
                            <Button
                              className={cx("error")}
                              color="error"
                              onClick={() => handleClickOpenDelete(item._id)}
                            >
                              <MdOutlineBlock />
                            </Button>
                          ) : (
                            <div>
                              <Button className={cx("error")} disabled>
                                <MdOutlineBlock />
                              </Button>
                            </div>
                          ))}
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          )}
        </table>
        {loading && ( // Render loading spinner while loading is true
          <div className={cx("loading-container")}>
            <CircularProgress />
          </div>
        )}
        <div className={cx("page")}>
          <Pagination count={10} />
        </div>
      </div>
      <Dialog open={openDelete} onClose={() => handleCloseDelete(false)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa mục này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDelete(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={() => handleCloseDelete(true)} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openUpdate} onClose={() => handleCloseUpdate(false)}>
        <DialogTitle>Cập nhật sản phẩm</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={updateProductData.name}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={updateProductData.price}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            name="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={updateProductData.quantity}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            name="size"
            label="Size"
            type="text"
            fullWidth
            value={updateProductData.size}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            name="color"
            label="Color"
            type="text"
            fullWidth
            value={updateProductData.color}
            onChange={handleChangeUpdateProductData}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseUpdate(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={() => handleCloseUpdate(true)} color="primary">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListProduct;
