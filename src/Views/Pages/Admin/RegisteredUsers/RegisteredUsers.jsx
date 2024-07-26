import React, { useEffect, useState } from "react";
import { FaEye, FaPencil } from "react-icons/fa6";
import { MdOutlineBlock } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

import { Button, MenuItem, Pagination } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./RegisteredUsers.module.scss";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import {
  Input,
  Modal,
  Select as AntSelect,
  Collapse,
  DatePicker,
  message,
} from "antd";

const cx = classNames.bind(styles);
const RegisteredUsers = ({ apis }) => {
  const URL = process.env.REACT_APP_URL;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDiscount, setIsModalOpenDiscount] = useState(false);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [detailApi, setDetailApi] = useState(null);
  const [api, setApi] = useState(apis || []);
  const [messageApi, contextHolder] = message.useMessage();

  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const [status, setStatus] = useState("");
  const [selectShow, setSelectShow] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [textRadom, setTextRadom] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [value, setValue] = useState("");

  const handleStartValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const options = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "SHOP", label: "SHOP" },
    { value: "CREATE", label: "CREATE" },
    { value: "READ", label: "READ" },
    { value: "EDIT", label: "EDIT" },
    { value: "DELETE", label: "DELETE" },
    { value: "DISCOUNT", label: "DISCOUNT" },
    { value: "DESTROYFLOWERS", label: "Destroy Flowers" },
  ];

  const optionUser = api?.map((user) => ({
    label: user.email,
    value: user.email,
  }));

  const handleUserChanges = (selectedItems) => {
    if (selectedItems.includes("select_all")) {
      // Kiểm tra nếu tất cả các tùy chọn đã được chọn
      if (roles.length === optionUser.length - 1) {
        // Nếu đã chọn tất cả, bỏ chọn tất cả
        setUsers([]);
      } else {
        // Nếu chưa chọn tất cả, chọn tất cả
        setUsers(
          optionUser
            .map((option) => option.value)
            .filter((value) => value !== "select_all")
        );
      }
    } else {
      // Cập nhật roles mà không bao gồm "Select All"
      setUsers(selectedItems.filter((item) => item !== "select_all"));
    }
  };

  const filteredOptions = optionUser.filter(
    (option) => option.value !== "select_all"
  );

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
  const handleDiscountOk = () => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/^"|"$/g, "");
    const cleanId = id?.replace(/^"|"$/g, "");

    // Validation checks
    if (!cleanedJwtString) {
      messageApi.open({
        type: "error",
        content: "Token không được để trống",
      });
      return;
    }

    if (!cleanId) {
      messageApi.open({
        type: "error",
        content: "ID không được để trống",
      });
      return;
    }

    if (!textRadom) {
      messageApi.open({
        type: "error",
        content: "Mã giảm giá không được để trống",
      });
      return;
    }

    if (!users || users.length === 0) {
      messageApi.open({
        type: "error",
        content: "Người dùng không được để trống",
      });
      return;
    }

    if (!startDate) {
      messageApi.open({
        type: "error",
        content: "Ngày bắt đầu không được để trống",
      });
      return;
    }

    if (!endDate) {
      messageApi.open({
        type: "error",
        content: "Ngày kết thúc không được để trống",
      });
      return;
    }

    if (!value) {
      messageApi.open({
        type: "error",
        content: "Giá trị không được để trống",
      });
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
        authorization: cleanedJwtString,
        "x-client-id": cleanId,
      },
      body: JSON.stringify({
        code: textRadom,
        users_user: users,
        start_date: startDate,
        end_date: endDate,
        value: value,
        name: "thích thì giảm",
      }),
    };

    fetch(URL + "/discount", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((res) => {
        setEndDate(null);
        setStartDate(null);
        setTextRadom(0);
        setUsers([]);
        setIsModalOpenDiscount(false);
        messageApi.open({
          type: "success",
          content: "Đặt hàng thành công!!!",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        messageApi.open({
          type: "error",
          content: "Đặt hàng thất bại, vui lòng thử lại!",
        });
      });
  };

  const handleDiscountCancel = () => {
    setIsModalOpenDiscount(false);
  };

  const handelOpentDiscount = () => {
    setIsModalOpenDiscount(true);
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

  function getRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setTextRadom(result);
    return result;
  }

  const handelRamdom = () => {
    getRandomString(6);
  };

  return (
    <div className={cx("container")}>
      {contextHolder}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className={cx("model-header")}>
          <h2>Thông tin cá nhân</h2>
          <div>
            Name
            <Input value={name} onChange={handleNameChange} />
          </div>
          <div>
            Email
            <Input value={email} onChange={handleEmailChange} disabled />
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
      <Modal
        open={isModalOpenDiscount}
        onOk={handleDiscountOk}
        onCancel={handleDiscountCancel}
      >
        <div>
          <h4>Mã khuyến mãi</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "30px",
            }}
          >
            <button
              style={{
                padding: "4px",
              }}
              onClick={handelRamdom}
            >
              Tạo ngẫu nhiên
            </button>
            <span>{textRadom}</span>
          </div>
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              % khuyến mãi
              <input
                type="text"
                style={{
                  marginLeft: "10px",
                }}
                onChange={handleStartValueChange}
              />
            </div>
            <div>
              Ngày bắt đầu
              <input
                type="date"
                style={{
                  marginLeft: "10px",
                }}
                onChange={handleStartDateChange}
              />
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              Ngày kết thúc
              <input
                type="date"
                style={{
                  marginLeft: "10px",
                }}
                onChange={handleEndDateChange}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: " 20px",
            }}
          >
            <h5>Danh sách người dùng muốn add</h5>
            <AntSelect
              mode="multiple"
              placeholder="Please select"
              value={users}
              onChange={handleUserChanges}
              style={{ width: "100%" }}
              options={[
                {
                  label: "Select All",
                  value: "select_all",
                  disabled: roles.length === filteredOptions.length, // Disable "Select All" nếu đã chọn tất cả
                },
                ...filteredOptions,
              ]}
            />
          </div>
        </div>
      </Modal>
      <h4 className={cx("titleRegistered")}>Registered Users</h4>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className={cx("select_by")}>
          <div className="col-md-3">
            <FormControl
              sx={{ m: 1, minWidth: 120, width: "100%" }}
              size="small"
            >
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
            <FormControl
              sx={{ m: 1, minWidth: 120, width: "100%" }}
              size="small"
            >
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
        <div>
          <Button onClick={handelOpentDiscount}>Tạo mã khuyến mãi</Button>
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
            {api?.map((api, index) => (
              <React.Fragment key={index}>
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
              </React.Fragment>
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
