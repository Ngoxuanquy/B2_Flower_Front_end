import React from "react";
import styles from "./FloatCard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const FloatCard = ({ number, text, backgroundColor, icon: IconComponent }) => {
  return (
    <div className={cx("container")} style={{ backgroundColor }}>
      <h3>{number}</h3>
      <p>{text}</p>
      <div className={cx("icon")}>{IconComponent && <IconComponent />}</div>
    </div>
  );
};

export default FloatCard;
