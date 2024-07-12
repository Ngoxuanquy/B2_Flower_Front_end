import React from "react";
import styles from "./ProductUpload.module.scss";
import classNames from "classnames/bind";
import PageTitle from "../../../../../Components/Admin/PageTitle/PageTitle";
import CreateProduct from "../CreateProduct";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const cx = classNames.bind(styles);
const ProductUpload = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const pageTitleProps = {
    title: "Product Upload",
    items: [
      { text: "Admin", link: "/admin/dash-board" },
      { text: "Product", link: "/admin/product-list" },
      { text: "Product Upload" },
    ],
  };
  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <PageTitle title={pageTitleProps.title} items={pageTitleProps.items} />
        <div className={cx("information")}>
          <div className={cx("info-header")}>
            <h4>Basic Information</h4>
          </div>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Item>xs=4</Item>
            </Grid>
            <Grid xs={6}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
        </div>
        <CreateProduct />
      </div>
    </div>
  );
};

export default ProductUpload;
