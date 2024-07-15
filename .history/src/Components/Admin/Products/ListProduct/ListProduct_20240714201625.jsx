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
  // const URL = process.env.REACT_APP_URL;
  console.log(apis);
  const [api, setApi] = useState([]);
  const [selectShow, setSelectShow] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

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
  // const handleUpdateProduct = async (productId) => {
  //   console.log("Click update product!", productId);
  // };
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
  const handleCloseUpdate = (confirm) => {
    setOpenUpdateProduct(false);
    if (confirm && selectedProductId) {
      handleUpdateProduct(selectedProductId);
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
    // discount: "",
    type: "",
    description: "",
    image: null,
    imageUrl: null,
  });
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

      const formData = new FormData();
      formData.append("product_name", updateProductData.name);
      formData.append("product_price", Number(updateProductData.price));
      formData.append("product_description", updateProductData.description);
      formData.append("product_type", updateProductData.type);
      formData.append("product_quantity", Number(updateProductData.quantity));
      if (updateProductData.image) {
        formData.append("product_thumb", updateProductData.image);
      }
      formData.append(
        "product_attributes",
        JSON.stringify({
          manufacturer: "quy",
          color: updateProductData.color,
          size: updateProductData.size,
        })
      );

      console.log(updateProductData.image);
      const data = await Call_Post_Api(
        {
          productId: productId,
          product_name: updateProductData.name,
          product_price: Number(updateProductData.price),
          product_description: updateProductData.description,
          product_type: updateProductData.type,
          product_quantity: Number(updateProductData.quantity),
          product_thumb: updateProductData.image,
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

      // const requestOptions = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "x-api-key": process.env.REACT_APP_API_KEY,
      //     Authorization: token,
      //     "x-client-id": id,
      //   },
      //   body: formData,
      // };

      // const response = await fetch(
      //   `${process.env.REACT_APP_URL}/product/updateProduct/${productId}`,
      //   requestOptions
      // );

      // if (response.ok) {
      //   alert("Cập nhật thành công!");
      // } else {
      //   console.error(
      //     "Yêu cầu cập nhật thất bại!",
      //     response.status,
      //     response.statusText
      //   );
      // }
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
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
      // discount: product.product_discount,
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

    const reader = new FileReader();
    reader.onload = () => {
      setUpdateProductData((prevData) => ({
        ...prevData,
        image: file,
        imageUrl: URL.createObjectURL(file), // Lưu URL của hình ảnh để hiển thị
      }));
    };
    reader.readAsDataURL(file);
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
        <DialogTitle>Cập nhật thông tin sản phẩm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập thông tin cập nhật cho sản phẩm.
          </DialogContentText>
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
            label="Giá sản phẩm"
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
            id="image"
            label="Hình ảnh"
            type="text"
            fullWidth
            disabled
            // hidden
            value={updateProductData.imageUrl || ""}
          />
          <div
            style={{
              display: "flex",
              height: "80px",
              alignItems: "center",
            }}
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
            {updateProductData.imageUrl && (
              <img
                src={updateProductData.imageUrl}
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
          <Button onClick={() => handleCloseUpdate(true)} color="error">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ListProduct;
