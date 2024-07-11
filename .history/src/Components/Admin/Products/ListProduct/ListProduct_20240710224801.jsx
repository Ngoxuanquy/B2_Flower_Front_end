import React, { useEffect, useState } from "react";
import { FaEye, FaPencil } from "react-icons/fa6";
import { MdOutlineBlock } from "react-icons/md";
import Cookies from "js-cookie";
import { Button, CircularProgress, MenuItem, Pagination } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./ListProduct.module.scss";
import { Call_Post_Api } from "../../../../Components/CallApi/CallApis";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const ListProduct = ({ apis }) => {
  // const URL = process.env.REACT_APP_URL;
  const [api, setApi] = useState([]);
  const [selectShow, setSelectShow] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (apis && Array.isArray(apis)) {
      setApi(apis);
      setLoading(false);
    }
  }, [apis]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("accessToken")?.replace(/"/g, "");
        const id = Cookies.get("id")?.replace(/"/g, "");

        const data = await Call_Post_Api(
          null,
          token,
          id,
          `/shop/get_roles/${id}`,
          "GET"
        );
        setRoles(data.metadata);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchData();
  }, []);

  const handerDelete = async (productId) => {
    try {
      const token = Cookies.get("accessToken")?.replace(/"/g, "");
      const id = Cookies.get("id")?.replace(/"/g, "");

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_API_KEY,
          authorization: token,
          "x-client-id": id,
        },
      };

      const response = await fetch(
        `${process.env.REACT_APP_URL}/product/delete/${productId}`,
        requestOptions
      );
      if (response.ok) {
        alert("Deleted successfully!!");
        window.location.reload();
      } else {
        console.error("Delete request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleChangeSelectShow = (event) => {
    setSelectShow(event.target.value);
  };
  const handleChangeSelectCategory = (event) => {
    setSelectCategory(event.target.value);
  };
  return (
    <div className={cx("container")}>
      <h4 className={cx("titleRegistered")}>Registered Users</h4>
      <div className={cx("select_by")}>
        <div className="col-md-3">
          <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }} size="small">
            <InputLabel id="demo-select-small-label">Show by</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectShow}
              label="Age"
              onChange={handleChangeSelectShow}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>10 row</MenuItem>
              <MenuItem value={20}>20 row</MenuItem>
              <MenuItem value={30}>30 row</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3 " style={{ marginLeft: "10px" }}>
          <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }} size="small">
            <InputLabel id="demo-select-small-label">Category by</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectCategory}
              label="Age"
              onChange={handleChangeSelectCategory}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={cx("table-responsive")}>
        <table className={cx("table", "table-bordered")}>
          <thead>
            <tr>
              <th>UID</th>
              <th>NAME</th>
              <th>RATING</th>
              <th>PRICE</th>
              <th>STOCK</th>
              <th>SIZE</th>
              <th>COLOR</th>
              <th>ACTION</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {api?.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>#{index + 1}</td>
                    <td>
                      <div className={cx("info-user")}>
                        <div className={cx("imgWrapper")}>
                          <img
                            src={item.product_thumb}
                            alt="image_products"
                            className="w-100"
                          />
                        </div>
                        <p>{item.product_name}</p>
                      </div>
                    </td>
                    <td>{item.product_ratingsAverage}</td>
                    <td>
                      <div className={cx("role")}>{item.product_price}</div>
                    </td>
                    <td>
                      <span>{item.product_quantity}</span>
                    </td>
                    <td>{item.product_attributes.size}</td>
                    <td>{item.product_attributes.color}</td>
                    <td>
                      <div className={cx("actions")}>
                        <Button className={cx("secondary")} color="secondary">
                          <FaEye />
                        </Button>
                        <Button className={cx("success")} color="success">
                          <FaPencil />
                        </Button>
                        {(roles.includes("DELETE") ||
                          roles.includes("ADMIN")) &&
                          (item.product_quantity === 0 ? (
                            <Button
                              className={cx("error")}
                              onClick={() => handerDelete(item._id)}
                            >
                              <MdOutlineBlock />
                            </Button>
                          ) : (
                            <div>
                              <Button className={cx("error")} disabled>
                                <MdOutlineBlock />
                              </Button>
                              <p>
                                Cannot delete, product quantity is greater than
                                0
                              </p>
                            </div>
                          ))}
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          )}
        </table>
        {loading && ( // Render loading spinner while loading is true
          <div className={cx("loading-container")}>
            <CircularProgress />
          </div>
        )}
        <div className={cx("page")}>
          <Pagination count={10} />
        </div>
      </div>
    </div>
  );
};
export default ListProduct;
