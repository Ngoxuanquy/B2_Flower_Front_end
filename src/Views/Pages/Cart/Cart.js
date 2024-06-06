import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import {
    Button,
    Form,
    Image,
    Input,
    Steps,
    message,
    Space,
    Checkbox,
    Divider,
    Radio,
    Spin,
    Tooltip,
} from 'antd';
import { Call_Post_Api } from '../../../Components/CallApi/CallApis';
import Cookies from 'js-cookie';
import { DeleteOutlined } from '@ant-design/icons';
import ThemeConText from '../../../config/themeConText';
import { EventRegister } from 'react-event-listeners';

const cx = classNames.bind(styles);

const Cart = () => {
    const { CheckboxGroup } = Checkbox;
    const [theme, ordersLength] = useContext(ThemeConText);
    const [isLoad, setIsLoad] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    const [orders, setOrder] = useState([]);
    const [tong, setTong] = useState(0);
    const [names, setName] = useState('');
    const [emails, setEmails] = useState('');
    const [adrees, setAdrees] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');
    const [value, setValue] = useState(1);
    const [checkedList, setCheckedList] = useState([]);
    const [current, setCurrent] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const checkAll = orders.length === checkedList.length;
    const indeterminate =
        checkedList.length > 0 && checkedList.length < orders.length;

    const toggleCheckbox = (value) => {
        const newCheckedList = checkedList.includes(value)
            ? checkedList.filter((item) => item !== value)
            : [...checkedList, value];
        setCheckedList(newCheckedList);
    };

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? orders : []);
    };

    const getApi = () => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/"/g, '');
        const cleanId = id?.replace(/"/g, '');

        if (cleanedJwtString) {
            Call_Post_Api(
                { userId: cleanId },
                cleanedJwtString,
                cleanId,
                '/cart/getlistCart',
            )
                .then((data) => {
                    setOrder(data?.metadata?.cart_products || []);
                    EventRegister.emit(
                        'chaneLength',
                        data.metadata.cart_products.length,
                    );
                    setIsLoad(false);
                })
                .catch((err) => {
                    console.log({ err });
                    setIsLoad(false);
                });
        } else {
            setIsLoad(false);
            messageApi.open({
                type: 'warning',
                content: 'Vui lòng đăng nhập để xem giỏ hàng!!',
            });
        }
    };

    useEffect(() => {
        getApi();
    }, []);

    const handlerDelete = (productId) => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/"/g, '');
        const cleanId = id?.replace(/"/g, '');

        Call_Post_Api(
            {
                userId: cleanId,
                productId,
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

    const handlerDatHang = () => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/"/g, '');
        const cleanId = id?.replace(/"/g, '');

        // if (checkedList.length === 0) {
        //     messageApi.open({
        //         type: 'warning',
        //         content: 'Vui lòng chọn sản phẩm !!!',
        //     });
        //     return;
        // }

        // if (!names || !phone || !adrees) {
        //     alert('Vui lòng nhập đầy đủ thông tin!!!');
        //     return;
        // }

        // const user = {
        //     userId: cleanId,
        //     name: names,
        //     email: emails,
        //     number: phone,
        //     adrees: adrees,
        //     note: note,
        // };

        // if (value === 2) {
        //     Call_Post_Api(
        //         { user, product: checkedList, shopId: 'test' },
        //         cleanedJwtString,
        //         cleanId,
        //         '/transaction',
        //     ).then(() => {
        //         Call_Post_Api(
        //             { userId: cleanId, newCartData: checkedList },
        //             cleanedJwtString,
        //             cleanId,
        //             '/cart/updateTransaciton',
        //         ).then(() => {
        //             setIsLoad(false);
        //             getApi();
        //             messageApi.open({
        //                 type: 'success',
        //                 content: 'Đặt hàng thành công!!!',
        //             });
        //         });
        //     });
        // } else {
        //     Call_Post_Api(
        //         {
        //             user,
        //             product: checkedList,
        //             shopId: 'test',
        //             amount: tong,
        //         },
        //         null,
        //         null,
        //         '/vnpay/create-payment-link',
        //     ).then((data) => {
        //         window.location.replace(data);
        //     });
        // }
    };

    const GetHtmlCart = () => {
        return (
            <div>
                <div className={cx('box')}>
                    {orders.length ? (
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <Checkbox
                                            indeterminate={indeterminate}
                                            onChange={onCheckAllChange}
                                            checked={checkAll}
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
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={order._id}>
                                        <td>
                                            <Checkbox
                                                checked={checkedList.includes(
                                                    order,
                                                )}
                                                onChange={() =>
                                                    toggleCheckbox(order)
                                                }
                                            />
                                        </td>
                                        <td className={cx('STT')}>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <Image
                                                src={order.product_thumb}
                                                className={cx('Image')}
                                            />
                                            <div>{order.product_name}</div>
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
                            </tbody>
                        </table>
                    ) : (
                        <h2 style={{ color: 'pink' }}>Chưa có sản phẩm nào</h2>
                    )}
                </div>
            </div>
        );
    };

    const GetHtmlAddress = () => {
        return (
            <div className={cx('box')}>
                <div className={cx('Vanchuyen')}>
                    <div className={cx('address')}>
                        <h2 className={cx('title-address')}>
                            Thông tin tài khoản
                        </h2>
                        <div>
                            <span
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                Họ tên:{' '}
                            </span>
                            <span>Quy</span>
                        </div>
                        <div>
                            <span
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                Số điện thoại:{' '}
                            </span>
                            <span> 0332062668</span>
                        </div>
                        <div>Địa chỉ nhận hàng</div>
                        <div>
                            số nhà 90, đường Phạm Nguyễn Du, Thị Xã Cửa Lò, Tỉnh
                            Nghệ An
                        </div>
                    </div>
                    <div className={cx('conten-vanchuyen')}>
                        <h2>Hình thức giao hàng</h2>
                        <div className={cx('box')}>
                            <div
                                className={cx('box1')}
                                onClick={() => handleOptionChange('fast')}
                            >
                                <div className={cx('radio-label')}>
                                    <input
                                        type="radio"
                                        name="deliveryOption"
                                        checked={selectedOption === 'fast'}
                                        onChange={() => {}}
                                    />
                                    <span>Giao hàng nhanh</span>
                                </div>
                                <div className={cx('description')}>
                                    <div>
                                        Giao hàng muộn nhất là 17h ngày hôm sau
                                    </div>
                                    <iframe src="https://lottie.host/embed/02d37c44-2fd8-4b50-872a-ef3d9974337d/cVZ6Y7ns0O.json"></iframe>
                                </div>
                            </div>
                            <div
                                className={cx('box1')}
                                onClick={() => handleOptionChange('slow')}
                            >
                                <div className={cx('radio-label')}>
                                    <input
                                        type="radio"
                                        name="deliveryOption"
                                        checked={selectedOption === 'slow'}
                                        onChange={() => {}}
                                    />
                                    <span>Giao hàng chậm</span>
                                </div>
                                <div className={cx('description')}>
                                    <div>
                                        Khi nào có hàng thì chúng tôi chịu
                                    </div>
                                    <iframe src="https://lottie.host/embed/51f5b5f3-1dd7-49ea-a970-30e9099cfa5c/wYp9X23fPi.json"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('conten-thanhtoan')}>
                        <h2>Thanh toán</h2>
                        <div className={cx('phuongthucTT')}>
                            <Radio.Group
                                onChange={onChange}
                                value={value}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                }}
                            >
                                <Radio value={1} style={{ fontSize: '18px' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <img
                                            src="https://lacfarm.netlify.app/assets/vnpay-logo-82927e0d.webp"
                                            style={{
                                                width: '200px',
                                                height: '80px',
                                            }}
                                        />
                                        <div
                                            style={{
                                                fontFamily: 'italic',
                                            }}
                                        >
                                            Thanh toán qua VN pay
                                        </div>
                                    </div>
                                </Radio>
                                <Radio value={2} style={{ fontSize: '18px' }}>
                                    <img
                                        src="https://lacfarm.netlify.app/assets/vnpay-qr-code-cbc23988.png"
                                        style={{
                                            width: '120px',
                                            height: '120px',
                                        }}
                                    />
                                    <div>Thanh toán qua QR code</div>
                                </Radio>
                                <Radio value={3} style={{ fontSize: '18px' }}>
                                    <img
                                        src="https://lacfarm.netlify.app/assets/vnpay-qr-code-cbc23988.png"
                                        style={{
                                            width: '120px',
                                            height: '120px',
                                        }}
                                    />
                                    <div>Thanh toán khi nhận hàng</div>
                                </Radio>
                            </Radio.Group>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const steps = [
        {
            title: 'Giỏ Hàng',
            content: <GetHtmlCart />,
        },
        {
            title: 'Thanh Toán',
            content: <GetHtmlAddress />,
        },
        {
            title: 'Thanh toán hoàn tất',
            content: 'Last-content',
        },
    ];

    useEffect(() => {
        const total = checkedList.reduce(
            (acc, current) => acc + current.product_price * current.quantity,
            0,
        );
        setTong(total);
    }, [checkedList]);

    const next = () => {
        console.log('ahshsh');
        setCurrent(current + 1);
    };
    const prev = () => setCurrent(current - 1);

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: theme.colorTextTertiary,
        backgroundColor: theme.colorFillAlter,
        borderRadius: theme.borderRadiusLG,
        border: `1px dashed ${theme.colorBorder}`,
        marginTop: 16,
    };

    return (
        <div className={cx('container_')}>
            <div className={cx('box-class')}>
                <div className={cx('box-steps')}>
                    <Steps
                        current={current}
                        items={items}
                        className={cx('box')}
                    />
                    <div style={contentStyle}>{steps[current].content}</div>
                    <div style={{ marginTop: 24 }}>
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={next}>
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button
                                type="primary"
                                onClick={() =>
                                    message.success('Processing complete!')
                                }
                            >
                                Done
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={prev}>
                                Previous
                            </Button>
                        )}
                    </div>
                </div>
                <div className={cx('TongTien')}>
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
                            <button className={cx('button')}>Áp dụng</button>
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
                        {current < steps.length - 1 && (
                            // <button
                            //     onClick={() => next()}
                            //     disabled={checkedList.length === 0}
                            //     className={cx(
                            //         checkedList.length === 0
                            //             ? 'disabled-button'
                            //             : '',
                            //     )}
                            // >
                            //     Đặt hàng
                            // </button>

                            <Tooltip
                                title={
                                    checkedList.length === 0
                                        ? 'Vui lòng chọn sản phẩm'
                                        : 'Click me'
                                }
                            >
                                <Button
                                    type="primary"
                                    disabled={
                                        (current === 0 &&
                                            checkedList.length === 0) ||
                                        (current === 1 &&
                                            checkedList.length !== 0)
                                    }
                                    onClick={() => next()}
                                    className={cx(
                                        (current === 0 &&
                                            checkedList.length === 0) ||
                                            (current === 1 &&
                                                checkedList.length !== 0)
                                            ? 'disabled-button'
                                            : '',
                                    )}
                                >
                                    Next {current}
                                </Button>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </div>
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
                        left: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Spin />
                </div>
            )}
            <div className="container">
                <div className={cx('box-layout')}>
                    <div className={cx('layout')}></div>
                    <div className={cx('layout-thanhtoan')}></div>
                </div>
            </div>
            <div className={cx('buttom_dathang')}>
                <div>
                    <Checkbox
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                    >
                        Check all
                    </Checkbox>
                    <div style={{ fontSize: '14px' }}>
                        Tổng thanh toán: đ{tong}
                    </div>
                    <div
                        style={{
                            backgroundColor: 'coral',
                            textAlign: 'center',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                        onClick={handlerDatHang}
                    >
                        Mua hàng
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
