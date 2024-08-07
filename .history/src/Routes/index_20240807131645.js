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
  CancelProduct,
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
import ResertPassword from "../Views/Pages/ResertPassword/ResertPassword";
import FlowerCancellationList from "../Views/Pages/FlowerCancellationList/FlowerCancellationList";
import FlowerApprovedList from "../Views/Pages/FlowerApprovedList/FlowerApprovedList";
import OrdersReceived from "../Views/Pages/Admin/OrdersReceived/OrdersReceived";

export const publicRoute = [
  { path: "/", component: <HomePage /> },
  { path: "/shop", component: <ShopPage /> },
  { path: "/introduce", component: <ShopIntroduce /> },
  { path: "/lienhe", component: <LienHe /> },
  { path: "/blog", component: <BLog /> },
  { path: "/cart", component: <Cart /> },
  { path: "/information", component: <Information /> },
  { path: "/ResertPassword", component: <ResertPassword /> },
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
  { path: "/admin/danh-sách-sản-phẩm", component: <ProductList /> },
  { path: "/admin/thêm-sảm-phẩm", component: <ProductUpload /> },
  { path: "/admin/dash-board", component: <DashBoard /> },
  { path: "/admin/user-list", component: <UserList /> },
  { path: "/admin/danh-sách-đơn-hàng", component: <Orders /> },
  { path: "/admin/đơn-hàng-đã-gửi", component: <OrdersSent /> },
  { path: "/admin/discount", component: <Discounts /> },
  { path: "/admin/cancelProduct", component: <CancelProduct /> },
  { path: "/admin/danh-sách-hủy-hoa", component: <FlowerCancellationList /> },
  { path: "/admin/danh-sách-đã-duyệt", component: <FlowerApprovedList /> },
  { path: "/admin/sản-phẩm-đã-giao", component: <OrdersReceived /> },
];
