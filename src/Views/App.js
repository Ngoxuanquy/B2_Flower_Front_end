import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './Layouts/DefaultLayout/DefaultLayout';
import { publicRoute, privateRoute } from '../Routes';
import { ScrollToTop } from '../Components';
import React, { useState, useEffect, useCallback } from 'react';
import theme from '../config/theme';
import ThemeConText from '../config/themeConText';
import { EventRegister } from 'react-event-listeners';
import { Call_Post_Api } from '../Components/CallApi/CallApis';
import Cookies from 'js-cookie';
import AdminHeader from '../Components/Admin/Header/AdminHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SideBar from '../Components/Admin/SideBars';

const App = () => {
    const [mode, setMode] = useState(false);
    const [ordersLength, setOrderLength] = useState(0);

    useEffect(() => {
        const handleChangeTheme = (data) => {
            setMode(data);
        };

        const changeThemeListener = EventRegister.addEventListener(
            'changeTheme',
            handleChangeTheme,
        );

        return () => {
            EventRegister.removeEventListener(changeThemeListener);
        };
    }, []);

    useEffect(() => {
        const fetchCartData = async () => {
            const token = Cookies.get('accessToken');
            const id = Cookies.get('id');
            const cleanedJwtString = token?.replace(/"/g, '');
            const cleanId = id?.replace(/"/g, '');

            if (cleanedJwtString) {
                try {
                    const data = await Call_Post_Api(
                        { userId: cleanId },
                        cleanedJwtString,
                        cleanId,
                        '/cart/getlistCart',
                    );

                    if (data && data.metadata && data.metadata.cart_products) {
                        setOrderLength(data.metadata.cart_products.length);
                        EventRegister.emit(
                            'chaneLength',
                            data.metadata.cart_products.length,
                        );
                    }
                } catch (err) {
                    console.error('Error fetching cart data:', err);
                }
            }
        };

        fetchCartData();
    }, []);

    return (
        <ThemeConText.Provider
            value={[mode ? theme.dark : theme.light, ordersLength]}
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
                                        <Page />
                                    </DefaultLayout>
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
                                        <AdminHeader />
                                        <div className="main d-flex">
                                            <div className="sidebarWrapper">
                                                <SideBar />
                                            </div>
                                            <div
                                                className="contents"
                                                style={{ width: '100%' }}
                                            >
                                                <Page />
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
