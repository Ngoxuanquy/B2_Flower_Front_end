import React from "react";
import styles from "./FloatCard.module.scss";
import classNames from "classnames/bind";
import { MdPending } from "react-icons/md";

const cx = classNames.bind(styles);

const FloatCard = () => {
  return (
    <div className={cx("container")}>
      <h3>547</h3>
      <p>Pending User</p>
      <div>
        <MdPending />
      </div>
    </div>
  );
};

export default FloatCard;
