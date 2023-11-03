import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import { CSSTransition } from 'react-transition-group';
import { Table } from 'evergreen-ui';
import { Left_Admin } from '../../../../Components';
const cx = classNames.bind(styles);
function ListKhachHang() {
    const URL = process.env.REACT_APP_URL;

    const [apiUsers, setApiUser] = useState([]);
    const [apiProduct, setApiProduct] = useState([]);
    const [apis, setApis] = useState([]);

    useEffect(() => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token.replace(/^"|"$/g, '');
        const cleanId = id.replace(/^"|"$/g, '');

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
        fetch(URL + '/transaction/shopId/' + cleanId, requestOptions)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setApis(res.metadata);
                setApiUser(res.metadata);
                // setApiProduct(res.metadata.transaction_products[0])
            });
    }, []);

    console.log(apiUsers);

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

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handerChiTiet = (index) => {
        openModal();
        setApiProduct([apis[index].transaction_products[0]]);
    };

    console.log(apis);

    const [visible, setVisible] = useState(false);

    const handleToggle = () => {
        setVisible(!visible);
    };

    return (
        <div className={cx('container')}>
            <div>
                <div className={cx('header')}>
                    <Link to={'/login'}>
                        <div className={cx('login')}>{/* {name_local} */}</div>
                    </Link>
                </div>
                <div className={cx('left')}>
                    <Left_Admin />
                </div>
            </div>
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
                                Thông tin đơn hàng
                            </div>
                        </div>
                        <div
                            className={cx('table')}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: '100px',
                            }}
                        >
                            <table
                                style={{
                                    width: '90%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <tr
                                    style={{
                                        justifyItems: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        fontSize: 20,
                                        marginBottom: 20,
                                        marginTop: 20,
                                    }}
                                >
                                    <td>Ảnh</td>

                                    <td>Name</td>
                                    <td>Price</td>
                                    <td>Quantity</td>
                                    <td>Total</td>
                                </tr>

                                {apiProduct.map((api) => (
                                    <tr
                                        key={api._id}
                                        style={{
                                            justifyItems: 'center',
                                            alignItems: 'center',
                                            fontSize: 20,
                                        }}
                                    >
                                        <td
                                            style={{
                                                marginTop: 20,
                                            }}
                                        >
                                            <img
                                                src={api.product_thumb}
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                }}
                                            />
                                        </td>

                                        <td>{api.product_name}</td>

                                        <td>$ {api.product_price}</td>

                                        <td>{api.quantity}</td>
                                        <td
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginLeft: 40,
                                            }}
                                        >
                                            ${api.quantity * api.product_price}
                                            {/* <faInstagram /> */}
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Nội Dung */}
            <div
                style={{
                    marginTop: 100,
                }}
            >
                <div
                    className={cx('table')}
                    style={{
                        marginLeft: '230px',
                    }}
                ></div>
                <Table
                    style={{
                        height: '100%',
                    }}
                >
                    <Table.Head>
                        <Table.SearchHeaderCell />
                        <Table.TextHeaderCell>
                            Số điện thoại
                        </Table.TextHeaderCell>
                        <Table.TextHeaderCell>Địa chỉ</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Trạng thái</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body height={'600px'}>
                        {apiUsers.map((apiUser) => (
                            <Table.Row
                                key={apiUser._id}
                                isSelectable
                                onSelect={() => alert(apiUser._id)}
                            >
                                <Table.TextCell>
                                    {apiUser.transaction_userId[0].name}
                                </Table.TextCell>
                                <Table.TextCell>
                                    {apiUser.transaction_userId[0].number}
                                </Table.TextCell>
                                <Table.TextCell>
                                    {apiUser.transaction_userId[0].adrees}
                                </Table.TextCell>
                                <Table.TextCell>
                                    {apiUser.status == 'Đang nhận đơn' ? (
                                        <div
                                            style={{
                                                color: 'white',
                                                backgroundColor: 'green',
                                            }}
                                        >
                                            {apiUser.status}
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                color: 'white',
                                                backgroundColor: 'red',
                                            }}
                                        >
                                            {apiUser.status}
                                        </div>
                                    )}
                                </Table.TextCell>

                                {/* <Table.TextCell isNumber>{apiUser.status}</Table.TextCell> */}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}

export default ListKhachHang;
