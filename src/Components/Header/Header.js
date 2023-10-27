import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './header.module.scss';
import {
    UserOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    const [scrollDirection, setScrollDirection] = useState(null);
    const [lastScroll, setLastScroll] = useState(0);
    const [isLoad, setIsLoad] = useState(true);

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

    return (
        <div className={cx('container')}>
            {isLoad && (
                <div className={`scroll-indicator ${scrollDirection}`}>
                    <div className="container">
                        <div className={cx('header')}>
                            <div>
                                <img
                                    src="http://demo-sport.monamedia.net/wp-content/uploads/2021/09/bicycle_black_trim-removebg-preview.png"
                                    className={cx('img_logo')}
                                />
                            </div>
                            <div className={cx('header_center')}>
                                <Link
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
                                <div>KHÁC</div>
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
                                <ShoppingCartOutlined
                                    style={{
                                        fontSize: '25px',
                                    }}
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
