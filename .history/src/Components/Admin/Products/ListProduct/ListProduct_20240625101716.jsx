import React, { useState } from "react";
import { FaEye, FaPencil } from "react-icons/fa6";
import { MdOutlineBlock } from "react-icons/md";
import { IoSchoolSharp, IoSettingsSharp } from "react-icons/io5";

import { Button, MenuItem, Pagination } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./ListProduct.module.scss";
import classNames from "classnames/bind";
import { FaUser } from "react-icons/fa";
const cx = classNames.bind(styles);
const RegisteredUsers = () => {
  const [selectShow, setSelectShow] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
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
              <th>ROLE</th>
              <th>EMAIL</th>
              <th>PASSWORD</th>
              <th>PHONE</th>
              <th>STATUS</th>
              <th>CREATED</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1</td>
              <td>
                <div className={cx("info-user")}>
                  <img
                    src="https://scr.vn/wp-content/uploads/2020/07/avt-cute.jpg"
                    alt="avatar of user"
                  />
                  <p>CongTusJr</p>
                </div>
              </td>
              <td>
                <div className={cx("role")}>
                  <IoSettingsSharp />
                  admin
                </div>
              </td>
              <td>
                <span>admin@gmail.com</span>
              </td>
              <td>
                $2a$06$4Uoeanolkkpo8gBDNIYt6eid0Qm8cCwsYU5VwaQcBsB6KISR1kwf2
              </td>
              <td>0123456789</td>
              <td>
                <p className={cx("status")}>Approved</p>
              </td>
              <td>15/06/2022 14:02</td>
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
                  <img
                    src="https://scr.vn/wp-content/uploads/2020/07/avt-cute.jpg"
                    alt="avatar of user"
                  />
                  <p>2Be Flower</p>
                </div>
              </td>
              <td>
                <div className={cx("role")}>
                  <FaUser style={{ color: "#1a9f53" }} />
                  member
                </div>
              </td>
              <td>
                <span>admin@gmail.com</span>
              </td>
              <td>
                $2a$06$4Uoeanolkkpo8gBDNIYt6eid0Qm8cCwsYU5VwaQcBsB6KISR1kwf2
              </td>
              <td>0123456789</td>
              <td>
                <p
                  className={cx("status")}
                  style={{ background: "#f6caff", color: "#a808c3" }}
                >
                  Pending
                </p>
              </td>
              <td>15/06/2022 14:02</td>
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
                  <img
                    src="https://scr.vn/wp-content/uploads/2020/07/avt-cute.jpg"
                    alt="avatar of user"
                  />
                  <p>CongTusJr</p>
                </div>
              </td>
              <td>
                <div className={cx("role")}>
                  <IoSchoolSharp style={{ color: "#2b77e5" }} />
                  founder
                </div>
              </td>
              <td>
                <span>admin@gmail.com</span>
              </td>
              <td>
                $2a$06$4Uoeanolkkpo8gBDNIYt6eid0Qm8cCwsYU5VwaQcBsB6KISR1kwf2
              </td>
              <td>0123456789</td>
              <td>
                <p
                  className={cx("status")}
                  style={{ background: "#ffc4cd", color: "#e00b2b" }}
                >
                  Block
                </p>
              </td>
              <td>15/06/2022 14:02</td>
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
export default RegisteredUsers;
