import {
    HomePage,
    ShopPage,
    LienHe,
    BLog,
    Cart,
    Login,
    DangKy,
    DetailProduct,
    CreateProduct,
    Index,
    ListKhachHang,
    SelectProduct,
} from '../Views';

export const publicRoute = [
    { path: '/', component: <HomePage /> },
    { path: '/shop', component: <ShopPage /> },
    { path: '/lienhe', component: <LienHe /> },
    { path: '/blog', component: <BLog /> },
    { path: '/cart', component: <Cart /> },
    { path: '/detailproduct/:productId', component: <DetailProduct /> },
];

export const privateRoute = [
    { path: '/login', component: <Login /> },
    { path: '/dangky', component: <DangKy /> },
    { path: '/api/create/product', component: <CreateProduct /> },
    { path: '/api/admin/listkhachhang', component: <ListKhachHang /> },
    { path: '/api/admin', component: <Index /> },
    { path: '/api/select/product', component: <SelectProduct /> },
];
