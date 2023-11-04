import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './shoppage.module.scss';
import { Card, Shop_Left } from '../../../Components';
import ScrollReveal from 'scrollreveal';
import AOS from 'aos';
// import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { Call_Post_Api } from '../../../Components/CallApi/CallApis';
import ButtomNavigation from '../../../Components/ButtomNavigation/ButtomNavigation';
import { Slider } from 'antd';
import { Spin, message } from 'antd';
import { Avatar, Badge, Switch, Space, Drawer } from 'antd';
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
    MenuOutlined,
    AlignRightOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';

const cx = classNames.bind(styles);

const ShopPage = () => {
    const [count, setCount] = useState(5); // Initialize count with 5

    useEffect(() => {
        AOS.init();

        // const sr = ScrollReveal();

        // // Thiết lập cấu hình cho hiệu ứng
        // sr.reveal(this.container, {
        //     duration: 1000,
        //     origin: 'left',
        //     distance: '100px',
        // });
    }, []);

    const [isLoad, setIsLoad] = useState(true);

    const [disabled, setDisabled] = useState(false);
    const [valueSlider, setValueSlider] = useState([]);

    //lấy giá trị nhỏ và lớn
    const [value_min, setValueMin] = useState(20);
    const [value_max, setValueMax] = useState(50);

    const onChange = (checked) => {
        setDisabled(checked);
    };

    const colors = [
        { id: 1, title: 'Cam', color: 'coral' },
        { id: 2, title: 'Đỏ', color: 'red' },
        { id: 3, title: 'Đen', color: 'black' },
        { id: 4, title: 'Vàng', color: 'yellow' },
        { id: 5, title: 'Xanh dương', color: 'blue' },
        { id: 6, title: 'Xanh lá', color: 'green' },
        { id: 7, title: 'All', color: 'All' },
    ];

    const types = [
        { id: 1, name: 'Hoa' },
        { id: 2, name: 'hộp quà' },
        { id: 6, name: 'Gấu bông' },
        { id: 3, name: 'Đồ đan tay' },
        { id: 4, name: 'Các đồ thiết kế' },
        { id: 5, name: 'Các đồ có sẵn' },
        { id: 6, name: 'All' },
    ];

    //fake list product
    const lists = [
        {
            id: 1,
            img: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.15752-9/370225831_3676239955941314_7161542285842422241_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeEqdsuMrBq1rWGE0kB3YWU4eiwgK2-9lxx6LCArb72XHJm1lKNneUaRZyosqzsohaZ-mb3GM-0uIicGoSp7Zz94&_nc_ohc=hHDgHvia3JQAX-am4zE&_nc_ht=scontent.fhan20-1.fna&oh=03_AdR8Icfau1yd3OMNl4n1wjH9GNKp7aKVYv_CUGrUb6fK6w&oe=65644742',
            name: 'sản phâm 1',
            price: 100,
        },
        {
            id: 2,
            img: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/395577565_6926701344053995_1769440315928249527_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHjN-4fo158vFG7RzgZQllrPZWimD_gPRI9laKYP-A9EuctaMsUB42JTGp5V782hzhlJe-GrCeGyctgiqfjyysA&_nc_ohc=3KeYa_-ZnUYAX9xT_Io&_nc_ht=scontent.fhan14-1.fna&oh=03_AdSGdnCnHyho4EfIo7o8h-IwH1E9YGwBnJ2vx1h4BLq0Kw&oe=656341C0',
            name: 'sản phâm 2',
            price: 200,
        },
        {
            id: 3,
            img: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t1.15752-9/369842289_847831003546579_1212834127400835549_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeE7GtcCthBifKKWhCQGwf8z_n1HKW542rn-fUcpbnjauXt6koBUxH_Rl8c86Sz39oAQGAZCC2KtFqFMs06u__8E&_nc_ohc=ALZGhpjDvaMAX8mrRew&_nc_ht=scontent.fhan14-2.fna&oh=03_AdTURaSBPiHMtQ-JJ_j77ocU8rcL0M7e4OBEmTKzGexnQA&oe=65635AC9',
            name: 'sản phâm 3',
            price: 300,
        },
        {
            id: 4,
            img: 'https://scontent.fhan14-3.fna.fbcdn.net/v/t1.15752-9/370196239_297830479846145_8825192006366784045_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeEv2wUcWeeTDeqp56BbU7cdDTOpsEUF_NANM6mwRQX80Jy11zzO14-2eM31gVy1c6Sqaf4De0-kEyDueGx91Wa_&_nc_ohc=wxAn0xJfAAQAX9EnRTz&_nc_ht=scontent.fhan14-3.fna&oh=03_AdRfxCgGjWXzj1R4AhckRR3qzq2y7_iA7q_AAOcofcv-dQ&oe=656360A1',
            name: 'sản phâm 4',
            price: 400,
        },
        {
            id: 5,
            img: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t1.15752-9/396518694_771008088123916_4957748953599361065_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeF39CN1AensZaqNKNjpMZJcLR3Ks_Xl4HotHcqz9eXgemnFrnbu91tmC8e7wFp3w0scocg9bXuZiifs-VReMF1K&_nc_ohc=tAaOvVrg7EgAX-f0m_l&_nc_ht=scontent.fhan14-4.fna&oh=03_AdRTy65BrxVOYARZStfxM6aGnkj-W05NkXuDBBHK-L5mRg&oe=65637144',
            name: 'sản phâm 5',
            price: 500,
        },
        {
            id: 6,
            img: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/370126303_629346969406459_6473177226124283458_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGKP46o6ZUfZA-AvxVgphyL457L-gDUlCvjnsv6ANSUK1p-O7Vic0d1rxY7RZM1viTVWeoCQVSl_Lx4pHKaK83Q&_nc_ohc=zP1poCeQ6p0AX9EZNtm&_nc_ht=scontent.fhan14-1.fna&oh=03_AdRu0qcJ0SsdmoETbVM6ZazwLNFoTiuCC5smPsZbXenTFg&oe=656351AE',
            name: 'sản phâm 6',
            price: 600,
        },
        {
            id: 7,
            img: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t1.15752-9/395453207_171425679307927_6121801529067387352_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGUiLJFO-XObxhKDsDlik9hpgKkjWUlOqqmAqSNZSU6qv_hzNcy2YBxdQNcFcHXjytZ46ylkfXhU6iv8UjRegDG&_nc_ohc=3eTJ-M5GXmUAX_X9rcJ&_nc_ht=scontent.fhan14-4.fna&oh=03_AdTmhkR1PNLrNxR9omUTpia2-AWjs90ZKxSvk1D5HPmI5g&oe=65633EAE',
            name: 'sản phâm 7',
            price: 700,
        },
        {
            id: 8,
            img: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/387641583_265732942628704_9003011310122567851_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFU6vRUIgie8RO1P_fVzKE4lWJDAs1s0EKVYkMCzWzQQnpHCvs5avjwstq22f06A_ZdJn_o3sj80QUPHnDdfyjq&_nc_ohc=wBjavy4PeeoAX87aKzU&_nc_ht=scontent.fhan14-1.fna&oh=03_AdTEV8devIAZXZWb2DyrHPbxr5Ztyrb4Xk7oEse9eh8fOA&oe=656343C3',
            name: 'sản phâm 8',
            price: 800,
        },
        {
            id: 9,
            img: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/370721500_873189441123422_7824064343062004522_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeEDcYGsNZTCXTtCwV3TPfX5dKBzkLNG3mF0oHOQs0beYQC84JTSO6h7vvbUPp4FZGUtkudZGQpwhAo6x05SdU6S&_nc_ohc=ZBsu6275DwEAX_RAyP9&_nc_ht=scontent.fhan14-1.fna&oh=03_AdREId4cdT2qoM-54y9uN-UV-hxU5oyE66Oz_1qiHz7DFQ&oe=65634505',
            name: 'sản phâm 9',
            price: 900,
        },
        {
            id: 10,
            img: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t1.15752-9/395352989_204144012631385_7296511929375041197_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFDB35cUkh4PHX2NijaMpci4_jMKTttBefj-MwpO20F55ltxLKuKrPMYDKEeDqFKvJ2kNst1PuOg2dtf__8036D&_nc_ohc=jJ8jfakKiroAX_TLjF5&_nc_ht=scontent.fhan14-2.fna&oh=03_AdTTf_NRvmjH7RZWCAR1NL7ARHiJhzI9yAC6I9R6zSnicw&oe=65634E47',
            name: 'sản phâm 10',
            price: 1000,
        },
    ];

    const sizes = [
        { id: 1, size: '40cm' },
        { id: 2, size: '60cm' },
        { id: 3, size: '80cm' },
        { id: 4, size: '100cm' },
    ];

    const [apis, setApi] = useState([]);

    useEffect(() => {
        Call_Post_Api(null, null, null, '/product/getAll').then((data) => {
            setApi(data.metadata);
            setIsLoad(false);
        });
    }, []);

    const [apiLocs, setApiTT] = useState([]);
    const [colorLocs, setColor] = useState('');
    const [typeLocs, setType] = useState('');

    //xử lý chọn màu
    const handelColor = (color) => {
        setColor(color);
        setIsLoad(true);
        if (color != 'All') {
            const filteredApis = apis.filter((api) => {
                return (
                    api.product_attributes.color.toLowerCase() ===
                    color.toLowerCase()
                );
            });
            setApiTT(filteredApis);
            setIsLoad(false);
        } else {
            setApiTT(apis);
            setIsLoad(false);
        }
    };

    //xử lý chọn cm
    const [sizess, setSize] = useState('');
    const hanlerSize = (size) => {
        setSize(size);
        setIsLoad(true);
        if (size != 'All') {
            const filteredApis = apis.filter((api) => {
                return (
                    api.product_attributes.size.toLowerCase() ===
                    size.toLowerCase()
                );
            });
            setApiTT(filteredApis);
            setIsLoad(false);
        } else {
            setApiTT(apis);
            setIsLoad(false);
        }
    };

    //xử lý chọn kiểu
    const handlerType = (type) => {
        setType(type);
        setIsLoad(true);
        if (type != 'All') {
            const filteredApis = apis.filter((api) => {
                return api.product_type.toLowerCase() === type.toLowerCase();
            });
            setApiTT(filteredApis);
            setIsLoad(false);
        } else {
            setApiTT(apis);
            setIsLoad(false);
        }
    };

    //xử lý lấy sử kiện giá trị
    const [locPrice, setLocPrice] = useState('');
    const handerChangeValue = (e) => {
        setValueMin(e[0]);
        setValueMax(e[1]);
        setLocPrice(e[1]);
        const filteredProducts = apis.filter((product) => {
            return (
                product.product_price >= Number(e[0]) &&
                product.product_price <= Number(e[1])
            );
        });
        setApiTT(filteredProducts);
    };

    //draw
    const getItem = (label, key, icon, children, type) => ({
        key,
        icon,
        children,
        label,
        type,
    });

    const items_menu = [
        getItem('Danh mục', 'sub1', <MailOutlined />, [
            getItem(
                'Hoa',
                'g1',
                null,
                [getItem('Hoa có sẵn', 'hoa'), getItem('Hoa tự làm', 'hoa')],
                'group',
            ),
            getItem(
                'Hộp quà',
                'Hộp quà',
                null,
                [
                    getItem('Hộp quà có sẵn', 'Hộp quà'),
                    getItem('Hộp quà tự đóng gói', 'Hộp quà'),
                ],
                'group',
            ),
            getItem(
                'Khác',
                'Khác',
                null,
                [getItem('Gấu bông', 'Gấu bông'), getItem('Đồ ăn', 'Đồ ăn')],
                'group',
            ),
        ]),

        getItem('Màu sắc', 'Màu sắc', <AppstoreOutlined />, [
            getItem(
                'Màu cam',
                'cam',
                <div
                    style={{
                        backgroundColor: 'coral',
                        width: '20px',
                        height: '20px',
                    }}
                ></div>,
            ),
            getItem(
                'Màu đỏ',
                'đỏ',
                <div
                    style={{
                        backgroundColor: 'red',
                        width: '20px',
                        height: '20px',
                    }}
                ></div>,
            ),
            getItem(
                'Màu đen',
                'đen',
                <div
                    style={{
                        backgroundColor: 'black',
                        width: '20px',
                        height: '20px',
                    }}
                ></div>,
            ),
            getItem(
                'Màu vàng',
                'vàng',
                <div
                    style={{
                        backgroundColor: 'yellow',
                        width: '20px',
                        height: '20px',
                    }}
                ></div>,
            ),
            getItem(
                'Màu xanh dương',
                'xanh dương',
                <div
                    style={{
                        backgroundColor: 'blue',
                        width: '20px',
                        height: '20px',
                    }}
                ></div>,
            ),
            getItem(
                'Màu xanh lá',
                'xanh lá',
                <div
                    style={{
                        backgroundColor: 'green',
                        width: '20px',
                        height: '20px',
                    }}
                ></div>,
            ),
        ]),

        { type: 'divider' },

        getItem('Kích thước', 'Kích thước', <SettingOutlined />, [
            getItem('40cm', '40cm'),
            getItem('60cm', '60cm'),
            getItem('80cm', '80cm'),
            getItem('khác', 'khác'),
        ]),

        getItem(
            'Group',
            'grp',
            null,
            [getItem('Option 13', '13'), getItem('Option 14', '14')],
            'group',
        ),
    ];

    const increase = () => {
        setCount(count + 1);
    };

    // Function to decrease the count
    const decline = () => {
        let newCount = count - 1;
        if (newCount < 0) {
            newCount = 0;
        }
        setCount(newCount);
    };

    //khai báo menu ẩn
    const onClick = (e) => {
        console.log('click ', e);
        handlerType(e.key);
        onClose();
    };
    //khai báo model
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <div className={cx('container_')}>
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
            <Drawer
                title="Menu"
                placement="right"
                onClose={onClose}
                open={open}
                width="70%"
            >
                <Menu
                    onClick={onClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items_menu}
                />
            </Drawer>
            <div className="container_">
                <div className={cx('shop-has-sidebar')}>
                    <div className={cx('nova-page-header__overlay')}>
                        <div>
                            <AlignRightOutlined
                                style={{
                                    fontSize: '25px',
                                }}
                                onClick={showDrawer}
                            />
                            <h1>Shop</h1> <br />
                            <p>Trang Chủ | Shop</p>
                        </div>
                    </div>

                    {/* Layout  */}
                    <div className={cx('layout')}>
                        <div className={cx('box')}>
                            {/* left */}
                            <div className={cx('left')}>
                                <div className={cx('box')}>
                                    <div className={cx('conten')}>
                                        <h1>Danh Mục</h1>
                                        {types.map((type) => (
                                            <div
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() =>
                                                    handlerType(type.name)
                                                }
                                            >
                                                {type.name}
                                            </div>
                                        ))}

                                        <hr />
                                    </div>
                                    <div className={cx('price')}>
                                        <div>Giá</div>
                                        <Slider
                                            range
                                            defaultValue={[20, 50]}
                                            min={50}
                                            max={1000}
                                            disabled={disabled}
                                            dotActiveBorderColor="black"
                                            onChange={(e) => {
                                                handerChangeValue(e);
                                            }}
                                            rail="black"
                                            style={{
                                                color: 'red', // Change the color here
                                            }}
                                        />
                                        <br />
                                        <div className={cx('valueSlider')}>
                                            Giá tối thiểu: {value_min} - Giá tối
                                            đa: {value_max}
                                        </div>
                                    </div>
                                    {/* Màu sắc */}
                                    <div className={cx('color')}>
                                        <hr />
                                        <div className={cx('conten')}>
                                            Màu săc
                                        </div>
                                        <div>
                                            {colors?.map((color) => (
                                                <div
                                                    className={cx(
                                                        'value-corlor',
                                                    )}
                                                    onClick={() =>
                                                        handelColor(color.title)
                                                    }
                                                >
                                                    <p
                                                        style={{
                                                            width: '20px',
                                                            height: '20px',
                                                            backgroundColor:
                                                                color.color,
                                                        }}
                                                    ></p>
                                                    <span>{color.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <hr />
                                    {/* kichs thuowcs */}
                                    <div className={cx('kichthuoc')}>
                                        <div>Kích thước</div>
                                        {sizes.map((size) => (
                                            <div
                                                onClick={() =>
                                                    hanlerSize(size.size)
                                                }
                                            >
                                                <p>{size.size}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* right */}
                            <div className={cx('right')}>
                                {colorLocs != '' ||
                                typeLocs != '' ||
                                sizess != '' ||
                                locPrice != '' ? (
                                    <div className={cx('layout_right')}>
                                        {apiLocs?.length != 0 ? (
                                            apiLocs.map((list, index) => (
                                                <div
                                                    key={list.id}
                                                    data-aos="fade-left"
                                                    // data-aos-easing="ease-out-cubic"
                                                    data-aos-duration={
                                                        (index + 1) * 1000
                                                    }
                                                >
                                                    <Card list={list} />
                                                </div>
                                            ))
                                        ) : (
                                            <h2>Hiện chưa có sản phẩm</h2>
                                        )}
                                    </div>
                                ) : (
                                    <div className={cx('layout_right')}>
                                        {apis.map((list, index) => (
                                            <div
                                                key={list.id}
                                                data-aos="fade-left"
                                                // data-aos-easing="ease-out-cubic"
                                                data-aos-duration={
                                                    (index + 1) * 1000
                                                }
                                            >
                                                <Card list={list} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
