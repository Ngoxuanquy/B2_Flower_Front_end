import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DefaultLayout from "./Layouts/DefaultLayout/DefaultLayout";
import { publicRoute, privateRoute } from "../Routes";
import { ScrollToTop } from "../Components";
import PrivateDefaultLayout from "./Layouts/DefaultLayout/DefaultLayout";
import React, { useState, useEffect } from "react";
import theme from "../config/theme";
import ThemeConText from "../config/themeConText";
import { EventRegister } from "react-event-listeners";
import { Call_Post_Api } from "../Components/CallApi/CallApis";
import Cookies from "js-cookie";
const App = () => {
  const [mode, setMode] = useState(false);

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

  const [ordersLength, setOrderLength] = useState(0);
  useEffect(() => {
    const token = Cookies.get("accessToken");
    const id = Cookies.get("id");
    const cleanedJwtString = token?.replace(/"/g, "");
    const cleanId = id?.replace(/"/g, "");
    if (cleanedJwtString) {
      Call_Post_Api(
        {
          userId: id,
        },
        cleanedJwtString,
        cleanId,
        "/cart/getlistCart"
      )
        .then((data) => {
          if (data && data.metadata && data.metadata.cart_products) {
            setOrderLength(data.metadata.cart_products.length);
            EventRegister.emit("chaneLength", data.metadata.cart_products.length);
          } else {
          }
        })
        .catch((err) => console.log({ err }));
    }
  }, [ordersLength]);

  return (
    <>
      <ThemeConText.Provider value={[mode === true ? theme.dark : theme.ligth, ordersLength]}>
        <Router>
          <ScrollToTop />
          <Routes>
            {publicRoute.map((route, index) => {
              let Page = route.component;
              return <Route key={index} path={route.path} element={<DefaultLayout>{Page}</DefaultLayout>} />;
            })}

            {privateRoute.map((route, index) => {
              let Page = route.component;
              return <Route key={index} path={route.path} element={<>{Page}</>} />;
            })}
          </Routes>
        </Router>
      </ThemeConText.Provider>
    </>
  );
};

export default App;
