import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './header.module.scss';
import {
    UserOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';
import { Dropdown } from 'antd';
import Cookies from 'js-cookie';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import {
    MinusOutlined,
    PlusOutlined,
    QuestionOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Switch, Space } from 'antd';
import ThemeConText from '../../config/themeConText';

const cx = classNames.bind(styles);

function Header() {
    const [theme, ordersLength] = useContext(ThemeConText);

    const [scrollDirection, setScrollDirection] = useState(null);
    const [lastScroll, setLastScroll] = useState(0);
    const [isLoad, setIsLoad] = useState(true);
    const [defau, setDefau] = useState(1);

    const [count, setCount] = useState(5); // Initialize count with 5
    const [show, setShow] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll <= 0) {
                setScrollDirection(null);
            } else if (
                currentScroll > lastScroll &&
                scrollDirection !== 'scroll-down'
            ) {
                setIsLoad(false);
                setScrollDirection('scroll-down');
            } else if (
                currentScroll < lastScroll &&
                scrollDirection !== 'scroll-up'
            ) {
                setIsLoad(true);

                setScrollDirection('scroll-up');
            }

            setLastScroll(currentScroll);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollDirection, lastScroll]);

    const bodyClass =
        scrollDirection === 'scroll-down'
            ? 'scroll-down'
            : scrollDirection === 'scroll-up'
            ? 'scroll-up'
            : '';

    const handeTab = (e) => {
        setDefau(e);
        onClose();
    };

    //laays value cokiie
    const name = Cookies.get('name')?.replace(/"/g, '');
    const img = Cookies.get('img')?.replace(/"/g, '');

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    {name}
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    Dổi mật khẩu
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a rel="noopener noreferrer" href="/login">
                    Đăng xuất
                </a>
            ),
        },
    ];

    //khai báo model
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    //khai báo menu ẩn
    const onClick = (e) => {
        console.log('click ', e);
    };

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
                [
                    getItem('Hoa có sẵn', 'Hoa có sẵn'),
                    getItem('Hoa tự làm', 'Hoa tự làm'),
                ],
                'group',
            ),
            getItem(
                'Hộp quà',
                'Hộp quà',
                null,
                [
                    getItem('Hộp quà có sẵn', 'Hộp quà có sẵn'),
                    getItem('Hộp quà tự đóng gói', 'Hộp quà tự đóng gói'),
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
    return (
        <div className={cx('container_')}>
            <Drawer
                title="Menu"
                placement="right"
                onClose={onClose}
                open={open}
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
            {isLoad && (
                <div className={`scroll-indicator ${scrollDirection}`}>
                    <div className="container_">
                        <div className={cx('header')}>
                            <div
                                onClick={() => (window.location.href = '/')}
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                <img
                                    src="https://scontent.xx.fbcdn.net/v/t1.15752-9/396713578_344872568026890_3407832581849265293_n.png?stp=dst-png_s206x206&_nc_cat=104&ccb=1-7&_nc_sid=510075&_nc_eui2=AeE8lIFF3EhNkx7C74eSmhoZShqdl7rXNCpKGp2Xutc0Km2u_Vy1YBVf4lLbAKRzcgYU4PImcYYoPEwaQz8m1r8n&_nc_ohc=zJ9e8wrfmAEAX_bihfK&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRbSSfcZtOchDK2rrFtD-XKWLNV8OUwkjRHxabFE9MPBw&oe=6569C6F3"
                                    className={cx('img_logo')}
                                    style={{
                                        borderRadius: '300px',
                                        marginRight: '-10px',
                                    }}
                                />
                            </div>
                            <div className={cx('header_center')}>
                                <Tabs
                                    defaultActiveKey={defau}
                                    centered
                                    onChange={(e) => handeTab(e)}
                                    tabBarStyle={{
                                        color: 'pink',
                                    }}
                                >
                                    <Tabs.TabPane
                                        tab={
                                            <Link
                                                style={{
                                                    color: '#292929',
                                                }}
                                                to="/"
                                            >
                                                TRANG CHỦ
                                            </Link>
                                        }
                                        key="1"
                                    />
                                    <Tabs.TabPane
                                        tab={
                                            <Link
                                                style={{
                                                    color: '#292929',
                                                }}
                                                to="/about"
                                            >
                                                GIỚI THIỆU
                                            </Link>
                                        }
                                        key="2"
                                    />
                                    <Tabs.TabPane
                                        tab={
                                            <Link
                                                style={{
                                                    color: '#292929',
                                                }}
                                                to="/shop"
                                            >
                                                SHOP
                                            </Link>
                                        }
                                        key="3"
                                    />
                                    <Tabs.TabPane
                                        tab={
                                            <Link
                                                style={{
                                                    color: '#292929',
                                                }}
                                                to="/blog"
                                            >
                                                BLOG
                                            </Link>
                                        }
                                        key="4"
                                    />
                                    <Tabs.TabPane
                                        tab={
                                            <Link
                                                style={{
                                                    color: '#292929',
                                                }}
                                                to="/lienhe"
                                            >
                                                LIÊN HỆ
                                            </Link>
                                        }
                                        key="5"
                                    />
                                    <Tabs.TabPane
                                        tab={
                                            <Link
                                                style={{
                                                    color: '#292929',
                                                }}
                                                to="/lienhe"
                                            >
                                                CÂU HỎI KHÁC
                                            </Link>
                                        }
                                        key="6"
                                    />
                                </Tabs>
                                {/* <Link
                                    to="/"
                                    style={{
                                        color: 'black',
                                        listStyle: 'none',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <div>TRANG CHỦ</div>
                                </Link>
                                <div>GIỚI THIỆU</div>
                                <Link
                                    to="/shop"
                                    style={{
                                        color: 'black',
                                        listStyle: 'none',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <div>SHOP</div>
                                </Link>
                                <div>BLOG</div>
                                <Link
                                    to="/lienhe"
                                    style={{
                                        color: 'black',
                                        listStyle: 'none',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <div>LIÊN HỆ</div>
                                </Link>
                                <div>CÂU HỎI THƯỜNG GẶP</div>
                                <div>KHÁC</div> */}
                            </div>
                            <div className={cx('header_right')}>
                                <Link
                                    to="/cart"
                                    style={{
                                        color: 'black',
                                        listStyle: 'none',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <Space
                                        size="large"
                                        style={{
                                            fontSize: '25px',
                                            marginLeft: '-40px',
                                        }}
                                    >
                                        <Badge count={ordersLength}>
                                            <ShoppingCartOutlined
                                                style={{
                                                    fontSize: '25px',
                                                }}
                                            />
                                        </Badge>
                                    </Space>
                                </Link>
                                <SearchOutlined
                                    style={{
                                        fontSize: '25px',
                                        marginTop: '-10px',
                                        marginLeft: '-20px',
                                    }}
                                />
                                <Dropdown
                                    menu={{ items }}
                                    placement="bottom"
                                    arrow
                                >
                                    {img == '' ? (
                                        <UserOutlined
                                            style={{
                                                fontSize: '25px',
                                            }}
                                        />
                                    ) : (
                                        <div>
                                            <img
                                                src={img}
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '100px',
                                                }}
                                            />
                                        </div>
                                    )}
                                </Dropdown>
                            </div>

                            {/* Menu */}
                            <div className={cx('menu')}>
                                <MenuOutlined
                                    style={{
                                        fontSize: '25px',
                                    }}
                                    onClick={showDrawer}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
