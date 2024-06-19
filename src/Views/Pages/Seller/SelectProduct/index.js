import React, { useEffect, useState, useRef, useMemo } from "react";
// import Left from '../../../../Components/Left/index';

import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Cookies from "js-cookie";
import axios from "axios";

import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
// import '@ag-grid-community/styles/ag-grid.css';
// import '@ag-grid-community/styles/ag-theme-alpine.css';
import Modal from "react-modal";
import { ClimbingBoxLoader } from "react-spinners";

import { ModuleRegistry } from "@ag-grid-community/core";
import { Left_Admin } from "../../../../Components";
// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RangeSelectionModule, RowGroupingModule, RichSelectModule]);

const cx = classNames.bind(styles);

function Index() {
  const URL = process.env.REACT_APP_URL;
  const sua = useRef();
  // const [apis, setApi] = useState([]);
  // const [uploadedImage, setUploadedImage] = useState(null);

  // const onDrop = (acceptedFiles) => {
  //     const file = acceptedFiles[0];
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //         setUploadedImage(reader.result);
  //     };

  //     reader.readAsDataURL(file);
  // };

  // const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const name_local = Cookies.get("name");

  //khai báo loaidng
  const [isLoading, setIsLoading] = useState(false);

  const [imageSrc, setImageSrc] = useState("");
  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
      setShowImagePreview(true);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  //khai báo biến
  const [apiproducts, setApiProduct] = useState("");

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token.replace(/^"|"$/g, "");
    const cleanId = id.replace(/^"|"$/g, "");

    const requestOptions = {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
        authorization: cleanedJwtString,
        "x-client-id": cleanId,
      },
    };

    // Lấy dữ liệu của khách hàng
    fetch(URL + "/product/drafts/all", requestOptions)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setApiProduct(data.metadata);
      });
  }, []);

  //apis đã puclic

  const [apipublic, setPublic] = useState([]);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token.replace(/^"|"$/g, "");
    const cleanId = id.replace(/^"|"$/g, "");

    const requestOptions = {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
        authorization: cleanedJwtString,
        "x-client-id": cleanId,
      },
    };

    // Lấy dữ liệu của khách hàng
    fetch(URL + "/product/published/all", requestOptions)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setPublic(data.metadata);
      });
  }, []);

  const handerDelete = (productId) => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token.replace(/^"|"$/g, "");
    const cleanId = id.replace(/^"|"$/g, "");

    const requestOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
        authorization: cleanedJwtString,
        "x-client-id": cleanId,
      },
    };

    // Lấy dữ liệu của khách hàng
    fetch(URL + "/product/delete/" + productId, requestOptions).then((data) => {
      alert("Xóa thành công!!");
      window.location.reload();
    });
  };

  const handerPublic = (productId) => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token.replace(/^"|"$/g, "");
    const cleanId = id.replace(/^"|"$/g, "");

    const requestOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
        authorization: cleanedJwtString,
        "x-client-id": cleanId,
      },
    };

    // Lấy dữ liệu của khách hàng
    fetch(URL + "/product/publish/" + productId, requestOptions).then((data) => {
      alert("Public thành công!!");
      window.location.reload();
    });
  };

  const handerUnPublic = (productId) => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token.replace(/^"|"$/g, "");
    const cleanId = id.replace(/^"|"$/g, "");

    const requestOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
        authorization: cleanedJwtString,
        "x-client-id": cleanId,
      },
    };

    // Lấy dữ liệu của khách hàng
    fetch(URL + "/product/unpublish/" + productId, requestOptions).then((data) => {
      alert("Public thành công!!");
      window.location.reload();
    });
  };

  //Khai báo modal
  const customStyles = {
    overlay: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      // maxHeight: '100%',
      overflow: "auto",
      height: "100%",
    },
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // const handerUpdate = (productId) => {
  //     window.location = '/api/update/product/' + productId
  // }

  const countryCodes = {};
  const base64flags = {};
  const [rowData, setRowData] = useState([]);

  // never changes, so we can use useMemo
  //rowGroup: true,
  const columnDefs = useMemo(
    () => [
      { field: "_id", enableRowGroup: true, hide: true },
      { field: "product_name", enableRowGroup: true },
      {
        field: "product_thumb",
        enableRowGroup: true,
        // width: 100,
        // minHeight: 200,
        cellRenderer: ImageRenderer,
        cellRendererParams: {
          base64flags: base64flags,
          countryCodes: countryCodes,
        },
      },
      { field: "product_description", enableRowGroup: true },
      { field: "product_price", enableRowGroup: true },
      { field: "product_quantity", enableRowGroup: true, aggFunc: "sum" },
      { field: "product_type", aggFunc: "sum" },
      { field: "createdAt" },
      // { field: 'bronze', aggFunc: 'sum' },
      {
        field: "isPublished",
        enableRowGroup: true,
        cellRendererParams: (params) => <button onClick={() => addToUnPublic(params.rowIndex)}>Add to UnPublic</button>,
      },
    ],
    []
  );

  const addToUnPublic = (rowIndex) => {
    const updatedRowData = [...rowData];
    const rowDataToUpdate = updatedRowData[rowIndex];
    rowDataToUpdate["UnPublic"] = true; // Add the "UnPublic" property with the desired value
    setRowData(updatedRowData);
  };

  // const handleCellClicked = (event) => {
  //     // Do something when a cell is clicked
  //     console.log('Cell clicked:', event);
  // };

  const handleRowClicked = (event) => {
    // Do something when a row is clicked
    console.log("Row clicked:", event);
  };

  // const gridOptions = {
  //     // Other grid options...
  //     onCellClicked: handleCellClicked,
  //     onRowClicked: handleRowClicked,
  // };

  // never changes, so we can use useMemo
  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  );

  // never changes, so we can use useMemo
  const autoGroupColumnDef = useMemo(
    () => ({
      cellRendererParams: {
        suppressCount: true,
        checkbox: true,
      },
      field: "_id",
      width: 300,
      heigth: 100,
    }),
    []
  );

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [apis, setApi] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImg_detail(reader.result);
      setUploadedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // console.log(uploadedImage)

  const onDrop = (acceptedFiles) => {
    console.log({ acceptedFiles });
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileURL = URL.createObjectURL(file);
      console.log(fileURL);

      setUploadedImage(fileURL);
    };

    reader.readAsDataURL(file);
    // console.log(uploadedImage)
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  // const [selectedOption, setSelectedOption] = useState('');

  // const handleChange = (event) => {
  //     setSelectedOption(event.target.value);
  // };

  // const name_local = Cookies.get('name');

  // Khai báo
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  // const uploadImage = async () => {
  //     try {
  //         const response = await fetch(uploadedImage);
  //         const blob = await response.blob();
  //         const filename = uploadedImage ? uploadedImage.substring(uploadedImage.lastIndexOf('/') + 1) : '';
  //         const storageRef = firebase.storage().ref().child(`photo/${filename}`);

  //         const uploadTaskSnapshot = await storageRef.put(blob);
  //         const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

  //         return downloadURL;
  //     } catch (error) {
  //         throw error;
  //     }
  // };

  // console.log(img)

  console.log(uploadedImage);

  const [img_test, setImgTest] = useState([]);

  const uploadImage = async () => {
    setIsLoading(true);

    if (uploadedImage != null) {
      const CLOUD_NAME = "dvqmndx5j";
      const PRESET_NAME = "upload";
      const FOLDER_NAME = "banhang";
      const url = [];
      const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

      const formData = new FormData();
      formData.append("upload_preset", PRESET_NAME);
      formData.append("folder", FOLDER_NAME);

      formData.append("file", uploadedImage);

      const res = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.secure_url;
    }
  };

  const handerSubmit = async () => {
    if (
      name !== "" &&
      price !== "" &&
      description !== "" &&
      selectedOption !== "" &&
      quantity !== "" &&
      uploadedImage !== "" &&
      color !== "" &&
      size !== ""
    ) {
      try {
        // Call the uploadImage function and get the image URL
        const imgages = await uploadImage();

        const token = Cookies.get("accessToken");
        const id = Cookies.get("id");
        const cleanedJwtString = token.replace(/^"|"$/g, "");
        const cleanId = id.replace(/^"|"$/g, "");

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_API_KEY,
            authorization: cleanedJwtString,
            "x-client-id": cleanId,
          },
          body: JSON.stringify({
            product_name: name,
            product_price: Number(price),
            product_description: description,
            product_type: selectedOption,
            product_quantity: Number(quantity),
            product_thumb: imgages,
            product_attributes: {
              manufacturer: "quy",
              color: color,
              size: size,
            },
          }),
        };

        fetch(URL + "/product", requestOptions)
          .then(() => {
            setIsLoading(false);
            window.location = "/api/select/product";
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Bạn phải nhập đầy đủ!!!");
    }
  };

  //xử lý bật tắt sự kiện update
  const [isloadupdate, setIsloadupdate] = useState(false);

  const handerSua = () => {
    setIsloadupdate(!isloadupdate);
  };

  function ImageRenderer(props) {
    return (
      <React.Fragment>
        <img
          style={{
            maxHeight: "200%",
            maxWidth: "200%",
          }}
          alt={props.country}
          src={props.value}
        />
      </React.Fragment>
    );
  }

  //xử lý click từng ô

  const [modalIsOpen_detail, setIsOpen_detail] = React.useState(false);

  // function openModal() {
  //     setIsOpen_detail(true);
  // }

  function closeModal_detail() {
    setIsOpen_detail(false);
  }

  const [details, setDetail] = useState([]);
  // Khai báo
  const [img_detail, setImg_detail] = useState("");
  const [id_detail, setId_detail] = useState("");

  const [name_detail, setName_detail] = useState("");
  const [price_detail, setPrice_detail] = useState("");
  const [description_detail, setDescription_detail] = useState("");
  const [type_detail, setType_detail] = useState("");
  const [quantity_detail, setQuantity_detail] = useState("");
  const [color_detail, setColor_detail] = useState("");
  const [size_detail, setSize_detail] = useState("");

  function handleCellClicked(event) {
    if (isloadupdate == true) {
      console.log(event.data);
      setId_detail(event.data._id);
      setName_detail(event.data.product_name);
      setImg_detail(event.data.product_thumb);
      setPrice_detail(event.data.product_price);
      setDescription_detail(event.data.product_description);
      setType_detail(event.data.product_type);
      setQuantity_detail(event.data.product_quantity);

      if (event.data) {
        setColor_detail(event.data.product_attributes.color);
        setSize_detail(event.data.product_attributes.size);
      }

      setDetail([event.data]);
      setIsOpen_detail(true);
    }
  }

  const [selectedOption1, setSelectedOption1] = useState("");

  const handleChange1 = (event) => {
    console.log(event.target.value);
    setSelectedOption1(event.target.value);
  };

  //xử lý update
  const handerUpdate = async (productId) => {
    console.log(productId);
    try {
      const imgages = await uploadImage();

      const token = Cookies.get("accessToken");
      const id = Cookies.get("id");
      const cleanedJwtString = token.replace(/^"|"$/g, "");
      const cleanId = id.replace(/^"|"$/g, "");

      console.log(process.env.REACT_APP_API_KEY);
      console.log(cleanedJwtString);
      console.log(cleanId);
      // console.log(imgages)

      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_API_KEY,
          authorization: cleanedJwtString,
          "x-client-id": cleanId,
        },
        body: JSON.stringify({
          product_name: name_detail,
          product_price: Number(price_detail),
          product_description: description_detail,
          product_type: selectedOption1 || type_detail,
          product_quantity: Number(quantity_detail),
          product_thumb: imgages || img_detail,
          product_attributes: {
            manufacturer: "quy",
            color: color_detail,
            size: size_detail,
          },
        }),
      };

      const response = await fetch(URL + "/product/" + productId, requestOptions);

      console.log(requestOptions);

      console.log(requestOptions);
      if (response.ok) {
        setIsLoading(false);
        window.location = "/api/select/product";
      } else {
        throw new Error("Request failed with status code " + response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("container")}>
      <div>
        <div className={cx("header")}>
          <Link to={"/login"}>
            <div
              className={cx("login")}
              style={{
                color: "black",
              }}
            >
              {name_local}
            </div>
          </Link>
        </div>
        <div
          className={cx("left")}
          style={{
            position: "fixed",
            overflow: "scroll",
            height: 800,
          }}
        >
          <Left_Admin />
        </div>
      </div>
      {isLoading == true ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            zIndex: 100,
          }}
        >
          <div>
            <ClimbingBoxLoader color="#36d7b7" />
          </div>
        </div>
      ) : null}

      <div className="ag-theme-alpine">
        <AgGridReact
          animateRows={true}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          rowGroupPanelShow="always"
          enableRangeSelection={true}
          rowData={apipublic}
          rowSelection="multiple"
          groupSelectsChildren={true}
          suppressRowClickSelection={true}
          getRowHeight={() => 100}
          modules={[ClientSideRowModelModule, RangeSelectionModule, RowGroupingModule, RichSelectModule]}
          onCellClicked={handleCellClicked}
        />
      </div>
    </div>
  );
}

export default Index;
