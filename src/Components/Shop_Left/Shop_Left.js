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

    const colors = [
        { id: 1, title: 'Cam', color: 'coral' },
        { id: 2, title: 'Đỏ', color: 'red' },
        { id: 3, title: 'Đen', color: 'black' },
        { id: 4, title: 'Vàng', color: 'yellow' },
        { id: 5, title: 'Xanh dương', color: 'blue' },
        { id: 6, title: 'Xanh lá', color: 'green' },
    ];

    const types = [
        { id: 1, name: 'Hoa' },
        { id: 2, name: 'hộp quà' },
        { id: 6, name: 'Gấu bông' },
        { id: 3, name: 'Đồ đan tay' },
        { id: 4, name: 'Các đồ thiết kế' },
        { id: 5, name: 'Các đồ có sẵn' },
    ];

    const handelColor = (color) => {
        console.log(color);
    };

    return (
        <div className={cx('container_')}>
            <div className="container_">
                <div className={cx('box')}>
                    <div className={cx('conten')}>
                        <h1>Danh Mục</h1>
                        {types.map((type) => (
                            <div
                                style={{
                                    cursor: 'pointer',
                                }}
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
                            {colors?.map((color) => (
                                <div
                                    className={cx('value-corlor')}
                                    onClick={() => handelColor(color.title)}
                                >
                                    <p
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            backgroundColor: color.color,
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
