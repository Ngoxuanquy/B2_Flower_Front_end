import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './header.module.scss';
import {
    UserOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';

const cx = classNames.bind(styles);

function Header() {
    const [scrollDirection, setScrollDirection] = useState(null);
    const [lastScroll, setLastScroll] = useState(0);
    const [isLoad, setIsLoad] = useState(true);
    const [defau, setDefau] = useState(1);

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
    };

    return (
        <div className={cx('container_')}>
            {isLoad && (
                <div className={`scroll-indicator ${scrollDirection}`}>
                    <div className="container_">
                        <div className={cx('header')}>
                            <div>
                                <img
                                    src="http://demo-sport.monamedia.net/wp-content/uploads/2021/09/bicycle_black_trim-removebg-preview.png"
                                    className={cx('img_logo')}
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
                                <UserOutlined
                                    style={{
                                        fontSize: '25px',
                                    }}
                                />
                                <SearchOutlined
                                    style={{
                                        fontSize: '25px',
                                    }}
                                />
                                  <Link
                                    to="/cart"
                                    style={{
                                        color: 'black',
                                        listStyle: 'none',
                                        textDecoration: 'none',
                                    }}
                                >
                                <ShoppingCartOutlined
                                    style={{
                                        fontSize: '25px',
                                    }}
                                    />
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
