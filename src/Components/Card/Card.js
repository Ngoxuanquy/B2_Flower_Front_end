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

            <div className={cx("button_discount")}>
              <button>{list?.product_discount}%</button>
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
              justifyContent: "space-between",
              width: "300px",
              marginTop: "-10px",
            }}
          >
            <div
              style={{
                width: "130px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {list.product_name}
            </div>
            {list.product_discount ? (
              <>
                <div>đ{list.product_price * (100 - list.product_discount)}</div>
                <div
                  style={{
                    textDecoration: "line-through",
                    fontSize: "12px",
                    marginTop: "6px",
                  }}
                >
                  đ{list.product_price}
                </div>
              </>
            ) : (
              <div>đ{list.product_price}</div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Card;
