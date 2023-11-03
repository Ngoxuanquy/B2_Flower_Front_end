import { Header, Footer } from '../../../Components';

import classNames from 'classnames/bind';
import styles from './defaultlayout.module.scss';
import ButtomNavigation from '../../../Components/ButtomNavigation/ButtomNavigation';

const cx = classNames.bind(styles);
const DefaultLayout = ({ children }) => {
    return (
        <div className={cx('container_')}>
            <Header />
            {children}
            <div
                className={cx('buttom')}
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                }}
            >
                <ButtomNavigation />
            </div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
