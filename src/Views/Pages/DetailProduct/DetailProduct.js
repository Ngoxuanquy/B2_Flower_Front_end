import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';
import { Button, Image, Input } from 'antd';
import {
    StarOutlined,
    HeartOutlined,
    RiseOutlined,
    FacebookOutlined,
    YoutubeOutlined,
    GooglePlusOutlined,
    LinkedinOutlined,
    AmazonOutlined,
    InstagramOutlined,
} from '@ant-design/icons';
import { Tabs } from 'antd';
import { Sliders } from '../../../Components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';
import { Call_Post_Api } from '../../../Components/CallApi/CallApis';
import { message, Space } from 'antd';
import Cookies from 'js-cookie';
import { toaster } from 'evergreen-ui';
import { EventRegister } from 'react-event-listeners';
import ThemeConText from '../../../config/themeConText';
const cx = classNames.bind(styles);

function DetailProduct() {
    const { productId } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const [products, setProduct] = useState([]);
    const [theme, ordersLength] = useContext(ThemeConText);

    useEffect(() => {
        Call_Post_Api(null, null, null, `/product/byId/${productId}`).then(
            (data) => {
                setProduct(data.metadata);
            },
        );
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const sliders = [
        {
            id: 1,
            img: 'https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg',
        },
        {
            id: 1,
            img: 'https://images.pexels.com/photos/9304329/pexels-photo-9304329.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        },
        {
            id: 1,
            img: 'https://images.pexels.com/photos/3654869/pexels-photo-3654869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        },
    ];
    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: 'DETAILS',
            children: (
                <div
                    style={{
                        fontSize: '17px',
                    }}
                >
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat.'
                    <div
                        style={{
                            marginLeft: '20px',
                            lineHeight: '40px',
                            fontSize: '14px',
                        }}
                    >
                        <li>
                            Any Product types that You want - Simple,
                            Configurable
                        </li>
                        <li>Downloadable/Digital Products, Virtual Products</li>
                        <li>Inventory Management with Backordered items</li>
                    </div>
                    <div>
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Tab 2',
            children:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.2',
        },
        {
            key: '3',
            label: 'Tab 3',
            children:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.3',
        },
    ];

    const [value, setValue] = useState(1);
    const handerCong = () => {
        setValue(value + 1);
    };

    const handerTru = () => {
        if (value <= 1) {
            messageApi.open({
                type: 'warning',
                content: 'Sản phẩm phải lớn hớn 1!!!',
            });
            return (value = 1);
        }

        setValue(value - 1);
    };
    //xuwr lys mua hangf
    const handlerAddCart = (products) => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');

        // if (cleanId == userId) {
        //     alert('Sản Phẩm này của bạn, không mua được')
        // }
        if (!token) {
            alert('Bạn phải đăng nhập để mua hàng!!');
            window.location = '/login';
        } else {
            const cleanedJwtString = token?.replace(/"/g, '');
            const cleanId = id?.replace(/"/g, '');

            Call_Post_Api(
                {
                    userId: cleanId,
                    shopId: '645f78f0ff400061f37e430d',
                    product: { ...products, quantity: value },
                },
                cleanedJwtString,
                cleanId,
                '/cart',
            ).then((data) => {
                EventRegister.emit('chaneLength', ordersLength + 1);

                messageApi.open({
                    type: 'success',
                    content: 'Đặt hàng thành công!!!',
                });
            });
        }
    };

    return (
        <div className={cx('container_')}>
            {contextHolder}
            <div className="container_">
                <div className={cx('box-layout')}>
                    <div className={cx('conten')}>
                        <div className={cx('layout-left')}>
                            <Image src={products.product_thumb} />
                        </div>
                        <div className={cx('layout-right')}>
                            <div>
                                <i className={cx('name-product')}>
                                    {products.product_name}
                                </i>
                                <div className={cx('star')}>
                                    <StarOutlined />
                                    <StarOutlined />
                                    <StarOutlined />
                                    <StarOutlined />
                                    <StarOutlined />
                                    <span>
                                        Be the first to review this product
                                    </span>
                                </div>
                                <hr
                                    style={{
                                        opacity: 0.4,
                                    }}
                                />
                                <div className={cx('price-product')}>
                                    ${products.product_price}
                                </div>
                                <div className={cx('des-product')}>
                                    Pellentesque habitant morbi tristique
                                    senectus et netus et malesuada fames ac
                                    turpis egestas. Vestibulum tortor quam,
                                    feugiat vitae, ultricies eget, tempor sit
                                    amet, ante. Donec eu libero sit amet quam
                                    egestas semper. Aenean ultricies mi vitae
                                    est. Mauris placerat eleifend leo
                                </div>
                                <div className={cx('AVAILABILITY')}>
                                    AVAILABILITY:
                                    <span>IN STOCK</span>
                                </div>
                                <div className={cx('SKU')}>
                                    SKU <span>AS555557</span>
                                </div>
                                <hr
                                    style={{
                                        width: '100%',
                                        opacity: 0.4,
                                        marginTop: '10px',
                                    }}
                                />
                                <div className={cx('box-tocart')}>
                                    <div className={cx('Soluong')}>
                                        <Button onClick={handerTru}>-</Button>
                                        <Input value={value} />
                                        <Button onClick={handerCong}>+</Button>
                                    </div>
                                    <button
                                        className={cx('addtocart')}
                                        onClick={() => handlerAddCart(products)}
                                    >
                                        Add To cart
                                    </button>
                                    <HeartOutlined
                                        style={{
                                            fontSize: '25px',
                                            marginLeft: '15px',
                                            border: '1px solid #e7e7e7',
                                            padding: '0 10px',
                                        }}
                                    />
                                    <RiseOutlined
                                        style={{
                                            fontSize: '25px',
                                            marginLeft: '15px',
                                            border: '1px solid #e7e7e7',
                                            padding: '0 10px',
                                        }}
                                    />
                                </div>
                                <hr
                                    style={{
                                        width: '100%',
                                        opacity: 0.2,
                                    }}
                                />
                                <div className={cx('icon')}>
                                    <div>
                                        <FacebookOutlined
                                            style={{
                                                fontSize: '30px',
                                            }}
                                            className={cx('facebook')}
                                        />
                                        <YoutubeOutlined
                                            style={{
                                                fontSize: '30px',
                                                marginLeft: '15px',
                                            }}
                                            className={cx('youtube')}
                                        />
                                        <GooglePlusOutlined
                                            style={{
                                                fontSize: '30px',
                                                marginLeft: '15px',
                                            }}
                                            className={cx('google')}
                                        />
                                        <LinkedinOutlined
                                            style={{
                                                marginLeft: '15px',
                                                fontSize: '30px',
                                            }}
                                            className={cx('linkedin')}
                                        />
                                        <AmazonOutlined
                                            style={{
                                                marginLeft: '15px',
                                                fontSize: '30px',
                                            }}
                                            className={cx('amazon')}
                                        />
                                        <InstagramOutlined
                                            style={{
                                                marginLeft: '15px',
                                                fontSize: '30px',
                                            }}
                                            className={cx('intagram')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Conten */}
                    <div className={cx('detail')}>
                        <Tabs
                            defaultActiveKey="1"
                            items={items}
                            onChange={onChange}
                        />
                    </div>

                    <div className={cx('sanphamtuongtu')}>
                        <div>WE FOUND OTHER PRODUCTS YOU MIGHT LIKE!</div>
                    </div>
                    <div
                        style={{
                            width: '80%',
                            alignItems: 'center',
                        }}
                    >
                        <Sliders />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;
