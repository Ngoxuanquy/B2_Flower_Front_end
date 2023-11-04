import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { Button, Form, Image, Input } from 'antd';
import { Call_Post_Api } from '../../../Components/CallApi/CallApis';
import Cookies from 'js-cookie';
import { DeleteOutlined } from '@ant-design/icons';

import CheckGroup from '../../../Components/CheckGroup/CheckGroup';
import { Checkbox, Divider } from 'antd';
import { Radio } from 'antd';
import { message, Space } from 'antd';
import ThemeConText from '../../../config/themeConText';
import { EventRegister } from 'react-event-listeners';
import { Spin } from 'antd';

const cx = classNames.bind(styles);

const Cart = () => {
    const CheckboxGroup = Checkbox.Group;
    const [theme, ordersLength] = useContext(ThemeConText);
    const [isLoad, setIsLoad] = useState(true);

    const [messageApi, contextHolder] = message.useMessage();

    const [isload, setIsLoading] = useState(false);
    //khai báo api cart
    const [orders, setOrder] = useState([]);
    const [tong, setTong] = useState(0);

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const getApi = () => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/"/g, '');
        const cleanId = id?.replace(/"/g, '');
        Call_Post_Api(
            {
                userId: id,
            },
            cleanedJwtString,
            cleanId,
            '/cart/getlistCart',
        )
            .then((data) => {
                setIsLoad(false);
                if (data && data.metadata && data.metadata.cart_products) {
                    setOrder(data.metadata.cart_products);
                    // EventRegister.emit(
                    //     'chaneLength',
                    //     data.metadata.cart_products.length,
                    // );
                } else {
                    setOrder([]);
                }
            })
            .catch((err) => console.log({ err }));
    };

    useEffect(() => {
        getApi();
    }, []);

    //xử lý xóa
    const handlerDelete = (procutId) => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/"/g, '');
        const cleanId = id?.replace(/"/g, '');

        Call_Post_Api(
            {
                userId: cleanId,
                productId: procutId,
            },
            cleanedJwtString,
            cleanId,
            '/cart/delete',
        ).then(() => {
            getApi();
            EventRegister.emit('chaneLength', ordersLength - 1);

            messageApi.open({
                type: 'success',
                content: 'Xóa thành công!!',
            });
        });
    };

    //khai báo biến
    const [names, setName] = useState('');
    const [emails, setEmails] = useState('');
    const [adrees, setAdrees] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');
    const [value, setValue] = useState(1);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const [checkedList, setCheckedList] = useState(orders);

    const checkAll = orders.length === checkedList.length;
    const indeterminate =
        checkedList.length > 0 && checkedList.length < orders.length;

    const toggleCheckbox = (value) => {
        const currentIndex = checkedList.indexOf(value);
        const newCheckedList = [...checkedList];

        if (currentIndex === -1) {
            newCheckedList.push(value);
        } else {
            newCheckedList.splice(currentIndex, 1);
        }

        setCheckedList(newCheckedList);
    };

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? orders : []);
    };

    console.log(checkedList);

    //xử lý đặt hàng
    const handlerDatHang = () => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/"/g, '');
        const cleanId = id?.replace(/"/g, '');
        if (checkedList.length != 0) {
            if (names != '' && phone != '' && adrees != '') {
                const token = Cookies.get('accessToken');
                const id = Cookies.get('id');
                const cleanedJwtString = token?.replace(/^"|"$/g, '');
                const cleanId = id?.replace(/^"|"$/g, '');

                const user = {
                    userId: cleanId,
                    name: names,
                    email: emails,
                    number: phone,
                    adrees: adrees,
                    note: note,
                };
                if (value == 2) {
                    Call_Post_Api(
                        {
                            user: user,
                            product: checkedList,
                            shopId: 'test',
                        },
                        cleanedJwtString,
                        cleanId,
                        '/transaction',
                    ).then((res) => {
                        Call_Post_Api(
                            {
                                userId: cleanId,
                                newCartData: checkedList,
                            },
                            cleanedJwtString,
                            cleanId,
                            '/cart/updateTransaciton',
                        ).then(() => {
                            setIsLoading(false);
                            getApi();
                            messageApi.open({
                                type: 'success',
                                content: 'Đặt hàng thành công!!!',
                            });
                        });
                    });
                } else {
                    Call_Post_Api(
                        {
                            amount: tong,
                            language: 'vn',
                            bankCode: '',
                        },
                        cleanedJwtString,
                        cleanId,
                        '/vnpay/create_payment_url',
                    ).then((data) => {
                        window.open(data.data);
                    });
                }
            } else {
                alert('Vui lòng nhập dduur thông tin!!!');
            }
        } else {
            messageApi.open({
                type: 'warning',
                content: 'Vui lòng chọn sản phẩm !!!',
            });
        }
    };

    //tinhs tieen
    useEffect(() => {
        let total = checkedList?.reduce(
            (acc, current) => acc + current.product_price * current.quantity,
            0, // Giá trị khởi tạo
        );
        setTong(total);
    }, [checkedList]);

    console.log({ tong });

    return (
        <div className={cx('container_')}>
            {contextHolder}
            {isLoad && (
                <div
                    style={{
                        position: 'fixed',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        width: '100%',
                        height: '100vh',
                        zIndex: 100,
                        top: 0,
                        top: 0,
                        left: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Spin />
                </div>
            )}
            <div className="cpntainer">
                <div className={cx('box-layout')}>
                    <div className={cx('layut')}>
                        <div className={cx('box')}>
                            <table
                                class="table table-striped"
                                style={{ margin: '0 auto', width: '100%' }}
                                className={cx('table')}
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <Checkbox
                                                indeterminate={indeterminate}
                                                onChange={onCheckAllChange}
                                                checked={checkAll}
                                                style={{
                                                    color: 'white',
                                                }}
                                            >
                                                All
                                            </Checkbox>
                                        </th>
                                        <th scope="col" className={cx('STT')}>
                                            #
                                        </th>
                                        <th scope="col">Sản phẩm</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Tổng tiền</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>

                                {orders.map((order, index) => (
                                    <tr key={order._id}>
                                        <td>
                                            {/* <Divider /> */}
                                            <Checkbox
                                                key={order}
                                                checked={checkedList.includes(
                                                    order,
                                                )}
                                                onChange={() =>
                                                    toggleCheckbox(order)
                                                }
                                            ></Checkbox>
                                        </td>
                                        <td scope="row" className={cx('STT')}>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {order.product_name}
                                            <Image
                                                src={order.product_thumb}
                                                className={cx('Image')}
                                            />
                                        </td>

                                        <td>{order.quantity}</td>
                                        <td>
                                            {order.quantity *
                                                order.product_price}
                                        </td>
                                        <td>
                                            <DeleteOutlined
                                                onClick={() =>
                                                    handlerDelete(order._id)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>

                    {/* Thanh toán */}
                    <div className={cx('layout-thanhtoan')}>
                        <div className={cx('box')}>
                            <div className={cx('ThongTin')}>
                                <h2>Thông tin cá nhân</h2>
                                <Form
                                    name="basic"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    style={{ maxWidth: 700 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Email"
                                        name="Email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your Email!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Email"
                                            onChange={(e) =>
                                                setEmails(e.target.value)
                                            }
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Họ và tên"
                                        name="Họ và tên"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your Họ và tên!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Họ và tên"
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="Số điện thoại"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input Số điện thoại!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Số điện thoại"
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Địa chỉ"
                                        name="Địa chỉ"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please địa chỉ!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Địa chỉ"
                                            onChange={(e) =>
                                                setAdrees(e.target.value)
                                            }
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Ghi chú"
                                        name="Ghi chú"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input Ghi chú !',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Ghi chú"
                                            onChange={(e) =>
                                                setNote(e.target.value)
                                            }
                                        />
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className={cx('Vanchuyen')}>
                                <div className={cx('conten-vanchuyen')}>
                                    <h1>Vận chuyển</h1>
                                    <p>Vui lòng nhập thông tin giao hàng</p>
                                </div>
                                <div className={cx('conten-thanhtoan')}>
                                    <h3>Thanh toán</h3>
                                    <div className={cx('phươngthucTT')}>
                                        <Radio.Group
                                            onChange={onChange}
                                            value={value}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <Radio
                                                value={1}
                                                style={{
                                                    fontSize: '18px',
                                                }}
                                            >
                                                Thanh toán qua VNPay
                                            </Radio>
                                            <Radio
                                                value={2}
                                                style={{
                                                    fontSize: '18px',
                                                }}
                                            >
                                                Thanh toán khi nhận hàng
                                            </Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('TongTien')}>
                                <div className="">
                                    <div>
                                        <h2>Nhập Mã Giảm Giá</h2>
                                        <div
                                            style={{
                                                display: 'flex',
                                                marginTop: '20px',
                                                marginBottom: '20px',
                                            }}
                                        >
                                            <Input placeholder="Mã giảm giá" />
                                            <button className={cx('button')}>
                                                Áp dụng
                                            </button>
                                        </div>
                                    </div>
                                    <div className={cx('tamtinh')}>
                                        <div>Tạm tính</div>
                                        <div>{tong}</div>
                                    </div>
                                    <div className={cx('vanchuyen')}>
                                        <div>Phí vận chuyển</div>
                                        <div></div>
                                    </div>
                                    <hr />
                                    <div className={cx('tongcong')}>
                                        <div>Tổng cộng</div>
                                        <div>{tong}</div>
                                    </div>
                                    <button onClick={() => handlerDatHang()}>
                                        Đặt hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Đặt hàng */}

            <div className={cx('buttom_dathang')}>
                <div>
                    <div>
                        <Checkbox
                            indeterminate={indeterminate}
                            onChange={onCheckAllChange}
                            checked={checkAll}
                        >
                            Check all
                        </Checkbox>
                    </div>
                    <div
                        style={{
                            fontSize: '14px',
                        }}
                    >
                        Tổng thanh toán: đ{tong}
                    </div>
                    <div
                        style={{
                            backgroundColor: 'coral',
                            textAlign: 'center',
                            color: 'white',
                            fontWeight: 600,
                        }}
                        onClick={() => handlerDatHang()}
                    >
                        Mua hàng
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
