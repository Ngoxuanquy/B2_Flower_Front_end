

import { Header, Footer } from '../../../Components'

import classNames from "classnames/bind"
import styles from "./defaultlayout.module.scss"

const cx = classNames.bind(styles)
const DefaultLayout = ({ children }) => {

    return (
        <div className={cx('container')}>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
        </div>
    )
}

export default DefaultLayout