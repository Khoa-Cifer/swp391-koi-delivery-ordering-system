import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/register/register";
import DeliveryStaffHome from "./pages/DeliveryStaff/home_delivery/Delivery_staff/DeliveryStaffHome";
import AuthProvider from "./authentication/AuthProvider";
import PrivateRoute from "./authentication/PrivateRoute";
import DeliveryOrderHome from "./pages/DeliveryStaff/delivery_order_home/DeliveryOrderHome";
import LoginCustomer from "./pages/login/LoginCustomer/LoginCustomer";
import LoginSaleStaff from "./pages/login/LoginSaleStaff/LoginSaleStaff";
import LoginDeliveryStaff from "./pages/login/LoginDeliveryStaff/LoginDeliveryStaff";
import DeliveryOrderDetail from "./pages/DeliveryStaff/delivery_order_detail/DeliveryOrderDetail";
import DeliveryFishDetail from "./pages/DeliveryStaff/delivery_fish_detail/DeliveryFishDetail";
import LoginAdmin from "./pages/login/LoginAdmin/LoginAdmin";
import PostedOrderSalesStaff from "./pages/SalesStaff/OrderSalesStaff/PostedOrderSalesStaff";
import CustomerLayout from "./pages/Layout/CustomerLayout/CustomerLayout";
import CustomerEditProfile from "./pages/Customer/CustomerEditProfile/CustomerEditProfile";
import SalesStaffHome from "./pages/SalesStaff/SalesStaffHome/SalesStaffHome";
import PaymentSuccess from "./utils/DefaultPages/PaymentSuccess";
import DeliveryStaffLayout from "./pages/Layout/DeliveryStaffLayout/DeliveryStaffLayout";
import SalesStaffLayout from "./pages/Layout/SalesStaffLayout/SalesStaffLayout";
import DeliveryOrderAvailable from "./pages/DeliveryStaff/delivery_available_order/DeliveryOrderAvailable";
import PublicRoute from "./authentication/PublicRoute";
import SalesOrderDetail from "./pages/SalesStaff/components/SalesOrderDetail/SalesOrderDetail";
import SalesFishDetail from "./pages/SalesStaff/components/SalesFishDetail/SalesFishDetail";
// import BasicLayout from "./pages/Layout/BasicLayout/BasicLayout";
import CustomerCreateOrder from "./pages/Customer/CustomerCreateOrder/CustomerCreateOrder";
import CustomerHome from "./pages/Customer/CustomerHome/CustomerHome";
import Report from "./pages/Manager/Report/Report";
import ManagerLayout from "./pages/Layout/ManagerLayout/ManagerLayout";
import Storage from "./pages/Manager/SystemData/Storage/Storage";
import Customer from "./pages/Manager/SystemData/Customer/Customer";
import DeliveryStaff from "./pages/Manager/SystemData/DeliveryStaff/DeliveryStaff";
import SalesStaff from "./pages/Manager/SystemData/SalesStaff/SalesStaff";
import Dashboard from "./pages/Manager/Report/Dashboard";
import TrackingOrder from "./pages/public/TrackingOrder/TrackingOrder";
import "./App.css"
import PaymentRate from "./pages/Manager/SystemData/PaymentRate/PaymentRate";
import ReceivedOrderSalesStaff from "./pages/SalesStaff/OrderSalesStaff/ReceivedOrderSalesStaff";
import CustomerEditOrder from "./pages/Customer/CustomerEditOrder/CustomerEditOrder";
import SalesStaffNews from "./pages/SalesStaff/SalesStaffNews/SalesStaffNews";

function App() {
  // eslint-disable-next-line react/prop-types
  const CustomerPrivateRoute = ({ element }) => (
    <PrivateRoute allowedRoles={1}>
      {element}
    </PrivateRoute>
  );

  // eslint-disable-next-line react/prop-types
  const SalesStaffPrivateRoute = ({ element }) => (
    <PrivateRoute allowedRoles={2}>
      {element}
    </PrivateRoute>
  );

  // eslint-disable-next-line react/prop-types
  const DeliveryStaffPrivateRoute = ({ element }) => (
    <PrivateRoute allowedRoles={3}>
      {element}
    </PrivateRoute>
  );

  // eslint-disable-next-line react/prop-types
  const ManagerPrivateRoute = ({ element }) => (
    <PrivateRoute allowedRoles={4}>
      {element}
    </PrivateRoute>
  );

  // eslint-disable-next-line react/prop-types
  const AllowedRoute = ({ element }) => (
    <PublicRoute>
      {element}
    </PublicRoute>
  )

  return (
    <AuthProvider>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />

            <Route path="/login-customer" element={<LoginCustomer />} />
            <Route path="/login-sales-staff" element={<LoginSaleStaff />} />
            <Route path="/login-delivery-staff" element={<LoginDeliveryStaff />} />
            <Route path="/login-admin" element={<LoginAdmin />} />

            <Route element={<ManagerLayout />}>
              <Route path="/admin/report" element={<ManagerPrivateRoute element={<Report />} />} />
              <Route path="/admin/dashboard" element={<ManagerPrivateRoute element={<Dashboard />} />} />
              <Route path="/admin/storage" element={<ManagerPrivateRoute element={<Storage />} />} />
              <Route path="/admin/customer" element={<ManagerPrivateRoute element={<Customer />} />} />
              <Route path="/admin/delivery-staff" element={<ManagerPrivateRoute element={<DeliveryStaff />} />} />
              <Route path="/admin/sales-staff" element={<ManagerPrivateRoute element={<SalesStaff />} />} />
              <Route path="/admin/payment-rate" element={<ManagerPrivateRoute element={<PaymentRate />} />} />
            </Route>

            <Route element={<CustomerLayout />}>
              <Route path="/customer-home" element={<CustomerPrivateRoute element={<CustomerHome />} />} />
              <Route path="/customer-create-order" element={<CustomerPrivateRoute element={<CustomerCreateOrder />} />} />
              <Route path="/customer-edit-profile" element={<CustomerPrivateRoute element={<CustomerEditProfile />} />} />
              <Route path="/customer-edit-order/:id" element={<CustomerPrivateRoute element={<CustomerEditOrder />} />} />
            </Route>

            <Route path="/delivery-staff-home" element={<DeliveryStaffPrivateRoute element={<DeliveryStaffHome />} />} />

            <Route element={<DeliveryStaffLayout />}>
              <Route path="/delivery-order-home" element={<DeliveryStaffPrivateRoute element={<DeliveryOrderHome />} />} />
              <Route path="/delivery-order-available" element={<DeliveryStaffPrivateRoute element={<DeliveryOrderAvailable />} />} />

              <Route path="/delivery-order-detail/:id" element={<DeliveryStaffPrivateRoute element={<DeliveryOrderDetail />} />} />
              <Route path="/delivery-order-detail/:id/delivery-fish-detail" element={<DeliveryStaffPrivateRoute element={<DeliveryFishDetail />} />} />
            </Route>

            <Route element={<SalesStaffLayout />}>
              <Route path="/posted-order-sales-staff" element={<SalesStaffPrivateRoute element={<PostedOrderSalesStaff />} />} />
              <Route path="/received-order-sales-staff" element={<SalesStaffPrivateRoute element={<ReceivedOrderSalesStaff />} />} />
              <Route path="/sales-staff-home" element={<SalesStaffPrivateRoute element={<SalesStaffHome />} />} />
              <Route path="/sales-order-detail/:id" element={<SalesStaffPrivateRoute element={<SalesOrderDetail />} />} />
              <Route path="/sales-order-detail/:id/sales-fish-detail" element={<SalesStaffPrivateRoute element={<SalesFishDetail />} />} />
              <Route path="/news-sales-staff" element={<SalesStaffPrivateRoute element={<SalesStaffNews />} />} />
            </Route>

            <Route path="/payment-success" element={<AllowedRoute element={<PaymentSuccess />} />} />

            <Route path="/tracking-order" element={<TrackingOrder />} />
          </Routes>
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;