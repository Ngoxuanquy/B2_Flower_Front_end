import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa";
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
  SnackbarContent,
  IconButton,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./ListProduct.module.scss";
import { Call_Post_Api } from "../../../../Components/CallApi/CallApis";

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
  const [reloadProducts, setReloadProducts] = useState(false); // State to trigger reload

  useEffect(() => {
    if (apis && Array.isArray(apis)) {
      setApi(apis);
      setLoading(false);
    }
  }, [apis, reloadProducts]); // Trigger effect on reloadProducts change

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
        setReloadProducts(true); // Trigger reload after successful deletion
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
        setReloadProducts(true); // Trigger reload after successful update
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
    const images = await uploadImage();
    try {
      const token = Cookies.get("accessToken")?.replace(/"/g, "");
      const id = Cookies.get("id")?.replace(/"/g, "");

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
      console.log(data);
      return data;
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm!", error);
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
    const CLOUD_NAME = "dvqmndx5j";
    const PRESET_NAME = "upload";
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
              {roles.map((role, index) => (
                <MenuItem key={index} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3">
          <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }} size="small">
            <InputLabel id="demo-select-small-label">Category</InputLabel>
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
              <MenuItem value={10}>Show all</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-2" />
        <div className="col-md-2" />
      </div>

      {loading ? (
        <CircularProgress />
      ) : (
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>Product name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Color</th>
              <th>Type</th>
              <th>Description</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {api.map((item) => (
              <tr key={item._id}>
                <td>{item.product_name}</td>
                <td>{item.product_price}</td>
                <td>{item.product_quantity}</td>
                <td>{item.product_attributes.size}</td>
                <td>{item.product_attributes.color}</td>
                <td>{item.product_type}</td>
                <td>{item.product_description}</td>
                <td>{item.product_thumb}</td>
                <td>
                  <Button
                    variant="contained"
                    onClick={() => handleClickOpenUpdate(item._id)}
                  >
                    <FaPencil />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleClickOpen(item._id)}
                  >
                    <MdOutlineBlock />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className={cx("pagination")}>
        <Pagination count={10} color="primary" />
      </div>

      {/* Dialog for delete confirmation */}
      <Dialog
        open={openDelete}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Product?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for update product */}
      <Dialog
        open={openUpdateProduct}
        onClose={() => handleCloseUpdate(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update the information for this product.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={updateProductData.name}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={updateProductData.price}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={updateProductData.quantity}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="size"
            label="Size"
            type="text"
            fullWidth
            value={updateProductData.size}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="color"
            label="Color"
            type="text"
            fullWidth
            value={updateProductData.color}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="type"
            label="Type"
            type="text"
            fullWidth
            value={updateProductData.type}
            onChange={handleChangeUpdateProductData}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={updateProductData.description}
            onChange={handleChangeUpdateProductData}
          />
          <div className={cx("uploadSection")}>
            <input
              accept="image/*"
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="fileInput">
              <Button
                variant="outlined"
                color="primary"
                component="span"
                startIcon={<CloudUploadIcon />}
                onClick={handleButtonClick}
              >
                Upload Image
              </Button>
            </label>
            {uploadedImage && (
              <div className={cx("uploadedImage")}>
                <img
                  src={URL.createObjectURL(uploadedImage)}
                  alt="Uploaded"
                  className={cx("image")}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => setUploadedImage(null)}
                  className={cx("deleteButton")}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            )}
          </div>
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

      {/* Snackbar for feedback */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          style={{ backgroundColor: "green" }}
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
