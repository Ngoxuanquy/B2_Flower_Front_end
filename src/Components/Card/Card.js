import React from 'react';
import classNames from 'classnames/bind';
import styles from './Card.module.scss';

const cx = classNames.bind(styles);

function Card({ list }) {
    console.log(list);
    return (
        <div className={cx('container')}>
            <div className="container">
                <div className={cx('box')}>
                    <div className="">
                        <img className={cx('img_card')} src={list.img} />
                        <div className={cx('button')}>
                            <button>Mới</button>
                        </div>
                        <div className={cx('conten')}>
                            <div>{list.name}</div>
                            <div>${list.price}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
