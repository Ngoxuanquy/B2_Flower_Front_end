import { HomePage, ShopPage, LienHe, BLog, Cart } from '../Views';

export const publicRoute = [
    { path: '/', component: <HomePage /> },
    { path: '/shop', component: <ShopPage /> },
    { path: '/lienhe', component: <LienHe /> },
    { path: '/blog', component: <BLog /> },
    { path: '/cart', component: <Cart /> },

];

export const privateRoute = [];
