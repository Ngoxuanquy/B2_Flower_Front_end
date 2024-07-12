import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./index.module.scss";
import Cookies from "js-cookie";
import axios from "axios";
import { ClimbingBoxLoader } from "react-spinners";
import { Call_Post_Api } from "../../../../../Components/CallApi/CallApis";

const cx = classNames.bind(styles);

function Index() {
  const URL = process.env.REACT_APP_URL;

  console.log(URL);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  console.log({ uploadedImage });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

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

    // console.log(await uploadImage())
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

  //khai báo loaidng
  const [isLoading, setIsLoading] = useState(false);

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
      <div className={cx("rigth")}>
        <div
          style={{
            padding: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <div
              style={{
                fontSize: 16,
                width: 150,
                marginTop: 30,
                fontWeight: 700,
              }}
            >
              Tên Sản Phẩm
            </div>
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
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: -10,
          }}
        >
          <div
            style={{
              fontSize: 16,
              width: 150,
              marginLeft: 10,
              marginTop: 30,
              fontWeight: 700,
            }}
          >
            Giá
          </div>

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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: -10,
          }}
        >
          <div
            style={{
              fontSize: 16,
              width: 150,
              marginLeft: 10,
              marginTop: 30,
              fontWeight: 700,
            }}
          >
            Hình ảnh
          </div>
          <div className={cx("image-input")}>
            <input
              type="file"
              accept="image/*"
              id="imageInput"
              onChange={handleFileChange}
            />
            <label htmlFor="imageInput" className={cx("image-button")}>
              <i className="far fa-image"></i> Choose image
            </label>
          </div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              fontSize: 16,
              width: 150,
              marginLeft: 10,
              fontWeight: 700,
              marginTop: 30,
            }}
          >
            Ghi Chú
          </div>
          <div className={cx("wave-group")}>
            <input
              required
              type="text"
              className={cx("input")}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className={cx("bar")}></span>
            <label className={cx("label")}>
              <span className={cx("label-char")} style={{ "--index": 0 }}>
                N
              </span>
              <span className={cx("label-char")} style={{ "--index": 1 }}>
                o
              </span>
              <span className={cx("label-char")} style={{ "--index": 2 }}>
                t
              </span>
              <span className={cx("label-char")} style={{ "--index": 2 }}>
                e
              </span>
            </label>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 10,
            marginTop: -10,
          }}
        >
          <div
            style={{
              fontSize: 16,
              width: 150,
              marginLeft: 10,
              fontWeight: 700,
              marginTop: 30,
            }}
          >
            Size
          </div>
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
              <span className={cx("label-char")} style={{ "--index": 2 }}>
                e
              </span>
            </label>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 10,
            marginTop: -10,
          }}
        >
          <div
            style={{
              fontSize: 16,
              width: 150,
              marginLeft: 10,
              fontWeight: 700,
              marginTop: 30,
            }}
          >
            Type
          </div>
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
                S
              </span>
              <span className={cx("label-char")} style={{ "--index": 1 }}>
                i
              </span>
              <span className={cx("label-char")} style={{ "--index": 2 }}>
                z
              </span>
              <span className={cx("label-char")} style={{ "--index": 2 }}>
                e
              </span>
            </label>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 10,
            marginTop: -10,
          }}
        >
          <div
            style={{
              fontSize: 16,
              width: 150,
              marginLeft: 10,
              marginTop: 30,
              fontWeight: 700,
            }}
          >
            Màu
          </div>

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
                M
              </span>
              <span className={cx("label-char")} style={{ "--index": 1 }}>
                à
              </span>
              <span className={cx("label-char")} style={{ "--index": 2 }}>
                u
              </span>
            </label>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              fontSize: 16,
              marginTop: 30,
              fontWeight: 700,
              width: 170,
            }}
          >
            Số Lượng Trong Kho
          </div>

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
                S
              </span>
              <span className={cx("label-char")} style={{ "--index": 1 }}>
                ố
              </span>
              <span className={cx("label-char")} style={{ "--index": 2 }}>
                -
              </span>
              <span className={cx("label-char")} style={{ "--index": 2 }}>
                l
              </span>
              <span className={cx("label-char")} style={{ "--index": 2 }}>
                ư
              </span>
              <span className={cx("label-char")} style={{ "--index": 2 }}>
                ợ
              </span>
              <span className={cx("label-char")} style={{ "--index": 2 }}>
                n
              </span>
              <span className={cx("label-char")} style={{ "--index": 2 }}>
                g
              </span>
            </label>
          </div>
        </div>
        <div
          style={{
            marginLeft: 20,
            padding: 10,
          }}
        >
          <div>
            <button className={cx("learn-more")} onClick={() => handerSubmit()}>
              {" "}
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
