import React, { useEffect, useRef, useState } from "react";
import styles from "./ProductUpload.module.scss";
import classNames from "classnames/bind";
import PageTitle from "../../../../../Components/Admin/PageTitle/PageTitle";
import { Col, Row } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Call_Post_Api } from "../../../../../Components/CallApi/CallApis";
import { ClimbingBoxLoader } from "react-spinners";

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

const cx = classNames.bind(styles);

const ProductUpload = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const priceInputRef = useRef(null);
  const quantityInputRef = useRef(null);
  const [apiProducts, setApiProduct] = useState([]);

  const pageTitleProps = {
    title: "Product Upload",
    items: [
      { text: "Admin", link: "/admin/dash-board" },
      { text: "Product", link: "/admin/product-list" },
      { text: "Product Upload" },
    ],
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(file);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async () => {
    setIsLoading(true);

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
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    Call_Post_Api(null, null, null, "/product/getAll")
      .then((data) => {
        setApiProduct(data.metadata);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;

    const isDuplicateName = apiProducts.some(
      (product) => product.product_name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicateName) {
      setNameError("Tên sản phẩm đã tồn tại. Vui lòng chọn tên khác!");
      valid = false;
    } else {
      setNameError("");
    }
    if (Number(price) < 0) {
      setPriceError("Giá sản phẩm không thể nhỏ hơn 0. Vui lòng kiểm tra lại!");
      priceInputRef.current.focus();
      valid = false;
    } else {
      setPriceError("");
    }
    if (Number(quantity) < 0) {
      setQuantityError(
        "Số lượng sản phẩm không thể nhỏ hơn 0. Vui lòng kiểm tra lại!"
      );
      quantityInputRef.current.focus();
      valid = false;
    } else {
      setQuantityError("");
    }

    if (!valid) return;

    const images = await uploadImage();
    try {
      const token = Cookies.get("accessToken");
      const id = Cookies.get("id");
      const cleanedJwtString = token?.replace(/^"|"$/g, "");
      const cleanId = id.replace(/^"|"$/g, "");

      await Call_Post_Api(
        {
          product_name: name,
          product_price: Number(price),
          product_description: description,
          product_type: type,
          product_quantity: Number(quantity),
          product_thumb: images,
          product_attributes: {
            manufacturer: "quy",
            color: color,
            size: size,
          },
        },
        cleanedJwtString,
        cleanId,
        "/product"
      );
      setIsLoading(false); // Reset input fields
      setName("");
      setPrice("");
      setDescription("");
      setType("");
      setQuantity("");
      setColor("");
      setSize("");
      setUploadedImage(null);
    } catch (error) {
      console.error("Error submitting product:", error);
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setType("");
    setQuantity("");
    setColor("");
    setSize("");
    setUploadedImage(null);
    setNameError("");
    setPriceError("");
    setQuantityError("");
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className={cx("container")}>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            zIndex: 100,
          }}
        >
          <ClimbingBoxLoader color="#36d7b7" />
        </div>
      )}
      <div className={cx("contents")}>
        <PageTitle title={pageTitleProps.title} items={pageTitleProps.items} />
        <div className={cx("information")}>
          <div className={cx("info-header")}>
            <h4>Basic Information</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <Row className={cx("row")}>
              <Col span={12} className={cx("col")}>
                <div>
                  <span>Tên sản phẩm:</span>
                  <div className={cx("wave-group")}>
                    <input
                      value={name}
                      required
                      type="text"
                      className={cx("input")}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <span className={cx("bar")}></span>
                    <label className={cx("label")}>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 0 }}
                      >
                        N
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 1 }}
                      >
                        a
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 2 }}
                      >
                        m
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 3 }}
                      >
                        e
                      </span>
                    </label>
                    {nameError && (
                      <div className={cx("error")}>{nameError}</div>
                    )}
                  </div>
                </div>
                <div>
                  <span>Giá:</span>
                  <div className={cx("wave-group")}>
                    <input
                      ref={priceInputRef}
                      value={price}
                      required
                      type="text"
                      className={cx("input")}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <span className={cx("bar")}></span>
                    <label className={cx("label")}>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 0 }}
                      >
                        P
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 1 }}
                      >
                        r
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 2 }}
                      >
                        i
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 3 }}
                      >
                        c
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 4 }}
                      >
                        e
                      </span>
                    </label>
                    {priceError && (
                      <div className={cx("error")}>{priceError}</div>
                    )}
                  </div>
                </div>
              </Col>
              <Col span={12} className={cx("col")}>
                <div>
                  <span>Mô tả:</span>
                  <div className={cx("wave-group")}>
                    <input
                      value={description}
                      required
                      type="text"
                      className={cx("input")}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <span className={cx("bar")}></span>
                    <label className={cx("label")}>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 0 }}
                      >
                        D
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 1 }}
                      >
                        e
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 2 }}
                      >
                        s
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 3 }}
                      >
                        c
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 4 }}
                      >
                        r
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 5 }}
                      >
                        i
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 6 }}
                      >
                        p
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 7 }}
                      >
                        t
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 8 }}
                      >
                        i
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 9 }}
                      >
                        o
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 10 }}
                      >
                        n
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <span>Loại:</span>
                  <div className={cx("wave-group")}>
                    <input
                      value={type}
                      required
                      type="text"
                      className={cx("input")}
                      onChange={(e) => setType(e.target.value)}
                    />
                    <span className={cx("bar")}></span>
                    <label className={cx("label")}>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 0 }}
                      >
                        T
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 1 }}
                      >
                        y
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 2 }}
                      >
                        p
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 3 }}
                      >
                        e
                      </span>
                    </label>
                  </div>
                </div>
              </Col>
              <Col span={12} className={cx("col")}>
                <div>
                  <span>Số lượng:</span>
                  <div className={cx("wave-group")}>
                    <input
                      ref={quantityInputRef}
                      value={quantity}
                      required
                      type="text"
                      className={cx("input")}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <span className={cx("bar")}></span>
                    <label className={cx("label")}>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 0 }}
                      >
                        Q
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 1 }}
                      >
                        u
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 2 }}
                      >
                        a
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 3 }}
                      >
                        n
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 4 }}
                      >
                        t
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 5 }}
                      >
                        i
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 6 }}
                      >
                        t
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 7 }}
                      >
                        y
                      </span>
                    </label>
                    {quantityError && (
                      <div className={cx("error")}>{quantityError}</div>
                    )}
                  </div>
                </div>
                <div>
                  <span>Màu:</span>
                  <div className={cx("wave-group")}>
                    <input
                      value={color}
                      required
                      type="text"
                      className={cx("input")}
                      onChange={(e) => setColor(e.target.value)}
                    />
                    <span className={cx("bar")}></span>
                    <label className={cx("label")}>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 0 }}
                      >
                        C
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 1 }}
                      >
                        o
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 2 }}
                      >
                        l
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 3 }}
                      >
                        o
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 4 }}
                      >
                        r
                      </span>
                    </label>
                  </div>
                </div>
              </Col>
              <Col span={12} className={cx("col")}>
                <div>
                  <span>Kích thước:</span>
                  <div className={cx("wave-group")}>
                    <input
                      value={size}
                      required
                      type="text"
                      className={cx("input")}
                      onChange={(e) => setSize(e.target.value)}
                    />
                    <span className={cx("bar")}></span>
                    <label className={cx("label")}>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 0 }}
                      >
                        S
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 1 }}
                      >
                        i
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 2 }}
                      >
                        z
                      </span>
                      <span
                        className={cx("label-char")}
                        style={{ "--index": 3 }}
                      >
                        e
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <span>Hình ảnh:</span>
                  <br />
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
                    {uploadedImage && (
                      <img
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
                </div>
              </Col>
            </Row>
            <div className={cx("button")}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button onClick={resetForm} variant="contained" color="secondary">
                Reset
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
