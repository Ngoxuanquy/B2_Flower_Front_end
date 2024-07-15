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
  styled,
  TextField,
  Snackbar,
  IconButton,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./ListProduct.module.scss";
import { Call_Post_Api } from "../../../../Components/CallApi/CallApis";
import classNames from "classnames/bind";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Close as CloseIcon } from "@mui/icons-material";
import axios from "axios";

const cx = classNames.bind(styles);

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ListProduct = ({ apis }) => {
  const [api, setApi] = useState([]);
  const [selectShow, setSelectShow] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [updateProductData, setUpdateProductData] = useState({
    name: "",
    price: "",
    quantity: "",
    size: "",
    color: "",
    type: "",
    description: "",
    image: null,
    imageUrl: null,
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

  const handleClickOpen = (productId) => {
    setSelectedProductId(productId);
    setOpenDelete(true);
  };

  const handleClose = (confirm) => {
    setOpenDelete(false);
    if (confirm && selectedProductId) {
      handleDelete(selectedProductId);
    }
  };

  const handleClickOpenUpdate = (productId) => {
    const product = api.find((item) => item._id === productId);
    setUploadedImage(product.product_thumb);
    setUpdateProductData({
      name: product.product_name,
      price: product.product_price,
      quantity: product.product_quantity,
      size: product.product_attributes.size,
      color: product.product_attributes.color,
      type: product.product_type,
      description: product.product_description,
      image: null,
      imageUrl: product.product_thumb,
    });
    setSelectedProductId(productId);
    setOpenUpdateProduct(true);
  };

  const handleChangeUpdateProductData = (e) => {
    const { id, value } = e.target;
    setUpdateProductData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedImage(file);
  };

  const uploadImage = async () => {
    const CLOUD_NAME = "your_cloudinary_cloud_name";
    const PRESET_NAME = "your_upload_preset_name";
    const FOLDER_NAME = "banhang";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", uploadedImage);

    try {
      const res = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      handleSnackbarOpen("Lỗi khi tải ảnh lên.");
    }
  };

  const handleUpdateProduct = async (productId) => {
    // Validate input fields
    if (
      !updateProductData.name ||
      !updateProductData.price ||
      !updateProductData.quantity ||
      !updateProductData.size ||
      !updateProductData.color ||
      !updateProductData.type ||
      !updateProductData.description
    ) {
      handleSnackbarOpen("Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    // Convert numeric fields to numbers
    const price = Number(updateProductData.price);
    const quantity = Number(updateProductData.quantity);

    // Validate numeric fields
    if (isNaN(price) || price <= 0 || isNaN(quantity) || quantity < 0) {
      handleSnackbarOpen("Giá và số lượng sản phẩm phải là số dương.");
      return;
    }

    const images = await uploadImage();
    try {
      const token = Cookies.get("accessToken");
      const id = Cookies.get("id");

      if (!token || !id) {
        console.error("Thiếu token hoặc client ID");
        return;
      }

      const data = await Call_Post_Api(
        {
          productId: productId,
          product_name: updateProductData.name,
          product_price: price,
          product_description: updateProductData.description,
          product_type: updateProductData.type,
          product_quantity: quantity,
          product_thumb: images,
          product_attributes: {
            color: updateProductData.color,
            size: updateProductData.size,
          },
        },
        token,
        id,
        `/product/updateProduct`
      );

      if (data) {
        handleSnackbarOpen("Cập nhật sản phẩm thành công!");
        setOpenUpdateProduct(false);
        window.location.reload(); // You may consider a more sophisticated way to update the list
      } else {
        handleSnackbarOpen("Cập nhật sản phẩm thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm!", error);
      handleSnackbarOpen("Đã xảy ra lỗi khi cập nhật sản phẩm.");
    }
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className={cx("container")}>
      <h4 className={cx("titleRegistered")}>Danh sách sản phẩm</h4>
      {/* Filtering options */}
      <div className={cx("select_by")}>
        <div className="col-md-3">
          <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }} size="small">
            <InputLabel id="demo-select-small-label">Hiển thị theo</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectShow}
              label="Age"
              onChange={(e) => setSelectShow(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>10 hàng</MenuItem>
              <MenuItem value={20}>20 hàng</MenuItem>
              <MenuItem value={30}>30 hàng</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3">
          <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }} size="small">
            <InputLabel id="demo-select-small-label">Lọc theo loại</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectCategory}
              label="Age"
              onChange={(e) => setSelectCategory(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {roles.map((role, index) => (
                <MenuItem value={role.value} key={index}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      {/* Product list */}
      <div className={cx("productList")}>
        {loading ? (
          <CircularProgress />
        ) : (
          api.map((data, index) => (
            <div className={cx("productContainer")} key={index}>
              <img
                src={data.product_thumb}
                alt={data.product_name}
                className={cx("productImage")}
              />
              <div className={cx("productInfo")}>
                <h5 className={cx("productName")}>{data.product_name}</h5>
                <p className={cx("productPrice")}>
                  Giá: {data.product_price} VNĐ
                </p>
                <p className={cx("productQuantity")}>
                  Số lượng: {data.product_quantity}
                </p>
                <div className={cx("productActions")}>
                  <IconButton
                    aria-label="edit"
                    className={cx("editButton")}
                    onClick={() => handleClickOpenUpdate(data._id)}
                  >
                    <FaPencil />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className={cx("deleteButton")}
                    onClick={() => handleClickOpen(data._id)}
                  >
                    <MdOutlineBlock />
                  </IconButton>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination */}
      <div className={cx("pagination")}>
        <Pagination count={10} color="primary" />
      </div>
      {/* Delete confirmation dialog */}
      <Dialog
        open={openDelete}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận xóa sản phẩm?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa sản phẩm này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Không
          </Button>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
      {/* Update product dialog */}
      <Dialog
        open={openUpdateProduct}
        onClose={() => setOpenUpdateProduct(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Cập nhật sản phẩm</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên sản phẩm"
            type="text"
            fullWidth
            value={updateProductData.name}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="price"
            label="Giá"
            type="number"
            fullWidth
            value={updateProductData.price}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Số lượng"
            type="number"
            fullWidth
            value={updateProductData.quantity}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="size"
            label="Kích thước"
            type="text"
            fullWidth
            value={updateProductData.size}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="color"
            label="Màu sắc"
            type="text"
            fullWidth
            value={updateProductData.color}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="type"
            label="Loại"
            type="text"
            fullWidth
            value={updateProductData.type}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="description"
            label="Mô tả"
            type="text"
            fullWidth
            value={updateProductData.description}
            onChange={handleChangeUpdateProductData}
          />
          <input
            accept="image/*"
            className={styles.input}
            id="icon-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <CloudUploadIcon />
            </IconButton>
          </label>
          {uploadedImage && (
            <img
              src={URL.createObjectURL(uploadedImage)}
              alt="Uploaded"
              className={styles.uploadedImage}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateProduct(false)} color="primary">
            Hủy
          </Button>
          <Button
            onClick={() => handleUpdateProduct(selectedProductId)}
            color="primary"
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for notifications */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default ListProduct;
