import React from "react";
import styles from "./FloatCard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const FloatCard = () => {
  return (
    <div className={cx("container")}>
      <h3>547</h3>
      <p>Pending User</p>
    </div>
  );
};

export default FloatCard;
