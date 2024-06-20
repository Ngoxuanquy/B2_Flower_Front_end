import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout/DefaultLayout";
import { publicRoute, privateRoute, adminRoute } from "../Routes";
import { ScrollToTop } from "../Components";
import React, { useState, useEffect } from "react";
import theme from "../config/theme";
import ThemeConText from "../config/themeConText";
import { EventRegister } from "react-event-listeners";
import { Call_Post_Api } from "../Components/CallApi/CallApis";
import Cookies from "js-cookie";
import AdminHeader from "../Components/Admin/Header/AdminHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SideBar from "../Components/Admin/SideBars";

const App = () => {
  const [mode, setMode] = useState(false);
  const [ordersLength, setOrderLength] = useState(0);

  useEffect(() => {
    let b = EventRegister.addEventListener("chaneLength", (data) => {
      setOrderLength(data);
    });

    let a = EventRegister.addEventListener("changeTheme", (data) => {
      setMode(data);
    });
    return () => {
      EventRegister.removeEventListener(a);
      EventRegister.removeEventListener(b);
    };
  }, []);
  useEffect(() => {
    const fetchCartData = async () => {
      const token = Cookies.get("accessToken");
      const id = Cookies.get("id");
      const cleanedJwtString = token?.replace(/"/g, "");
      const cleanId = id?.replace(/"/g, "");

      if (cleanedJwtString) {
        try {
          const data = await Call_Post_Api(
            { userId: cleanId },
            cleanedJwtString,
            cleanId,
            "/cart/getlistCart"
          );

          if (data && data.metadata && data.metadata.cart_products) {
            console.log(data.metadata.cart_products.length);
            setOrderLength(data.metadata.cart_products.length);
            EventRegister.emit(
              "chaneLength",
              data.metadata.cart_products.length
            );
          }
        } catch (err) {
          console.error("Error fetching cart data:", err);
        }
      } else {
        setOrderLength(0);
      }
    };

    fetchCartData();
  }, []);

  return (
    <ThemeConText.Provider
      value={[mode === true ? theme.dark : theme.ligth, ordersLength]}
    >
      <Router>
        <ScrollToTop />
        <Routes>
          {publicRoute.map((route, index) => {
            let Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {Page}
                    </div>
                  </DefaultLayout>
                }
              />
            );
          })}
          {adminRoute.map((route, index) => {
            let Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <>
                    <AdminHeader />
                    <div className="main d-flex">
                      <div
                        className="sidebarWapper"
                        style={{
                          height: "100vh",
                          position: "fixed",
                          width: "250px",
                        }}
                      >
                        <SideBar />
                      </div>
                      <div
                        className="contents"
                        style={{
                          marginLeft: "250px", // This should match the width of the sidebar
                          width: "calc(100% - 250px)", // Adjust accordingly to sidebar width
                          height: "100%",
                        }}
                      >
                        {Page}
                      </div>
                    </div>
                  </>
                }
              />
            );
          })}
          {privateRoute.map((route, index) => {
            let Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <>
                    <div className="main d-flex">
                      <div
                        className="contents"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {Page}
                      </div>
                    </div>
                  </>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </ThemeConText.Provider>
  );
};

export default App;
