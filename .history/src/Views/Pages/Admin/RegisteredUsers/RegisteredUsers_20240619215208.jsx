import React, { useEffect, useState } from "react";
import { FaEye, FaPencil } from "react-icons/fa6";
import { MdOutlineBlock } from "react-icons/md";
import { IoSchoolSharp, IoSettingsSharp } from "react-icons/io5";
import { Button, MenuItem, Pagination } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./RegisteredUsers.module.scss";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import { Input, Modal, Select as AntSelect } from "antd";

const cx = classNames.bind(styles);
const RegisteredUsers = ({ apis }) => {
  const URL = process.env.REACT_APP_URL;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [detailApi, setDetailApi] = useState(null);
  const [api, setApi] = useState(apis);

  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const [status, setStatus] = useState("");
  const [selectShow, setSelectShow] = useState("");
  const [selectCategory, setSelectCategory] = useState("");

  const options = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "SHOP", label: "SHOP" },
    { value: "CREATE", label: "CREATE" },
    { value: "READ", label: "READ" },
    { value: "EDIT", label: "EDIT" },
    { value: "DELETE", label: "DELETE" },
  ];

  useEffect(() => {
    setApi(apis);
  }, [apis]);

  const handleChangeSelectShow = (event) => {
    setSelectShow(event.target.value);
  };
  const handleChangeSelectCategory = (event) => {
    setSelectCategory(event.target.value);
  };

  const showModal = (api) => {
    setDetailApi(api);
    setName(api.name);
    setEmail(api.email);
    setRoles(api.roles);
    setStatus(api.status);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);

    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/^"|"$/g, "");
    const cleanId = id?.replace(/^"|"$/g, "");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
        authorization: cleanedJwtString,
        "x-client-id": cleanId,
      },
      body: JSON.stringify({
        id: detailApi._id,
        name,
        email,
        roles,
        status,
      }),
    };

    fetch(URL + "/shop/update_roles", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        getApi();
      });
  };

  const getApi = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/^"|"$/g, "");
    const cleanId = id?.replace(/^"|"$/g, "");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
        authorization: cleanedJwtString,
        "x-client-id": cleanId,
      },
    };

    fetch(URL + "/users/userId/" + cleanId, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.metadata);
        setApi(res.metadata);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getRoleClass = (role) => {
    switch (role.toUpperCase()) {
      case "READ":
        return "role-read";
      case "EDIT":
        return "role-edit";
      case "DELETE":
        return "role-delete";
      default:
        return "";
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRolesChange = (value) => {
    setRoles(value);
  };

  return (
    <div className={cx("container")}>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className={cx("model-header")}>
          <h2>Thông tin cá nhân</h2>
          <div>
            Name
            <Input value={name} onChange={handleNameChange} />
          </div>
          <div>
            Email
            <Input value={email} onChange={handleEmailChange} />
          </div>
          <div>
            Roles
            <AntSelect
              mode="multiple"
              placeholder="Please select"
              value={roles}
              onChange={handleRolesChange}
              style={{ width: "100%" }}
              options={options}
            />
          </div>
          <div>
            Status
            <Input value={status} onChange={handleStatusChange} />
          </div>
        </div>
      </Modal>
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
              <th>PHONE</th>
              <th>STATUS</th>
              <th>CREATED</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {api.map((api, index) => (
              <tr>
                <td>#{index + 1}</td>
                <td>
                  <div className={cx("info-user")}>
                    <img
                      src="https://scr.vn/wp-content/uploads/2020/07/avt-cute.jpg"
                      alt="avatar of user"
                    />
                    <p>{api.name}</p>
                  </div>
                </td>
                <td>
                  <div className={cx("role")}>
                    <IoSettingsSharp />
                    {api?.roles?.map((role, index) => (
                      <span key={index} className={cx(getRoleClass(role))}>
                        {role}{" "}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <span>{api.email}</span>
                </td>
                <td>0123456789</td>
                <td>
                  <p className={cx("status")}>{api.status}</p>
                </td>
                <td>{new Date(api.updatedAt).toLocaleDateString()}</td>
                <td>
                  <div className={cx("actions")}>
                    <Button className={cx("secondary")} color="secondary">
                      <FaEye />
                    </Button>
                    <Button className={cx("success")} color="success">
                      <FaPencil onClick={() => showModal(api)} />
                    </Button>
                    <Button className={cx("error")} color="error">
                      <MdOutlineBlock />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
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
