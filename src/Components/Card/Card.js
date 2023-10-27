import React from 'react';
import classNames from 'classnames/bind';
import styles from './Card.module.scss';

const cx = classNames.bind(styles);

function Card() {
    return (
        <div className={cx('container')}>
            <div className="container">
                <div className={cx('box')}>
                    <div className="">
                        <img
                            className={cx('img_card')}
                            src="https://scontent.fhan20-1.fna.fbcdn.net/v/t1.15752-9/396521293_1006783440383935_2187288414981548075_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGTdu65WMZ4w8Og2IJsjyHd9GVyjCVLwKT0ZXKMJUvApCHNF4xG1Uo8FPZ19L0pTM9bQHvk6tnYcKYzdlW3JD2t&_nc_ohc=Xk3p-EptywsAX_tFAs6&_nc_ht=scontent.fhan20-1.fna&oh=03_AdRaZu8z6IXyJWYYnAWgZkweUcXpb1NmecK4QZQSi_NR0g&oe=65631412"
                        />
                        <div className={cx('button')}>
                            <button>Mới</button>
                        </div>
                        <div className={cx('conten')}>
                            <div>Mẫu trứng 1</div>
                            <div>$10000</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
