import React, { useEffect } from "react";
import styles from "./DashBoard.module.scss";
import classNames from "classnames/bind";
import DashBoardBox from "../../../../Components/Admin/DashBoard/DashBoardBox";
import { FaBagShopping, FaCircleUser } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";

const cx = classNames.bind(styles);

const DashBoard = () => {
  useEffect(() => {
    document.title = "Dash Broad";
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("contents")}>
        <div className={cx("box")}>
          <h5>Dash Board</h5>
          <nav>Admin/Dash Board</nav>
        </div>
        <div className={cx("dashboardBoxWrapperRow")}>
          <div className="col-md-8">
            <div className={cx("dashboardBoxWrapper")}>
              <DashBoardBox
                color={["#1da256", "#48d483"]}
                icon={<FaCircleUser />}
              />
              <DashBoardBox
                color={["#c012e2", "#eb64fe"]}
                icon={<MdShoppingCart />}
              />
              <DashBoardBox
                color={["#2c78e5", "#60aff5"]}
                icon={<FaBagShopping />}
              />
              <DashBoardBox color={["#e1950e", "#f3cd29"]} />
            </div>
          </div>
          <div className="col-md-4" style={{ paddingLeft: "10px" }}>
            <div className={cx("boxnew")}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
