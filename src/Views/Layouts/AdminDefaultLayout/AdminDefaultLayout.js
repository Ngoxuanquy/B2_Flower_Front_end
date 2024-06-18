import { Header, Footer } from "../../../Components";

import classNames from "classnames/bind";
import styles from "./AdminDefaultLayout.module.scss";

const cx = classNames.bind(styles);
const AdminDefaultLayout = ({ children }) => {
  return (
    <div className={cx("container")}>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default AdminDefaultLayout;
