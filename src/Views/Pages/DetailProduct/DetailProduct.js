import React, { useEffect, useState, useContext } from "react";
import classNames from "classnames/bind";
import styles from "./DetailProduct.module.scss";
import { Button, Image, Input } from "antd";
import {
  StarOutlined,
  HeartOutlined,
  RiseOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  GooglePlusOutlined,
  LinkedinOutlined,
  AmazonOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
// import { Sliders } from "../../../Components";

import { useParams } from "react-router-dom";
import { Call_Post_Api } from "../../../Components/CallApi/CallApis";
import { message, Space } from "antd";
import Cookies from "js-cookie";
import { toaster } from "evergreen-ui";
import { EventRegister } from "react-event-listeners";
import ThemeConText from "../../../config/themeConText";
import { Spin, Flex, Rate } from "antd";
const cx = classNames.bind(styles);
const URL = process.env.REACT_APP_URL;
export const handerCongUnitTest = (value) => {
  return value + 1;
};

export const handerTruUnitTest = (value) => {
  if (value <= 1) {
    return (value = 1);
  }

  return value - 1;
};
// Assuming you have imported 'fetch' and set up your environment

export const fetchProduct = async (productId) => {
  try {
    const requestOptions = {
      method: "POST", // Ensure method is capitalized correctly
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "9c5fc232e6d39008a1757e4e97b576df03b1aac46dbf558344477b3f346bad379a831a6d8f567aed43c67dce6402f0ede2c72dda596c38553a78ae73cddffdae",
      },
      // You may need to include a body if the server expects it, e.g., body: JSON.stringify({ someData: "value" })
    };

    const response = await fetch(`${URL}/product/byId/${productId}`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null; // Return null or handle error as needed
  } finally {
    console.log("done");
  }
};

function DetailProduct() {
  const [isLoad, setIsLoad] = useState(true);
  const { productId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [products, setProduct] = useState([]);
  const [theme, ordersLength] = useContext(ThemeConText);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [valueRate, setValueRate] = useState(3);

  useEffect(() => {
    Call_Post_Api(null, null, null, `/product/byId/${productId}`).then((data) => {
      setProduct(data.metadata);
      setIsLoad(false);
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "DETAILS",
      children: (
        <div
          style={{
            fontSize: "17px",
          }}
        >
          Giới thiệu Sản phẩm Hoa: Chúng tôi tự hào giới thiệu bộ sưu tập hoa tươi đẹp của chúng tôi, mang đến cho bạn những lựa chọn tuyệt
          vời để làm đẹp không gian sống hoặc làm quà tặng ý nghĩa. Mỗi sản phẩm hoa của chúng tôi được chọn lọc kỹ lưỡng và chăm sóc tận
          tình, đảm bảo chất lượng tươi mới và bền lâu.
          <div
            style={{
              marginLeft: "20px",
              lineHeight: "40px",
              fontSize: "14px",
            }}
          >
            <li>
              <b> Chất lượng hàng đầu:</b> Chúng tôi sử dụng các loại hoa tươi nhất từ các nhà cung cấp uy tín, đảm bảo sản phẩm của bạn
              luôn đẹp và bền lâu.
            </li>
            <li>
              <b> Đa dạng lựa chọn:</b> Từ những bó hoa lãng mạn, hoa cưới trang nhã đến những bình hoa trang trí sang trọng, chúng tôi có
              nhiều lựa chọn phù hợp với nhu cầu và sở thích của bạn.
            </li>
            <li>
              <b> Thiết kế độc quyền: </b>Các bó hoa và bình hoa của chúng tôi được thiết kế bởi đội ngũ chuyên gia với kinh nghiệm, mang
              đến sự tinh tế và sáng tạo trong từng sản phẩm.
            </li>
          </div>
          <div>
            <b> Dịch vụ giao hàng tận nơi: </b>Chúng tôi cung cấp dịch vụ giao hàng nhanh chóng và an toàn, đảm bảo rằng hoa của bạn đến tay
            người nhận trong tình trạng tốt nhất.
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Bình luận",
      children: (
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.'
          <div>
            <Input />
            <Button>Gửi</Button>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: "Tab 3",
      children:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.3",
    },
  ];

  const [value, setValue] = useState(1);
  const handerCong = (product_quantity) => {
    if (value >= product_quantity) {
      return messageApi.open({
        type: "warning",
        content: "Sản phẩm đã lớn hơn hàng tồn kho!!!",
      });
    }

    setValue(value + 1);
  };

  const handerTru = () => {
    if (value <= 1) {
      messageApi.open({
        type: "warning",
        content: "Sản phẩm phải lớn hớn 1!!!",
      });
      return (value = 1);
    }

    setValue(value - 1);
  };
  //xuwr lys mua hangf
  const handlerAddCart = (products) => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    setIsLoad(true);
    // if (cleanId == userId) {
    //     alert('Sản Phẩm này của bạn, không mua được')
    // }
    if (!token) {
      alert("Bạn phải đăng nhập để mua hàng!!");
      window.location = "/login";
    } else {
      const cleanedJwtString = token?.replace(/"/g, "");
      const cleanId = id?.replace(/"/g, "");

      Call_Post_Api(
        {
          userId: cleanId,
          shopId: "645f78f0ff400061f37e430d",
          product: { ...products, quantity: value },
        },
        cleanedJwtString,
        cleanId,
        "/cart"
      ).then((data) => {
        EventRegister.emit("chaneLength", ordersLength + 1);
        setIsLoad(false);

        messageApi.open({
          type: "success",
          content: "Thêm vào giỏ hàng thành công!!!",
        });
      });
    }
  };

  return (
    <div
      className={cx("container_")}
      style={{
        backgroundColor: theme.background,
        color: theme.color,
      }}
    >
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

      <div className="container_">
        <div className={cx("box-layout")}>
          <div className={cx("conten")}>
            <div className={cx("layout-left")}>
              <Image src={products.product_thumb} />
            </div>
            <div className={cx("layout-right")}>
              <div>
                <i className={cx("name-product")}>{products.product_name}</i>
                <div className={cx("star")}>
                  <Flex gap="middle" vertical>
                    <Rate tooltips={desc} onChange={setValueRate} value={valueRate} style={{ fontSize: "24px" }} />
                    {/* {value ? <span>{desc[valueRate - 1]}</span> : null} */}
                  </Flex>
                  <span>Be the first to review this product</span>
                </div>
                <hr
                  style={{
                    opacity: 0.4,
                  }}
                />
                {products.product_discount ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "20px",
                      gap: "10px", // space between discounted and original price
                      color: theme.discountColor, // customize color if needed
                    }}
                  >
                    <div>đ {(products.product_price * (1 - products.product_discount / 100)).toLocaleString()}</div>
                    <div
                      style={{
                        textDecoration: "line-through",
                        color: theme.originalPriceColor,
                      }}
                    >
                      đ {products.product_price.toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "20px",
                      color: theme.priceColor, // customize color if needed
                    }}
                  >
                    đ {products.product_price}
                  </div>
                )}

                <div className={cx("des-product")}>{products.product_description}</div>
                <div className={cx("AVAILABILITY")}>
                  AVAILABILITY:
                  <span>IN STOCK</span>
                </div>
                <div className={cx("SKU")}>
                  SKU <span>AS555557</span>
                </div>
                <div className={cx("SKU")}>
                  Số lượng : <span>{products.product_quantity}</span>
                </div>
                <hr
                  style={{
                    width: "100%",
                    opacity: 0.4,
                    marginTop: "10px",
                  }}
                />
                <div className={cx("box-tocart")}>
                  <div className={cx("Soluong")}>
                    <Button onClick={handerTru}>-</Button>
                    <Input value={value} />
                    <Button onClick={() => handerCong(products.product_quantity)}>+</Button>
                  </div>
                  <button
                    className={cx("addtocart")}
                    onClick={() => handlerAddCart(products)}
                    disabled={products.product_quantity <= 0}
                    title={products.product_quantity <= 0 ? "Product is out of stock" : "Add to cart"}
                  >
                    {" "}
                    Add To Cart
                  </button>
                  <HeartOutlined
                    style={{
                      fontSize: "25px",
                      marginLeft: "15px",
                      border: "1px solid #e7e7e7",
                      padding: "0 10px",
                    }}
                  />
                  <RiseOutlined
                    style={{
                      fontSize: "25px",
                      marginLeft: "15px",
                      border: "1px solid #e7e7e7",
                      padding: "0 10px",
                    }}
                  />
                </div>
                <hr
                  style={{
                    width: "100%",
                    opacity: 0.2,
                  }}
                />
                <div className={cx("icon")}>
                  <div>
                    <FacebookOutlined
                      style={{
                        fontSize: "30px",
                      }}
                      className={cx("facebook")}
                    />
                    <YoutubeOutlined
                      style={{
                        fontSize: "30px",
                        marginLeft: "15px",
                      }}
                      className={cx("youtube")}
                    />
                    <GooglePlusOutlined
                      style={{
                        fontSize: "30px",
                        marginLeft: "15px",
                      }}
                      className={cx("google")}
                    />
                    <LinkedinOutlined
                      style={{
                        marginLeft: "15px",
                        fontSize: "30px",
                      }}
                      className={cx("linkedin")}
                    />
                    <AmazonOutlined
                      style={{
                        marginLeft: "15px",
                        fontSize: "30px",
                      }}
                      className={cx("amazon")}
                    />
                    <InstagramOutlined
                      style={{
                        marginLeft: "15px",
                        fontSize: "30px",
                      }}
                      className={cx("intagram")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Conten */}
          <div
            className={cx("detail")}
            style={{
              backgroundColor: theme.background,
              color: theme.color,
            }}
          >
            <Tabs
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
              style={{
                backgroundColor: theme.background,
                color: theme.color,
              }}
            />
          </div>

          <div className={cx("sanphamtuongtu")}>
            <div>WE FOUND OTHER PRODUCTS YOU MIGHT LIKE!</div>
          </div>
          {/* <div
            style={{
              width: "80%",
              alignItems: "center",
              backgroundColor: theme.background,
              color: theme.color,
              marginBottom: "20px",
            }}
          >
            <Sliders />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
