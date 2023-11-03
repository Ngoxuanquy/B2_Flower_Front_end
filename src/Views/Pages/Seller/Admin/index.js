import React, { useEffect, useState, useRef } from 'react';

import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBagShopping,
    faBars,
    faChevronDown,
    faEnvelope,
    faCalendar,
    faComment,
    faSeedling,
} from '@fortawesome/free-solid-svg-icons';
import { ClimbingBoxLoader } from 'react-spinners';
import { Left_Admin } from '../../../../Components';

const cx = classNames.bind(styles);

function Index() {
    const URL = process.env.REACT_APP_URL;

    const [apis, setApi] = useState([]);

    //loading
    const [isLoading, setIsLoading] = useState(false);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpen2, setIsOpen2] = React.useState(false);

    let subtitle;
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    let subtitle2;
    function afterOpenModal2() {
        // references are now sync'd and can be accessed.
        subtitle2.style.color = '#f00';
    }

    function closeModal2() {
        setIsOpen2(false);
    }

    //Khai báo modal
    const customStyles = {
        overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            // maxHeight: '100%',
            overflow: 'auto',
            height: '100%',
        },
    };

    //Khai báo modal
    const customStyles2 = {
        overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        },
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            // maxHeight: '100%',
            overflow: 'auto',
            height: '100%',
        },
    };

    useEffect(() => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.REACT_APP_API_KEY,
                authorization: cleanedJwtString,
                'x-client-id': cleanId,
            },
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/users/userId/' + cleanId, requestOptions)
            .then((res) => res.json())
            .then((res) => {
                setApi(res.metadata);
            });
    }, []);

    const handerBat = (userId) => {
        console.log(userId);

        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.REACT_APP_API_KEY,
                authorization: cleanedJwtString,
                'x-client-id': cleanId,
            },
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + `/users/update/` + userId, requestOptions).then(() => {
            window.location = '/api/admin';
        });
    };

    const handerTat = (userId) => {
        console.log(userId);

        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.REACT_APP_API_KEY,
                authorization: cleanedJwtString,
                'x-client-id': cleanId,
            },
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + `/users/updateUn/` + userId, requestOptions).then(() => {
            window.location = '/api/admin';
        });
    };

    //Lấy Ra dữ liệu khi nhấn vào từng user
    const [apiuserByIds, setApiUserBtId] = useState([]);

    const userById = (userId) => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');

        const requestOptions = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.REACT_APP_API_KEY,
                authorization: cleanedJwtString,
                'x-client-id': cleanId,
            },
        };

        // Lấy dữ liệu của khách hàng
        fetch(URL + '/transaction/shopId/' + userId, requestOptions)
            .then((res) => res.json())
            .then((res) => {
                setApiUserBtId(res?.metadata);
                setIsLoading(false);
            });
    };

    console.log(apiuserByIds);

    function openModal(userId) {
        setIsLoading(true);
        userById(userId);
        setIsOpen(true);
    }

    function openModal2(userId) {
        setIsOpen2(true);
    }

    //XỬ lý chi tiết đơn hàng
    const [apiChiTiets, setApiChiTiet] = useState([]);
    const [apiChiTietProduct, setApiChiTietProduct] = useState([]);

    const handerChiTiet = (index) => {
        console.log(index);
        openModal2();
        setApiChiTiet([apiuserByIds[index]]);
        setApiChiTietProduct([apiuserByIds[index]][0].transaction_products);
    };

    console.log({ apis });

    return (
        <div className={cx('container')}>
            <div>
                <div className={cx('header')}>
                    <Link to={'/login'}>
                        <div className={cx('login')}>Login</div>
                    </Link>
                </div>
                <div className={cx('left')}>
                    <Left_Admin />
                </div>
            </div>
            {isLoading == true ? (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        zIndex: 100,
                    }}
                >
                    <div>
                        <ClimbingBoxLoader color="#36d7b7" />
                    </div>
                </div>
            ) : null}
            <Modal
                isOpen={modalIsOpen2}
                onAfterOpen={afterOpenModal2}
                onRequestClose={closeModal2}
                style={customStyles2}
                contentLabel="Example Modal"
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: 23,
                            marginBottom: 20,
                            fontWeight: 700,
                        }}
                    >
                        <div>Thông tin đơn hàng</div>
                    </div>
                </div>
                <div
                    style={{
                        textAlign: 'left',
                        justifyContent: 'flex-start',
                        fontSize: 18,
                    }}
                >
                    {apiChiTiets?.map((apiChiTiet) => (
                        <div
                            style={{
                                lineHeight: 2,
                            }}
                        >
                            <div>
                                Tên người mua:{' '}
                                {apiChiTiet
                                    ? apiChiTiet.transaction_userId[0].name
                                    : ''}
                            </div>
                            <div>
                                Số điện thoại:{' '}
                                {apiChiTiet
                                    ? apiChiTiet.transaction_userId[0].number
                                    : ''}
                            </div>
                            <div>
                                Địa chỉ:{' '}
                                {apiChiTiet
                                    ? apiChiTiet.transaction_userId[0].adrees
                                    : ''}
                            </div>
                            <div>
                                Ngày Mua:{' '}
                                {apiChiTiet ? apiChiTiet.createdOn : ''}
                            </div>

                            <div
                                style={{
                                    fontSize: 20,
                                    fontWeight: 600,
                                    marginLeft: 20,
                                }}
                            >
                                Thông tin mua hàng :
                            </div>
                            <table
                                style={{
                                    width: '90%',
                                    justifyContent: 'center',
                                    alignItems: 'left',
                                }}
                            >
                                <tr
                                    style={{
                                        justifyItems: 'center',
                                        alignItems: 'left',
                                        width: '100%',
                                        fontSize: 20,
                                        marginBottom: 20,
                                        marginTop: 20,
                                    }}
                                >
                                    <td>Tên SP</td>

                                    <td>Ảnh</td>
                                    <td>Giá</td>

                                    <td>Số Lượng</td>
                                    <td>#</td>
                                </tr>
                                {apiChiTietProduct?.map((apiChiTietProduc) => (
                                    <tr
                                        style={{
                                            justifyItems: 'center',
                                            alignItems: 'left',
                                            fontSize: 20,
                                        }}
                                    >
                                        <td
                                            style={{
                                                marginTop: 20,
                                            }}
                                        >
                                            {apiChiTietProduc.product_name}
                                        </td>

                                        <td>
                                            <img
                                                src={
                                                    apiChiTietProduc.product_thumb
                                                }
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                }}
                                            />
                                        </td>

                                        <td>
                                            {apiChiTietProduc.product_price}
                                        </td>

                                        <td>{apiChiTietProduc.quantity}</td>
                                        <td>
                                            <FontAwesomeIcon
                                                icon={faSeedling}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    ))}
                </div>
            </Modal>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div
                    style={{
                        width: '100%',
                    }}
                >
                    <div>
                        <div>
                            <div
                                style={{
                                    fontSize: 25,
                                    fontWeight: 500,
                                    margin: '20px 0px',
                                }}
                            >
                                Thông tin đơn hàng của từng người
                            </div>
                        </div>
                        <div
                            className={cx('table')}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: '-10px',
                            }}
                        >
                            <table
                                style={{
                                    width: '90%',
                                    justifyContent: 'center',
                                    alignItems: 'left',
                                }}
                            >
                                <tr
                                    style={{
                                        justifyItems: 'center',
                                        alignItems: 'left',
                                        width: '100%',
                                        fontSize: 20,
                                        marginBottom: 20,
                                        marginTop: 20,
                                    }}
                                >
                                    <td>Tên Người</td>

                                    <td>Số điện thoại</td>
                                    <td>Địa chỉ</td>

                                    <td>Ngày</td>
                                    <td>#</td>
                                </tr>
                                {apiuserByIds?.map((apiuserById, index) => (
                                    <tr
                                        style={{
                                            justifyItems: 'center',
                                            alignItems: 'left',
                                            fontSize: 20,
                                        }}
                                    >
                                        <td
                                            style={{
                                                marginTop: 20,
                                            }}
                                        >
                                            {
                                                apiuserById
                                                    .transaction_userId[0].name
                                            }
                                        </td>

                                        <td>
                                            {
                                                apiuserById
                                                    .transaction_userId[0]
                                                    .number
                                            }
                                        </td>

                                        <td>
                                            {
                                                apiuserById
                                                    .transaction_userId[0]
                                                    .adrees
                                            }
                                        </td>

                                        <td>{apiuserById.createdOn}</td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    handerChiTiet(index)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSeedling}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className={cx('rigth')}>
                <div className={cx('title')}>
                    <div
                        style={{
                            fontSize: '24px',
                            color: 'green',
                            padding: '10px',
                        }}
                    >
                        Những Người Đã Đk
                    </div>
                    <div
                        style={{
                            // width: "1000px"
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <table
                            class="table"
                            style={{
                                width: '100%',
                            }}
                        >
                            <thead
                                style={{
                                    fontSize: '20px',
                                }}
                            >
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Mật Khẩu</th>
                                    <th scope="col">Trạng Thái</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            {apis?.map((api, index) => (
                                <tbody
                                    onClick={() => openModal(api._id)}
                                    key={index}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '20px',
                                        width: '100%',
                                    }}
                                >
                                    <tr
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontSize: '20px',
                                            width: '100%',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <th scope="row">{index + 1}</th>
                                        <td>{api.email}</td>
                                        <td>{api.password}</td>
                                        <td>
                                            {api.status == 'active' ? (
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            'green',
                                                        color: 'white',
                                                        padding: 2,
                                                        opacity: 0.7,
                                                    }}
                                                >
                                                    Hoạt động
                                                </div>
                                            ) : (
                                                <div
                                                    style={{
                                                        backgroundColor: 'red',
                                                        color: 'white',
                                                        padding: 2,
                                                        opacity: 0.7,
                                                    }}
                                                >
                                                    Tắt
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {api.status == 'active' ? (
                                                <div
                                                    style={{
                                                        backgroundColor: 'red',
                                                        color: 'white',
                                                        padding: 2,
                                                        opacity: 0.7,
                                                    }}
                                                >
                                                    <button
                                                        style={{
                                                            backgroundColor:
                                                                'red',
                                                            color: 'white',
                                                        }}
                                                        onClick={() =>
                                                            handerTat(api._id)
                                                        }
                                                    >
                                                        Tắt
                                                    </button>
                                                </div>
                                            ) : (
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            'green',
                                                        color: 'white',
                                                        padding: 2,
                                                        opacity: 0.7,
                                                    }}
                                                >
                                                    <button
                                                        style={{
                                                            backgroundColor:
                                                                'green',
                                                            color: 'white',
                                                        }}
                                                        onClick={() =>
                                                            handerBat(api._id)
                                                        }
                                                    >
                                                        Bật
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
