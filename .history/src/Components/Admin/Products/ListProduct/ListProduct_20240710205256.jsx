import React, { useEffect, useState } from "react";
import { FaEye, FaPencil } from "react-icons/fa6";
import { MdOutlineBlock } from "react-icons/md";

import { Button, MenuItem, Pagination } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./ListProduct.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const ListProduct = ({ apis }) => {
  const URL = process.env.REACT_APP_URL;

  const [api, setApi] = useState(apis);
  const [selectShow, setSelectShow] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  useEffect(() => {
    setApi(apis);
  }, [apis]);

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
              <th>PRICE</th>
              <th>STOCK</th>
              <th>SIZE</th>
              <th>COLOR</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1</td>
              <td>
                <div className={cx("info-user")}>
                  <div className={cx("imgWrapper")}>
                    <img
                      src="https://diachishophoa.com/uploads/noidung/images/baiviet/hinh-anh-hoa-hong-do.jpg"
                      alt="image_products"
                      className="w-100"
                    />
                  </div>
                  <p>Hoa hồng</p>
                </div>
              </td>
              <td>
                <div className={cx("role")}>admin</div>
              </td>
              <td>
                <span>admin@gmail.com</span>
              </td>
              <td>
                $2a$06$4Uoeanolkkpo8gBDNIYt6eid0Qm8cCwsYU5VwaQcBsB6KISR1kwf2
              </td>
              <td>0123456789</td>
              <td>
                <div className={cx("actions")}>
                  <Button className={cx("secondary")} color="secondary">
                    <FaEye />
                  </Button>
                  <Button className={cx("success")} color="success">
                    <FaPencil />
                  </Button>
                  <Button className={cx("error")} color="error">
                    <MdOutlineBlock />
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>#2</td>
              <td>
                <div className={cx("info-user")}>
                  <div className={cx("imgWrapper")}>
                    <img
                      src="https://scr.vn/wp-content/uploads/2020/07/avt-cute.jpg"
                      alt="avatar of user"
                      className="w-100"
                    />
                  </div>
                  <p>2Be Flower</p>
                </div>
              </td>
              <td>
                <div className={cx("role")}>member</div>
              </td>
              <td>
                <span>admin@gmail.com</span>
              </td>
              <td>
                $2a$06$4Uoeanolkkpo8gBDNIYt6eid0Qm8cCwsYU5VwaQcBsB6KISR1kwf2
              </td>
              <td>0123456789</td>
              <td>
                <div className={cx("actions")}>
                  <Button className={cx("secondary")} color="secondary">
                    <FaEye />
                  </Button>
                  <Button className={cx("success")} color="success">
                    <FaPencil />
                  </Button>
                  <Button className={cx("error")} color="error">
                    <MdOutlineBlock />
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>#3</td>
              <td>
                <div className={cx("info-user")}>
                  <div className={cx("imgWrapper")}>
                    <img
                      src="https://scr.vn/wp-content/uploads/2020/07/avt-cute.jpg"
                      alt="avatar of user"
                      className="w-100"
                    />
                  </div>
                  <p>CongTusJr</p>
                </div>
              </td>
              <td>
                <div className={cx("role")}>founder</div>
              </td>
              <td>
                <span>admin@gmail.com</span>
              </td>
              <td>
                $2a$06$4Uoeanolkkpo8gBDNIYt6eid0Qm8cCwsYU5VwaQcBsB6KISR1kwf2
              </td>
              <td>0123456789</td>
              <td>
                <div className={cx("actions")}>
                  <Button className={cx("secondary")} color="secondary">
                    <FaEye />
                  </Button>
                  <Button className={cx("success")} color="success">
                    <FaPencil />
                  </Button>
                  <Button className={cx("error")} color="error">
                    <MdOutlineBlock />
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={cx("page")}>
          <Pagination count={10} />
        </div>
      </div>
    </div>
  );
};
export default ListProduct;
