import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./ShopIntroduce.module.scss";
import ThemeConText from "../../../config/themeConText";

const ShopIntroduce = () => {
  const cx = classNames.bind(styles);
  const [theme, ordersLength] = useContext(ThemeConText);
  return (
    <div
      className={cx("container_")}
      style={{
        backgroundColor: theme.background,
        color: theme.color,
      }}
    >
      Giowis Thieeuj
    </div>
  );
};

export default ShopIntroduce;
