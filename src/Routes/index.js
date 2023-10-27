import { HomePage, ShopPage, LienHe, BLog } from '../Views';

export const publicRoute = [
    { path: '/', component: <HomePage /> },
    { path: '/shop', component: <ShopPage /> },
    { path: '/lienhe', component: <LienHe /> },
    { path: '/blog', component: <BLog /> },
];

export const privateRoute = [];
