

import classNames from "classnames/bind"
import styles from "./footer.module.scss"

const cx = classNames.bind(styles)
const Footer = () => {

    return (
        <div className={cx('container')}>
            <div className="container">
                <div className={cx('box')}>
                    <h1>Footer</h1>
                </div>
            </div>
        </div>
    )
}

export default Footer