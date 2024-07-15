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
  const [uploadedImage, setUploadedImage] = useState(null);
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

  const fetchProducts = async () => {
    try {
      const token = Cookies.get("accessToken")?.replace(/"/g, "");
      const id = Cookies.get("id")?.replace(/"/g, "");

      const data = await Call_Post_Api(null, token, id, "/product/getAll");
      setApi(data.metadata);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const token = Cookies.get("accessToken")?.replace(/"/g, "");
      const id = Cookies.get("id")?.replace(/"/g, "");

      if (!token || !id) {
        console.error("Missing token or client ID");
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
        alert("Deleted successfully!");
        fetchProducts(); // Fetch the updated product list
      } else {
        console.error(
          "Delete request failed!",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateProduct = async (productId) => {
    const images = await uploadImage();
    try {
      const token = Cookies.get("accessToken");
      const id = Cookies.get("id");
      const cleanedJwtString = token?.replace(/^"|"$/g, "");
      const cleanId = id.replace(/^"|"$/g, "");

      if (!cleanedJwtString || !cleanId) {
        console.error("Missing token or client ID");
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
      fetchProducts(); // Fetch the updated product list
      return data;
    } catch (error) {
      console.error("Error updating product!", error);
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
        handleSnackbarOpen("Product updated successfully!");
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
    console.log("Thumbnail URL:", product.product_thumb);
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
        <div className="col-md-3" style={{ marginRight: "20px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Show by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectShow}
              label="Show by"
              onChange={handleChangeSelectShow}
            >
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectCategory}
              label="Category"
              onChange={handleChangeSelectCategory}
            >
              <MenuItem value={12}>Shoes</MenuItem>
              <MenuItem value={25}>Clothes</MenuItem>
              <MenuItem value={100}>Watch</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <table className={cx("listProduct")}>
        <thead>
          <tr>
            <th scope="col">Thumbnail</th>
            <th scope="col">Product name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {loading ? (
          <CircularProgress />
        ) : (
          <tbody>
            {api.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.product_thumb} alt="Product" width="100" />
                </td>
                <td>{item.product_name}</td>
                <td>{item.product_description}</td>
                <td>{item.product_price}</td>
                <td>{item.product_quantity}</td>
                <td>{item.product_type}</td>
                <td className={cx("actionBtn")}>
                  <FaPencil
                    className={cx("btnUpdate")}
                    onClick={() => handleClickOpenUpdate(item._id)}
                  />
                  <MdOutlineBlock
                    className={cx("btnDelete")}
                    onClick={() => handleClickOpen(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div className={cx("pagination")}>
        <Pagination
          count={Math.ceil(api.length / 12)}
          variant="outlined"
          shape="rounded"
        />
      </div>

      {/* Dialog delete */}
      <Dialog
        open={openDelete}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
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
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog update */}
      <Dialog
        open={openUpdateProduct}
        onClose={() => handleCloseUpdate(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Update your product here
          </DialogContentText>
          <form>
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
              value={updateProductData.description}
              onChange={handleChangeUpdateProductData}
            />
            <VisuallyHiddenInput
              type="file"
              id="fileInput"
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              onClick={handleButtonClick}
            >
              Upload Image
            </Button>
            {updateProductData.imageUrl && (
              <img
                src={updateProductData.imageUrl}
                alt="Uploaded"
                width="100"
                style={{ marginTop: "10px" }}
              />
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseUpdate(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleCloseUpdate(true)}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackbarOpen}
        autoHideDuration={3000}
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
