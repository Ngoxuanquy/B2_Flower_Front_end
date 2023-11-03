import React from 'react';
import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Card({ list }) {
    return (
        <div className={cx('container_')}>
            <div className="container_">
                <div className={cx('box')}>
                    <div className="">
                        <Image
                            className={cx('img_card')}
                            src={list.product_thumb}
                        />
                        <div className={cx('button')}>
                            <button>Mới</button>
                        </div>
                    </div>
                </div>
                <Link
                    to={`/detailproduct/` + list._id}
                    style={{
                        listStyle: 'none',
                        textDecoration: 'none',
                    }}
                >
                    <div
                        className={cx('conten')}
                        style={{
                            color: 'black',
                        }}
                    >
                        <div>{list.product_name}</div>
                        <div>${list.product_price}</div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Card;
