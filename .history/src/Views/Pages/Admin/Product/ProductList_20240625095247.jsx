import React from "react";

const ProductList = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <PageTitle title={pageTitleProps.title} items={pageTitleProps.items} />
      </div>
    </div>
  );
};

export default ProductList;
