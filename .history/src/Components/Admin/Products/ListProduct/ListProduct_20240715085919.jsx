import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import { Image } from "antd";

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
const ListProduct = ({ apis, fetchProducts }) => {
  const [api, setApi] = useState([]);
  const [selectShow, setSelectShow] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const priceInputRef = useRef(null);
  const quantityInputRef = useRef(null);

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
      // Lấy token và id từ cookie và loại bỏ dấu ngoặc kép nếu có
      const token = Cookies.get("accessToken")?.replace(/"/g, "");
      const id = Cookies.get("id")?.replace(/"/g, "");

      // Kiểm tra nếu token hoặc id bị thiếu
      if (!token || !id) {
        console.error("Thiếu token hoặc client ID");
        return;
      }

      // Cấu hình yêu cầu xóa sản phẩm
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_API_KEY,
          Authorization: token,
          "x-client-id": id,
        },
      };

      // Gửi yêu cầu xóa sản phẩm
      const response = await fetch(
        `${process.env.REACT_APP_URL}/product/delete/${productId}`,
        requestOptions
      );

      // Kiểm tra phản hồi từ server
      if (response.ok) {
        alert("Xóa thành công!");
        fetchProducts();
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
  const [errorMessages, setErrorMessages] = useState({
    price: "",
    quantity: "",
  });
  const handleOpenUpdate = async (confirm) => {
    // Kiểm tra các trường dữ liệu không được để trống
    if (
      !updateProductData.name ||
      !updateProductData.price ||
      !updateProductData.quantity ||
      !updateProductData.size ||
      !updateProductData.color ||
      !updateProductData.type ||
      !updateProductData.description
    ) {
      console.error("Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    // Kiểm tra giá và số lượng có hợp lệ không
    if (confirm && selectedProductId) {
      if (updateProductData.price < 0 || updateProductData.quantity < 0) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          price:
            updateProductData.price < 0
              ? "Giá sản phẩm không thể nhỏ hơn 0. Vui lòng kiểm tra lại!"
              : "",
          quantity:
            updateProductData.quantity < 0
              ? "Số lượng sản phẩm không thể nhỏ hơn 0. Vui lòng kiểm tra lại!"
              : "",
        }));

        // Focus vào trường dữ liệu sai
        if (updateProductData.price < 0) {
          priceInputRef.current.focus();
        } else if (updateProductData.quantity < 0) {
          quantityInputRef.current.focus();
        }

        return;
      }

      const result = await handleUpdateProduct(selectedProductId);
      if (result) {
        // Đóng dialog sau khi cập nhật thành công
        setOpenUpdateProduct(false);
        fetchProducts();
      }
    }
  };

  const handleCloseUpdate = () => {
    setOpenUpdateProduct(false);
  };
  useEffect(() => {
    if (errorMessages.price) {
      priceInputRef.current.focus();
    } else if (errorMessages.quantity) {
      quantityInputRef.current.focus();
    }
  }, [errorMessages]);
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
    // discount: "",
    type: "",
    description: "",
    image: null,
    imageUrl: null,
  });
  const handleUpdateProduct = async (productId) => {
    const images = await uploadImage();
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
      // discount: product.product_discount,
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
    // Xóa thông báo lỗi khi người dùng nhập lại dữ liệu
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));

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
              <th>DISCOUNT</th>
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
                          <Image
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
                    <td style={{ color: "red" }}>10%</td>
                    <td>
                      <div className={cx("actions")}>
                        {(roles.includes("UPDATE") ||
                          roles.includes("ADMIN")) && (
                          <Button
                            className={cx("success")}
                            color="success"
                            onClick={() => handleClickOpenUpdate(item._id)}
                          >
                            <FaPencil />
                          </Button>
                        )}
                        {(roles.includes("DELETE") ||
                          roles.includes("ADMIN")) &&
                          (item.product_quantity === 0 ? (
                            <Button
                              className={cx("error")}
                              color="error"
                              onClick={() => handleClickOpen(item._id)}
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
      <Dialog open={openDelete} onClose={() => handleClose(false)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa mục này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={() => handleClose(true)} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openUpdateProduct} onClose={() => handleCloseUpdate(false)}>
        <DialogTitle>
          <h2>Cập nhật thông tin sản phẩm</h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Nhập thông tin cập nhật cho sản phẩm.</strong>
          </DialogContentText>
          <TextField
            autoFocus
            required
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
            label="Giá sản phẩm"
            type="number"
            fullWidth
            value={updateProductData.price}
            onChange={handleChangeUpdateProductData}
            error={!!errorMessages.price}
            helperText={errorMessages.price}
            inputRef={priceInputRef}
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Số lượng"
            type="number"
            fullWidth
            value={updateProductData.quantity}
            onChange={handleChangeUpdateProductData}
            error={!!errorMessages.quantity}
            helperText={errorMessages.quantity}
            inputRef={quantityInputRef}
          />
          <TextField
            margin="dense"
            id="image"
            label="Hình ảnh"
            type="text"
            fullWidth
            disabled
            // hidden
            value={uploadedImage || ""}
          />
          <div
            style={{ display: "flex", height: "80px", alignItems: "center" }}
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onClick={handleButtonClick}
            >
              Upload file
            </Button>
            <VisuallyHiddenInput
              id="fileInput"
              type="file"
              onChange={handleFileChange}
            />
            {uploadedImage && (
              <img
                src={
                  uploadedImage instanceof File
                    ? URL.createObjectURL(uploadedImage)
                    : uploadedImage
                }
                alt="Uploaded"
                style={{
                  width: 80,
                  height: 80,
                  opacity: 0.9,
                  marginLeft: 20,
                }}
              />
            )}
          </div>

          <TextField
            margin="dense"
            id="size"
            label="Kích cỡ"
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
          {/* <TextField
            margin="dense"
            id="discount"
            label="Giảm giá"
            type="text"
            fullWidth
            value={updateProductData.discount}
            onChange={handleChangeUpdateProductData}
          /> */}
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
            label="Mô Tả"
            type="text"
            fullWidth
            value={updateProductData.description}
            onChange={handleChangeUpdateProductData}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleCloseUpdate(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={() => handleOpenUpdate(true)} color="error">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ListProduct;
