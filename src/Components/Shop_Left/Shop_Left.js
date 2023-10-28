import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Shop_Left.module.scss';
import { Slider, Switch } from 'antd';

const cx = classNames.bind(styles);

function Shop_Left() {
    const [disabled, setDisabled] = useState(false);
    const [valueSlider, setValueSlider] = useState([]);

    //lấy giá trị nhỏ và lớn
    const [value_min, setValueMin] = useState(20);
    const [value_max, setValueMax] = useState(50);

    const onChange = (checked) => {
        setDisabled(checked);
    };

    //xử lý lấy sử kiện giá trị
    const handerChangeValue = (e) => {
        setValueMin(e[0]);
        setValueMax(e[1]);
    };

    return (
        <div className={cx('container_')}>
            <div className="container_">
                <div className={cx('box')}>
                    <div className={cx('conten')}>
                        <h1>Danh Mục</h1>
                        <div>Hộp quà</div>
                        <div>Gấu bông</div>
                        <div>Đồ đan tay</div>
                        <div>Các đồ thiết kế</div>
                        <div>Các đồ có sẵn</div>
                        <hr />
                    </div>
                    <div className={cx('price')}>
                        <div>Giá</div>
                        <Slider
                            range
                            defaultValue={[20, 50]}
                            min={50}
                            max={100}
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
                            Giá tối thiểu: {value_min} - Giá tối đa: {value_max}
                        </div>
                    </div>
                    {/* Màu sắc */}
                    <div className={cx('color')}>
                        <hr />
                        <div className={cx('conten')}>Màu săc</div>
                        <div>
                            <div className={cx('value-corlor')}>
                                <p
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: 'coral',
                                    }}
                                ></p>
                                <span>Cam</span>
                            </div>
                            <div className={cx('value-corlor')}>
                                <p
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: 'red',
                                    }}
                                ></p>
                                Đỏ
                            </div>
                            <div className={cx('value-corlor')}>
                                <p
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: 'black',
                                    }}
                                ></p>
                                Đen
                            </div>
                            <div className={cx('value-corlor')}>
                                <p
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: 'yellow',
                                    }}
                                ></p>
                                Vàng
                            </div>
                            <div className={cx('value-corlor')}>
                                <p
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: 'blue',
                                    }}
                                ></p>
                                Xanh dương
                            </div>
                            <div className={cx('value-corlor')}>
                                <p
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: 'green',
                                    }}
                                ></p>
                                Xanh lá
                            </div>
                        </div>
                    </div>
                    <hr />
                    {/* kichs thuowcs */}
                    <div className={cx('kichthuoc')}>
                        <div>Kích thước</div>
                        <div>
                            <p>20cm</p>
                            <p>40cm</p>
                            <p>60cm</p>
                            <p>80cm</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop_Left;
