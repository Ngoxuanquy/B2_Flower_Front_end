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

  const handleCloseUpdate = async (confirm) => {
    setOpenUpdateProduct(false);
    if (confirm && selectedProductId) {
      const result = await handleUpdateProduct(selectedProductId);
      if (result) {
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

  const handleUpdateProduct = async (productId) => {
    try {
      const token = Cookies.get("accessToken");
      const id = Cookies.get("id");
      const cleanedJwtString = token?.replace(/^"|"$/g, "");
      const cleanId = id.replace(/^"|"$/g, "");

      if (!cleanedJwtString || !cleanId) {
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
          product_thumb: updateProductData.imageUrl,
          product_attributes: {
            color: updateProductData.color,
            size: updateProductData.size,
          },
        },
        token,
        id,
        `/product/updateProduct`
      );
      console.log(data);
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
    console.log("Thumbnail URL:", product.product_thumb);
  };

  const handleChangeUpdateProductData = (e) => {
    const { id, value } = e.target;
    setUpdateProductData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = response.data.secure_url;

      setUpdateProductData((prevData) => ({
        ...prevData,
        image: file,
        imageUrl: imageUrl,
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
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
            <InputLabel id="demo-select-small-label">Category</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectCategory}
              label="Category"
              onChange={handleChangeSelectCategory}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Category 1</MenuItem>
              <MenuItem value={20}>Category 2</MenuItem>
              <MenuItem value={30}>Category 3</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={cx("col-md-3  search_input")}>
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              style={{ height: "32px", fontSize: "13px" }}
            />
          </div>
        </div>
      </div>
      <div className={cx("table")}>
        <table>
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">
                  <CircularProgress />
                </td>
              </tr>
            ) : (
              api.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.product_name}</td>
                  <td>{item.product_price}</td>
                  <td>{item.product_quantity}</td>
                  <td>
                    <img
                      src={item.product_thumb}
                      alt="Product Thumbnail"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{item.product_status}</td>
                  <td className={cx("action_col")}>
                    <button
                      className={cx("btn_update")}
                      onClick={() => handleClickOpenUpdate(item._id)}
                    >
                      <FaPencil />
                    </button>
                    <button
                      className={cx("btn_delete")}
                      onClick={() => handleClickOpen(item._id)}
                    >
                      <MdOutlineBlock />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className={cx("pagination")}>
          <Pagination count={10} color="primary" />
        </div>
      </div>
      <Dialog
        open={openDelete}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa sản phẩm này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Hủy</Button>
          <Button onClick={() => handleClose(true)} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openUpdateProduct}
        onClose={() => handleCloseUpdate(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Product</DialogTitle>
        <DialogContent>
          <DialogContentText>Update product information:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            fullWidth
            value={updateProductData.name}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="price"
            label="Product Price"
            type="number"
            fullWidth
            value={updateProductData.price}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Product Quantity"
            type="number"
            fullWidth
            value={updateProductData.quantity}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="size"
            label="Product Size"
            type="text"
            fullWidth
            value={updateProductData.size}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="color"
            label="Product Color"
            type="text"
            fullWidth
            value={updateProductData.color}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="type"
            label="Product Type"
            type="text"
            fullWidth
            value={updateProductData.type}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="description"
            label="Product Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={updateProductData.description}
            onChange={handleChangeUpdateProductData}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <VisuallyHiddenInput
              accept="image/*"
              id="fileInput"
              type="file"
              onChange={handleFileChange}
            />
            <TextField
              margin="dense"
              id="imageUrl"
              label="Product Thumbnail URL"
              type="text"
              fullWidth
              value={updateProductData.imageUrl}
              disabled
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
              startIcon={<CloudUploadIcon />}
              style={{ marginLeft: "10px", marginTop: "10px" }}
            >
              Upload Image
            </Button>
          </div>
          {updateProductData.imageUrl && (
            <img
              src={updateProductData.imageUrl}
              alt="Uploaded Image"
              style={{ marginTop: "10px", maxWidth: "100%" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseUpdate(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleCloseUpdate(true)} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
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
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </div>
  );
};

export default ListProduct;
