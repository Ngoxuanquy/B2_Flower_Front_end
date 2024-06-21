import React, { useEffect, useState, useContext } from "react";
import classNames from "classnames/bind";
import styles from "./shoppage.module.scss";
import { Card, Shop_Left } from "../../../Components";
import ScrollReveal from "scrollreveal";
import AOS from "aos";
// import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import { Call_Post_Api } from "../../../Components/CallApi/CallApis";
import ButtomNavigation from "../../../Components/ButtomNavigation/ButtomNavigation";
import { Pagination, Slider } from "antd";
import { Spin, message } from "antd";
import { Avatar, Badge, Switch, Space, Drawer } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined, MenuOutlined, AlignRightOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import ThemeConText from "../../../config/themeConText";

const cx = classNames.bind(styles);

const ShopPage = () => {
  const [count, setCount] = useState(5); // Initialize count with 5
  const [theme, ordersLength] = useContext(ThemeConText);

  useEffect(() => {
    AOS.init();

    // const sr = ScrollReveal();

    // // Thiết lập cấu hình cho hiệu ứng
    // sr.reveal(this.container, {
    //     duration: 1000,
    //     origin: 'left',
    //     distance: '100px',
    // });
  }, []);

  const [isLoad, setIsLoad] = useState(true);

  const [disabled, setDisabled] = useState(false);
  const [valueSlider, setValueSlider] = useState([]);

  //lấy giá trị nhỏ và lớn
  const [value_min, setValueMin] = useState(20);
  const [value_max, setValueMax] = useState(50);

  const onChange = (checked) => {
    setDisabled(checked);
  };

  const colors = [
    { id: 1, title: "Cam", color: "coral" },
    { id: 2, title: "Đỏ", color: "red" },
    { id: 3, title: "Đen", color: "black" },
    { id: 4, title: "Vàng", color: "yellow" },
    { id: 5, title: "Xanh dương", color: "blue" },
    { id: 6, title: "Xanh lá", color: "green" },
    { id: 7, title: "All", color: "All" },
  ];

  const types = [
    { id: 1, name: "Hoa" },
    { id: 2, name: "hộp quà" },
    { id: 6, name: "Gấu bông" },
    { id: 3, name: "Đồ đan tay" },
    { id: 4, name: "Các đồ thiết kế" },
    { id: 5, name: "Các đồ có sẵn" },
    { id: 6, name: "All" },
  ];

  const sizes = [
    { id: 1, size: "40cm" },
    { id: 2, size: "60cm" },
    { id: 3, size: "80cm" },
    { id: 4, size: "100cm" },
  ];

  const [apis, setApi] = useState([]);

  useEffect(() => {
    Call_Post_Api(null, null, null, "/product/getAll").then((data) => {
      setApi(data.metadata);
      setIsLoad(false);
    });
  }, []);

  const [apiLocs, setApiTT] = useState([]);
  const [colorLocs, setColor] = useState("");
  const [typeLocs, setType] = useState("");

  //xử lý chọn màu
  const handelColor = (color) => {
    setColor(color);
    setIsLoad(true);
    if (color != "All") {
      const filteredApis = apis.filter((api) => {
        return api.product_attributes.color.toLowerCase() === color.toLowerCase();
      });
      setApiTT(filteredApis);
      setIsLoad(false);
    } else {
      setApiTT(apis);
      setIsLoad(false);
    }
  };

  //xử lý chọn cm
  const [sizess, setSize] = useState("");
  const hanlerSize = (size) => {
    setSize(size);
    setIsLoad(true);
    if (size != "All") {
      const filteredApis = apis.filter((api) => {
        return api.product_attributes.size.toLowerCase() === size.toLowerCase();
      });
      setApiTT(filteredApis);
      setIsLoad(false);
    } else {
      setApiTT(apis);
      setIsLoad(false);
    }
  };

  //xử lý chọn kiểu
  const handlerType = (type) => {
    setType(type);
    setIsLoad(true);
    if (type != "All") {
      const filteredApis = apis.filter((api) => {
        return api.product_type.toLowerCase() === type.toLowerCase();
      });
      setApiTT(filteredApis);
      setIsLoad(false);
    } else {
      setApiTT(apis);
      setIsLoad(false);
    }
  };

  //xử lý lấy sử kiện giá trị
  const [locPrice, setLocPrice] = useState("");
  const handerChangeValue = (e) => {
    setValueMin(e[0]);
    setValueMax(e[1]);
    setLocPrice(e[1]);
    const filteredProducts = apis.filter((product) => {
      return product.product_price >= Number(e[0]) && product.product_price <= Number(e[1]);
    });
    setApiTT(filteredProducts);
  };

  //draw
  const getItem = (label, key, icon, children, type) => ({
    key,
    icon,
    children,
    label,
    type,
  });

  const items_menu = [
    getItem("Danh mục", "sub1", <MailOutlined />, [
      getItem("Hoa", "g1", null, [getItem("Hoa có sẵn", "hoa"), getItem("Hoa tự làm", "hoa")], "group"),
      getItem("Hộp quà", "Hộp quà", null, [getItem("Hộp quà có sẵn", "Hộp quà"), getItem("Hộp quà tự đóng gói", "Hộp quà")], "group"),
      getItem("Khác", "Khác", null, [getItem("Gấu bông", "Gấu bông"), getItem("Đồ ăn", "Đồ ăn")], "group"),
    ]),

    getItem("Màu sắc", "Màu sắc", <AppstoreOutlined />, [
      getItem(
        "Màu cam",
        "cam",
        <div
          style={{
            backgroundColor: "coral",
            width: "20px",
            height: "20px",
          }}
        ></div>
      ),
      getItem(
        "Màu đỏ",
        "đỏ",
        <div
          style={{
            backgroundColor: "red",
            width: "20px",
            height: "20px",
          }}
        ></div>
      ),
      getItem(
        "Màu đen",
        "đen",
        <div
          style={{
            backgroundColor: "black",
            width: "20px",
            height: "20px",
          }}
        ></div>
      ),
      getItem(
        "Màu vàng",
        "vàng",
        <div
          style={{
            backgroundColor: "yellow",
            width: "20px",
            height: "20px",
          }}
        ></div>
      ),
      getItem(
        "Màu xanh dương",
        "xanh dương",
        <div
          style={{
            backgroundColor: "blue",
            width: "20px",
            height: "20px",
          }}
        ></div>
      ),
      getItem(
        "Màu xanh lá",
        "xanh lá",
        <div
          style={{
            backgroundColor: "green",
            width: "20px",
            height: "20px",
          }}
        ></div>
      ),
    ]),

    { type: "divider" },

    getItem("Kích thước", "Kích thước", <SettingOutlined />, [
      getItem("40cm", "40cm"),
      getItem("60cm", "60cm"),
      getItem("80cm", "80cm"),
      getItem("khác", "khác"),
    ]),

    getItem("Group", "grp", null, [getItem("Option 13", "13"), getItem("Option 14", "14")], "group"),
  ];

  const increase = () => {
    setCount(count + 1);
  };

  // Function to decrease the count
  const decline = () => {
    let newCount = count - 1;
    if (newCount < 0) {
      newCount = 0;
    }
    setCount(newCount);
  };

  //khai báo menu ẩn
  const onClick = (e) => {
    console.log("click ", e);
    handlerType(e.key);
    onClose();
  };
  //khai báo model
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div
      className={cx("container_")}
      style={{
        backgroundColor: theme.background,
        color: theme.color,
      }}
    >
      {isLoad && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100vh",
            zIndex: 100,
            top: 0,
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
      <Drawer title="Menu" placement="right" onClose={onClose} open={open} width="70%">
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items_menu}
        />
      </Drawer>
      <div className="container_">
        <div className={cx("shop-has-sidebar")}>
          <div className={cx("nova-page-header__overlay")}>
            <div
              style={{
                backgroundColor: theme.button,
              }}
            >
              <AlignRightOutlined
                style={{
                  fontSize: "25px",
                }}
                onClick={showDrawer}
              />
              <h1>Shop</h1> <br />
              <p>Trang Chủ | Shop</p>
            </div>
          </div>

          {/* Layout  */}
          <div className={cx("layout")}>
            <div className={cx("box")}>
              {/* left */}
              <div className={cx("left")}>
                <div className={cx("box")}>
                  <div className={cx("conten")}>
                    <h1>Danh Mục</h1>
                    {types.map((type) => (
                      <div
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => handlerType(type.name)}
                      >
                        {type.name}
                      </div>
                    ))}

                    <hr />
                  </div>
                  <div className={cx("price")}>
                    <div>Giá</div>
                    <Slider
                      range
                      defaultValue={[20, 50]}
                      min={50}
                      max={1000}
                      disabled={disabled}
                      dotActiveBorderColor="black"
                      onChange={(e) => {
                        handerChangeValue(e);
                      }}
                      rail="black"
                      style={{
                        color: "red", // Change the color here
                      }}
                    />
                    <br />
                    <div className={cx("valueSlider")}>
                      Giá tối thiểu: {value_min} - Giá tối đa: {value_max}
                    </div>
                  </div>
                  {/* Màu sắc */}
                  <div className={cx("color")}>
                    <hr />
                    <div className={cx("conten")}>Màu săc</div>
                    <div>
                      {colors?.map((color) => (
                        <div className={cx("value-corlor")} onClick={() => handelColor(color.title)}>
                          <p
                            style={{
                              width: "20px",
                              height: "20px",
                              backgroundColor: color.color,
                            }}
                          ></p>
                          <span>{color.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <hr />
                  {/* kichs thuowcs */}
                  <div className={cx("kichthuoc")}>
                    <div>Kích thước</div>
                    {sizes.map((size) => (
                      <div onClick={() => hanlerSize(size.size)}>
                        <p>{size.size}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* right */}
              <div className={cx("right")}>
                {colorLocs != "" || typeLocs != "" || sizess != "" || locPrice != "" ? (
                  <div className={cx("layout_right")}>
                    {apiLocs?.length != 0 ? (
                      apiLocs.map((list, index) => (
                        <div
                          key={list.id}
                          data-aos="fade-left"
                          // data-aos-easing="ease-out-cubic"
                          data-aos-duration={(index + 1) * 1000}
                        >
                          <Card list={list} />
                        </div>
                      ))
                    ) : (
                      <h2>Hiện chưa có sản phẩm</h2>
                    )}
                  </div>
                ) : (
                  <>
                    <div className={cx("layout_right")}>
                      {apis.map((list, index) => (
                        <div
                          key={list.id}
                          data-aos="fade-left"
                          // data-aos-easing="ease-out-cubic"
                          data-aos-duration={(index + 1) * 1000}
                        >
                          <Card list={list} />
                        </div>
                      ))}
                    </div>
                    <Pagination
                      defaultCurrent={1}
                      total={50}
                      style={{
                        marginBottom: "30px",
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
