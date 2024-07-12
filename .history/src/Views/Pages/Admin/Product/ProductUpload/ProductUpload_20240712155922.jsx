import React, { useState } from "react";
import styles from "./ProductUpload.module.scss";
import classNames from "classnames/bind";
import PageTitle from "../../../../../Components/Admin/PageTitle/PageTitle";
import CreateProduct from "../CreateProduct";
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
    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
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

    const res = await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.secure_url;
  };
  const handerSubmit = async () => {
    const imgages = await uploadImage();
    try {
      const token = Cookies.get("accessToken");
      const id = Cookies.get("id");
      const cleanedJwtString = token?.replace(/^"|"$/g, "");
      const cleanId = id.replace(/^"|"$/g, "");
      console.log({ name });
      console.log({ price });
      console.log({ description });
      console.log({ quantity });
      console.log({ color });
      console.log({ size });

      Call_Post_Api(
        {
          product_name: name,
          product_price: Number(price),
          product_description: description,
          product_type: type,
          product_quantity: Number(quantity),
          product_thumb: imgages,
          product_attributes: {
            manufacturer: "quy",
            color: color,
            size: size,
          },
        },
        cleanedJwtString,
        cleanId,
        "/product"
      )
        .then((data) => {
          setIsLoading(false);
          console.log(data);
          // window.location = '/api/select/product';
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };
  return (
    <div className={cx("container")}>
      {isLoading === true ? (
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
          <div>
            <ClimbingBoxLoader color="#36d7b7" />
          </div>
        </div>
      ) : null}
      <div className={cx("contents")}>
        <PageTitle title={pageTitleProps.title} items={pageTitleProps.items} />
        <div className={cx("information")}>
          <div className={cx("info-header")}>
            <h4>Basic Information</h4>
          </div>
          <Row className={cx("row")}>
            <Col span={12} className={cx("col")}>
              <div>
                <span>Tên sản phẩm:</span>
                <div className={cx("wave-group")}>
                  <input
                    required
                    type="text"
                    className={cx("input")}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span className={cx("bar")}></span>
                  <label className={cx("label")}>
                    <span className={cx("label-char")} style={{ "--index": 0 }}>
                      N
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 1 }}>
                      a
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 2 }}>
                      m
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 3 }}>
                      e
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <span>Giá:</span>

                <div className={cx("wave-group")}>
                  <input
                    required
                    type="text"
                    className={cx("input")}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <span className={cx("bar")}></span>
                  <label className={cx("label")}>
                    <span className={cx("label-char")} style={{ "--index": 0 }}>
                      P
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 1 }}>
                      r
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 2 }}>
                      i
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 3 }}>
                      c
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 4 }}>
                      e
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <span>Màu sắc:</span>
                <div className={cx("wave-group")}>
                  <input
                    required
                    type="text"
                    className={cx("input")}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <span className={cx("bar")}></span>
                  <label className={cx("label")}>
                    <span className={cx("label-char")} style={{ "--index": 0 }}>
                      C
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 1 }}>
                      o
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 2 }}>
                      l
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 3 }}>
                      o
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 4 }}>
                      r
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
                      src={uploadedImage}
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
            <Col span={12} className={cx("col")}>
              <div>
                <span>Size:</span>
                <div className={cx("wave-group")}>
                  <input
                    required
                    type="text"
                    className={cx("input")}
                    onChange={(e) => setSize(e.target.value)}
                  />
                  <span className={cx("bar")}></span>
                  <label className={cx("label")}>
                    <span className={cx("label-char")} style={{ "--index": 0 }}>
                      S
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 1 }}>
                      i
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 2 }}>
                      z
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 3 }}>
                      e
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <span>Số lượng:</span>
                <div className={cx("wave-group")}>
                  <input
                    required
                    type="text"
                    className={cx("input")}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <span className={cx("bar")}></span>
                  <label className={cx("label")}>
                    <span className={cx("label-char")} style={{ "--index": 0 }}>
                      Q
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 1 }}>
                      u
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 2 }}>
                      a
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 3 }}>
                      n
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 4 }}>
                      t
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 5 }}>
                      i
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 6 }}>
                      t
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 7 }}>
                      y
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <span>Type:</span>
                <div className={cx("wave-group")}>
                  <input
                    required
                    type="text"
                    className={cx("input")}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <span className={cx("bar")}></span>
                  <label className={cx("label")}>
                    <span className={cx("label-char")} style={{ "--index": 0 }}>
                      T
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 1 }}>
                      y
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 2 }}>
                      p
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 3 }}>
                      e
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <span>Mô tả:</span>
                <div style={{ width: "100%" }}>
                  <textarea
                    required
                    type="text"
                    style={{
                      width: "100%",
                      height: "150px",
                      padding: "10px",
                      marginTop: "5px",
                    }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Button variant="outlined">Reset</Button>
          <Button variant="contained" onClick={handerSubmit}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
