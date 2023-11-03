import React, { useEffect, useState, useRef } from 'react';
import Left from '../../../../Components/Left/index';

import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function Index() {
    const { productId } = useParams();
    const [uploadedImage, setUploadedImage] = useState(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            setUploadedImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const name_local = Cookies.get('name');

    //khai báo biến
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');

    const [apis, setApis] = useState([]);

    const URL = process.env.REACT_APP_URL;

    useEffect(() => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token.replace(/^"|"$/g, '');
        const cleanId = id.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.REACT_APP_API_KEY,
                authorization: cleanedJwtString,
                'x-client-id': cleanId,
            },
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/product/byId/' + productId, requestOptions)
            .then((data) => {
                console.log(requestOptions);
                return data.json();
            })
            .then((data) => {
                console.log(data);
                setApis([data.metadata]);
            });
    }, [productId]);

    console.log(apis);

    const handerSubmit = () => {};

    return (
        <div className={cx('container')}>
            <div>
                <div className={cx('header')}>
                    <Link to={'/login'}>
                        <div className={cx('login')}>{name_local}</div>
                    </Link>
                </div>
                <div className={cx('left')}>
                    <Left />
                </div>
            </div>

            <div className={cx('rigth')}>
                <div
                    style={{
                        fontSize: 18,
                    }}
                >
                    Sản Phẩm
                </div>
                {apis &&
                    apis.map((api) => (
                        <div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 16,
                                    }}
                                >
                                    Tên Sản Phẩm
                                </div>
                                <input
                                    style={{
                                        width: 300,
                                        height: 30,
                                        marginLeft: 20,
                                        fontSize: 16,
                                        paddingLeft: 10,
                                    }}
                                    value={api.product_name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 16,
                                    }}
                                >
                                    Giá
                                </div>
                                <input
                                    style={{
                                        width: 300,
                                        height: 30,
                                        marginLeft: 20,
                                        fontSize: 16,
                                        paddingLeft: 10,
                                    }}
                                    value={api.product_price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 16,
                                    }}
                                >
                                    Hình Ảnh
                                </div>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>
                                        Thả file ảnh vào đây hoặc nhấp để chọn
                                        file
                                    </p>
                                </div>
                                {uploadedImage && (
                                    <img
                                        src={uploadedImage}
                                        alt="Uploaded"
                                        style={{
                                            width: 300,
                                            height: 300,
                                        }}
                                    />
                                )}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 16,
                                    }}
                                >
                                    Ghi Chú
                                </div>
                                <input
                                    style={{
                                        width: 300,
                                        height: 30,
                                        marginLeft: 20,
                                        fontSize: 16,
                                        paddingLeft: 10,
                                    }}
                                    value={api.product_description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                            (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    fontSize: 18,
                                }}
                            >
                                <div>Thể Loại</div>
                                <select
                                    value={selectedOption}
                                    onChange={handleChange}
                                >
                                    <option value="">{api.product_type}</option>
                                    <option value="Electronics">
                                        Giày Thể Thao
                                    </option>
                                    <option value="Electronics">
                                        Giày Đi Bộ
                                    </option>
                                    <option value="Electronics">
                                        Giày Đị Chơi
                                    </option>
                                </select>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 16,
                                    }}
                                >
                                    Size
                                </div>
                                <input
                                    style={{
                                        width: 300,
                                        height: 30,
                                        marginLeft: 20,
                                        fontSize: 16,
                                        paddingLeft: 10,
                                    }}
                                    value={api.product_attributes.size}
                                    onChange={(e) => setSize(e.target.value)}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 16,
                                    }}
                                >
                                    Màu
                                </div>
                                <input
                                    style={{
                                        width: 300,
                                        height: 30,
                                        marginLeft: 20,
                                        fontSize: 16,
                                        paddingLeft: 10,
                                    }}
                                    value={api.product_attributes.colol}
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 16,
                                    }}
                                >
                                    Số Lượng Trong Kho
                                </div>
                                <input
                                    style={{
                                        width: 300,
                                        height: 30,
                                        marginLeft: 20,
                                        fontSize: 16,
                                        paddingLeft: 10,
                                    }}
                                    value={api.product_quantity}
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    ))}
                <div
                    style={{
                        marginLeft: 20,
                        padding: 10,
                    }}
                >
                    <div>
                        <button
                            style={{
                                padding: 5,
                                fontSize: 18,
                            }}
                            onClick={() => handerSubmit()}
                        >
                            Xác Nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
