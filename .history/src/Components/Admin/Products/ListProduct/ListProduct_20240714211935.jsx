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
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./ListProduct.module.scss";
import { Call_Post_Api } from "../../../../Components/CallApi/CallApis";
import classNames from "classnames/bind";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Snackbar, SnackbarContent, IconButton } from "@mui/material";
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
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (apis && Array.isArray(apis)) {
      setApi(apis);
      setLoading(false);
    }
  }, [apis]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { token, id } = getTokenAndId();
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

  const getTokenAndId = () => {
    const token = Cookies.get("accessToken")?.replace(/"/g, "");
    const id = Cookies.get("id")?.replace(/"/g, "");
    return { token, id };
  };

  const handleDelete = async (productId) => {
    try {
      const { token, id } = getTokenAndId();
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
        setApi(api.filter((item) => item._id !== productId));
        handleSnackbarOpen("Xóa sản phẩm thành công!");
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

  const handleCloseUpdate = async (confirm) => {
    setOpenUpdateProduct(false);
    if (confirm && selectedProductId) {
      const result = await handleUpdateProduct(selectedProductId);
      if (result) {
        setApi(
          api.map((item) =>
            item._id === selectedProductId ? result.metadata : item
          )
        );
        handleSnackbarOpen("Cập nhật sản phẩm thành công!");
      }
    }
  };

  const handleChangeSelectShow = (event) => {
    setSelectShow(event.target.value);
  };

  const handleChangeSelectCategory = (event) => {
    setSelectCategory(event.target.value);
  };

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

  const handleUpdateProduct = async (productId) => {
    const imageUrl = await uploadImage();
    try {
      const { token, id } = getTokenAndId();
      if (!token || !id) {
        console.error("Thiếu token hoặc client ID");
        return;
      }
      const data = await Call_Post_Api(
        {
          productId: productId,
          product_name: updateProductData.name,
          product_price: Number(updateProductData.price),
          product_description: updateProductData.description,
          product_type: updateProductData.type,
          product_quantity: Number(updateProductData.quantity),
          product_thumb: imageUrl,
          product_attributes: {
            color: updateProductData.color,
            size: updateProductData.size,
          },
        },
        token,
        id,
        `/product/updateProduct`
      );
      return data;
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm!", error);
    }
  };

  const handleClickOpenUpdate = (productId) => {
    const product = api.find((item) => item._id === productId);
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
    const reader = new FileReader();
    reader.onload = () => {
      setUpdateProductData((prevData) => ({
        ...prevData,
        image: file,
        imageUrl: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async () => {
    const CLOUD_NAME = "dvqmndx5j";
    const PRESET_NAME = "upload";
    const FOLDER_NAME = "banhang";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", updateProductData.imageUrl);

    try {
      const res = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <div className={cx("container")}>
      <h4 className={cx("titleRegistered")}>Products List</h4>
      <div className={cx("select_by")}>
        <div className="col-md-3">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select">Show</InputLabel>
            <Select
              labelId="select"
              id="select"
              value={selectShow}
              label="Show"
              onChange={handleChangeSelectShow}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select_category">Category</InputLabel>
            <Select
              labelId="select_category"
              id="select_category"
              value={selectCategory}
              label="Category"
              onChange={handleChangeSelectCategory}
            >
              {roles.map((role) => (
                <MenuItem key={role._id} value={role._id}>
                  {role.role_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={cx("table")}>
        {loading ? (
          <div className={cx("loading_spinner")}>
            <CircularProgress />
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Product Description</th>
                  <th>Product Type</th>
                  <th>Product Quantity</th>
                  <th>Product Thumb</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {api.map((item) => (
                  <tr key={item._id}>
                    <td>{item.product_name}</td>
                    <td>{item.product_price}</td>
                    <td>{item.product_description}</td>
                    <td>{item.product_type}</td>
                    <td>{item.product_quantity}</td>
                    <td>
                      <img
                        src={item.product_thumb}
                        alt={item.product_name}
                        width="50"
                      />
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleClickOpen(item._id)}
                      >
                        <MdOutlineBlock />
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => handleClickOpenUpdate(item._id)}
                      >
                        <FaPencil />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination count={10} variant="outlined" shape="rounded" />
          </div>
        )}
      </div>
      <Dialog
        open={openDelete}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>No</Button>
          <Button onClick={() => handleClose(true)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openUpdateProduct}
        onClose={() => handleCloseUpdate(false)}
        aria-labelledby="update-product-dialog-title"
        aria-describedby="update-product-dialog-description"
      >
        <DialogTitle id="update-product-dialog-title">
          Update Product
        </DialogTitle>
        <DialogContent>
          <div className={cx("form-group")}>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={updateProductData.name}
              onChange={handleChangeUpdateProductData}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="price">Product Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={updateProductData.price}
              onChange={handleChangeUpdateProductData}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="quantity">Product Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={updateProductData.quantity}
              onChange={handleChangeUpdateProductData}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="size">Size</label>
            <input
              type="text"
              className="form-control"
              id="size"
              value={updateProductData.size}
              onChange={handleChangeUpdateProductData}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="color">Color</label>
            <input
              type="text"
              className="form-control"
              id="color"
              value={updateProductData.color}
              onChange={handleChangeUpdateProductData}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="type">Type</label>
            <input
              type="text"
              className="form-control"
              id="type"
              value={updateProductData.type}
              onChange={handleChangeUpdateProductData}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={updateProductData.description}
              onChange={handleChangeUpdateProductData}
            ></textarea>
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="image">Image</label>
            <VisuallyHiddenInput
              accept="image/*"
              id="fileInput"
              type="file"
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={handleButtonClick}
            >
              Upload Image
            </Button>
            {updateProductData.imageUrl && (
              <div className={cx("image-preview")}>
                <img
                  src={
                    updateProductData.imageUrl instanceof File
                      ? URL.createObjectURL(updateProductData.imageUrl)
                      : updateProductData.imageUrl
                  }
                  alt="Preview"
                  width="100"
                />
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseUpdate(false)}>Cancel</Button>
          <Button onClick={() => handleCloseUpdate(true)}>Update</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
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
      </Snackbar>
    </div>
  );
};

export default ListProduct;
