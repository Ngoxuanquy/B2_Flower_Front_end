import { Header, Footer } from "../../../Components";

import classNames from "classnames/bind";
import styles from "./defaultlayout.module.scss";
import ButtomNavigation from "../../../Components/ButtomNavigation/ButtomNavigation";

const cx = classNames.bind(styles);
const DefaultLayout = ({ children }) => {
  return (
    <div className={cx("container_")}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
