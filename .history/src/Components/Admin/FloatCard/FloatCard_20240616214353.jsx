import React from "react";
import styles from "./FloatCard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const FloatCard = () => {
  return <div className={cx("container")}>FloatCard</div>;
};

export default FloatCard;
