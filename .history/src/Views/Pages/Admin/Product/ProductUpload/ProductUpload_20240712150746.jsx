import React, { useState } from "react";
import styles from "./ProductUpload.module.scss";
import classNames from "classnames/bind";
import PageTitle from "../../../../../Components/Admin/PageTitle/PageTitle";
import CreateProduct from "../CreateProduct";
import { Col, Row } from "antd";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };
  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <PageTitle title={pageTitleProps.title} items={pageTitleProps.items} />
        <div className={cx("information")}>
          <div className={cx("info-header")}>
            <h4>Basic Information</h4>
          </div>
          <Row className={cx("row")}>
            <Col span={12} className={cx("col")}>
              <div>
                <label>Tên sản phẩm:</label>
                <div className={cx("wave-group")}>
                  <input required type="text" className={cx("input")} />
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
                Giá:
                <div className={cx("wave-group")}>
                  <input required type="text" className={cx("input")} />
                  <span className={cx("bar")}></span>
                  <label className={cx("label")}>
                    <span className={cx("label-char")} style={{ "--index": 0 }}>
                      G
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 1 }}>
                      i
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 2 }}>
                      á
                    </span>
                  </label>
                </div>
              </div>
              <div>
                Hình ảnh:
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
                      width: 100,
                      height: 100,
                      opacity: 0.9,
                      marginLeft: 20,
                    }}
                  />
                )}
              </div>
            </Col>
            <Col span={12} className={cx("col")}>
              <div>
                Tên sản phẩm:
                <div className={cx("wave-group")}>
                  <input required type="text" className={cx("input")} />
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
                Giá:
                <div className={cx("wave-group")}>
                  <input required type="text" className={cx("input")} />
                  <span className={cx("bar")}></span>
                  <label className={cx("label")}>
                    <span className={cx("label-char")} style={{ "--index": 0 }}>
                      G
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 1 }}>
                      i
                    </span>
                    <span className={cx("label-char")} style={{ "--index": 2 }}>
                      á
                    </span>
                  </label>
                </div>
              </div>
              <div>
                Hình ảnh:
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
                      width: 100,
                      height: 100,
                      opacity: 0.9,
                      marginLeft: 20,
                    }}
                  />
                )}
              </div>
            </Col>
          </Row>
        </div>
        <CreateProduct />
      </div>
    </div>
  );
};

export default ProductUpload;
