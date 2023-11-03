import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './DangKy.module.scss';
import { Backgroug } from '../../../Components';
import { Spin, message } from 'antd';

const cx = classNames.bind(styles);

function DangKy() {
    const URL = process.env.REACT_APP_URL;

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [re_Pass, setRe_Passs] = useState('');
    const [number, setNumber] = useState('');

    const [isLoad, setIsLoad] = useState(false);

    function handerSubmit() {
        if (pass === re_Pass) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.REACT_APP_API_KEY,
                },
                body: JSON.stringify({
                    email: email,
                    password: pass,
                }),
            };

            // Lấy dữ liệu của khách hàng
            fetch(URL + '/shop/signup', requestOptions)
                .then((data) => {
                    return data.json();
                })
                .then((data) => {
                    alert(data.metadata.msg || 'Đăng ký thành công!!');
                    if (data.metadata.msg != 'Error: Shop already registered') {
                        window.location = '/login';
                    } else {
                        return;
                    }
                });
        } else {
            alert('sai mk');
        }
    }

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

            <div className={cx('box')}>
                <div
                    style={{
                        width: '100%',
                        height: '99.4%',
                        position: 'relative',
                        zIndex: -100,
                    }}
                >
                    <Backgroug />
                </div>
                <div className={cx('form')}>
                    <div className={cx('all')}>
                        <div className={cx('left')}>
                            <div className={cx('login')}>Đăng Ký</div>
                            <div className={cx('titer')}>
                                By logging in you agree to the ridiculously long
                                terms that you didn't bother to read
                            </div>
                            <div className={cx('taikhoan')}>
                                Bạn Chưa Có Tài Khoản?
                                <Link to={'/login'}>
                                    <span>Đăng Nhập</span>
                                </Link>
                            </div>
                        </div>
                        <div className={cx('rigth')}>
                            <div>
                                <div className={cx('email')}>Email</div>
                                <div>
                                    <input
                                        className={cx('input')}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <div className={cx('matkhau')}>Mật Khẩu</div>
                                <div>
                                    <input
                                        className={cx('input')}
                                        onChange={(e) =>
                                            setPass(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <div className={cx('matkhau')}>
                                    Mật Lại Mật Khẩu
                                </div>
                                <div>
                                    <input
                                        className={cx('input')}
                                        onChange={(e) =>
                                            setRe_Passs(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <div className={cx('matkhau')}>
                                    Số Điện Thoại
                                </div>
                                <div>
                                    <input
                                        className={cx('input')}
                                        onChange={(e) =>
                                            setNumber(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    className={cx('submit')}
                                    onClick={() => handerSubmit()}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DangKy;
