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
  Information,
  ForgotPassword,
} from "../Views";
import Admin from "../Views/Pages/Admin/Admin";
import Chats from "../Views/Pages/Admin/Chats";
import DashBoard from "../Views/Pages/Admin/DashBoard";

import UserList from "../Views/Pages/Admin/User/UserList";
import SelectProducts from "../Views/Pages/Admin/SelectProduct/index";
import ProductList from "../Views/Pages/Admin/Product/ProductList/ProductList";
import ProductUpload from "../Views/Pages/Admin/Product/ProductUpload/ProductUpload";
import Orders from "../Views/Pages/Admin/Orders/Orders";
import OrdersSent from "../Views/Pages/Admin/OrdersSent/OrdersSent";
import ShopIntroduce from "../Views/Pages/ShopIntroduce/ShopIntroduce";
import Discounts from "../Views/Pages/Discounts/Discounts";

export const publicRoute = [
  { path: "/", component: <HomePage /> },
  { path: "/shop", component: <ShopPage /> },
  { path: "/introduce", component: <ShopIntroduce /> },
  { path: "/lienhe", component: <LienHe /> },
  { path: "/blog", component: <BLog /> },
  { path: "/cart", component: <Cart /> },
  { path: "/information", component: <Information /> },
  { path: "/detailproduct/:productId", component: <DetailProduct /> },
];

export const privateRoute = [
  { path: "/login", component: <Login /> },
  { path: "/dangky", component: <DangKy /> },
  { path: "/quenmatkhau", component: <ForgotPassword /> },
];

export const adminRoute = [
  { path: "/api/create/product", component: <CreateProduct /> },
  { path: "/api/admin/listkhachhang", component: <ListKhachHang /> },
  { path: "/api/admin", component: <Index /> },
  { path: "/api/select/product", component: <SelectProduct /> },
  { path: "/admin", component: <Admin /> },
  { path: "/admin/Message", component: <Chats /> },
  { path: "/admin/user", component: <UserList /> },
  // { path: "/admin/user-list", component: <User /> },
  { path: "/admin/product-list", component: <ProductList /> },
  { path: "/admin/product-upload", component: <ProductUpload /> },
  { path: "/admin/dash-board", component: <DashBoard /> },
  { path: "/admin/user-list", component: <UserList /> },
  { path: "/admin/listOrders", component: <Orders /> },
  { path: "/admin/đơn-đã-gửi", component: <OrdersSent /> },
  { path: "/admin/discount", component: <Discounts /> },

];
