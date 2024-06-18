import React from "react";
import PropTypes from "prop-types";
import styles from "./PageTitle.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const PageTitle = ({ title, items }) => {
  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <h3>{title}</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.link ? <a href={item.link}>{item.text}</a> : item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default PageTitle;
