import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import { Image } from "antd";
import { Link } from "react-router-dom";
import ThemeConText from "../../config/themeConText";
const cx = classNames.bind(styles);

function Card({ list }) {
  const [theme, ordersLength] = useContext(ThemeConText);

  return (
    <div
      className={cx("container_")}
      style={{
        color: theme.color,
      }}
    >
      <div className="container_">
        <div className={cx("box")}>
          <div className="">
            <Image
              className={cx("img_card")}
              src={list.product_thumb}
              data-testid="product-image"
            />
            <div className={cx("button")}>
              <button>Mới</button>
            </div>
          </div>
        </div>
        <Link
          to={`/detailproduct/` + list._id}
          style={{
            listStyle: "none",
            textDecoration: "none",
          }}
        >
          <div
            className={cx("conten")}
            style={{
              color: theme.color,
              display: "flex",
              justifyContent: "space-around",
              width: "300px",
              marginTop: "-10px",
            }}
          >
            <div>{list.product_name}</div>
            <div>đ{list.product_price}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Card;
