// FloatCard.js
import React from "react";
import styles from "./FloatCard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const FloatCard = ({ number, text, backgroundColor, icon, iconColor }) => {
  return (
    <div className={cx("container")} style={{ backgroundColor }}>
      <h3>{number}</h3>
      <p>{text}</p>
      <div className={cx("icon")} style={{ color: iconColor }}>
        {icon}
      </div>
    </div>
  );
};

export default FloatCard;
