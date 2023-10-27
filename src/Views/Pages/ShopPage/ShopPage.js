import classNames from 'classnames/bind';
import styles from './shoppage.module.scss';
import { Card, Shop_Left } from '../../../Components';

const cx = classNames.bind(styles);

const ShopPage = () => {
    return (
        <div className={cx('container')}>
            <div className="container">
                <div className={cx('shop-has-sidebar')}>
                    <div className={cx('nova-page-header__overlay')}>
                        <div>
                            <h1>Shop</h1> <br />
                            <p>Trang Chủ | Shop</p>
                        </div>
                    </div>

                    {/* Layout  */}
                    <div className={cx('layout')}>
                        <div className={cx('box')}>
                            {/* left */}
                            <div className={cx('left')}>
                                <Shop_Left />
                            </div>
                            {/* right */}
                            <div className={cx('right')}>
                                <Card />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
