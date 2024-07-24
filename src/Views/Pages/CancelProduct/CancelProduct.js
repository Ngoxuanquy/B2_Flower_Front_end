import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CancelProduct.module.scss";
import { Call_Post_Api } from "../../../Components/CallApi/CallApis";
import { Button, Image, message, Select, Spin, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Cookies from "js-cookie";

import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

const ProductRequestForm = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();
  const [isLoad, setIsLoad] = useState(false);

  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [selectedProductImage, setSelectedProductImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    setIsLoad(true);
    Call_Post_Api(null, null, null, "/product/getAll").then((data) => {
      const result = data.metadata.map((product) => ({
        _id: product._id,
        value: product.product_name,
        label: product.product_name,
        image_url: product.product_thumb, // Lưu trữ URL ảnh
        product_quantity: product.product_quantity,
      }));
      setProducts(result);
      setIsLoad(false);
    });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(event.target.files[0]);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(file);
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

  const onChange = (value, option) => {
    console.log(`selected ${value}`);
    // Cập nhật ảnh sản phẩm khi chọn tên sản phẩm
    setProductName(option.value);
    setProductId(option._id);
    setProductQuantity(option.product_quantity);

    setSelectedProductImage(option.image_url || "");
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const handleSubmit = async (e) => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token.replace(/^"|"$/g, "");
    const cleanId = id.replace(/^"|"$/g, "");
    const name = Cookies.get("name");
    const cleanName = name.replace(/^"|"$/g, "");

    if (!cleanedJwtString || !cleanId || !cleanName) {
      messageApi.open({
        type: "error",
        content: "Missing token, ID, or name",
      });
      return;
    }

    if (!productId || !productName || !quantity || !uploadedImage) {
      messageApi.open({
        type: "error",
        content: "Missing product information",
      });
      return;
    }
    setIsLoad(true);

    const images = await uploadImage();

    Call_Post_Api(
      {
        productId: productId,
        product_Name: productName,
        quantity: quantity,
        img: images,
        status: "Yêu cầu",
        email: cleanName,
        date: new Date(),
      },
      cleanedJwtString,
      cleanId,
      `/brokenFlowers/create`
    ).then((data) => {
      setIsLoad(false);
      messageApi.open({
        type: "succse",
        content: "Gửi yêu cầu thành công",
      });
    });
  };

  const handelQuantity = (e) => {
    if (e.target.value >= productQuantity) {
      messageApi.open({
        type: "error",
        content: "Số lượng hỏng lớn hơn số lượng tồn kho?",
      });
      return setQuantity(productQuantity);
    }
    setQuantity(e.target.value);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className={cx("container_")}>
      {contextHolder}
      {isLoad && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100vh",
            zIndex: 100,
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin />
        </div>
      )}
      <h2>Product Request Form</h2>
      <div>
        <div className={cx("form-group")}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              {" "}
              <label htmlFor="productName">Product Name:</label>
              <Select
                showSearch
                placeholder="Select a product"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                options={products}
              />
            </div>
            <div
              style={{
                marginLeft: "-50px",
              }}
            >
              <label>Số lượng tồn kho: {productQuantity}</label>
            </div>
          </div>
          {selectedProductImage && (
            <div className={cx("product-image")}>
              <Image src={selectedProductImage} alt="Selected Product" />
            </div>
          )}
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => {
              handelQuantity(e);
            }}
            min="1"
            required
          />
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="file">Upload Image:</label>
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
            <Image
              src={URL.createObjectURL(uploadedImage)}
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
        <button
          type="submit"
          className={cx("submit-button")}
          onClick={handleSubmit}
        >
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default ProductRequestForm;
