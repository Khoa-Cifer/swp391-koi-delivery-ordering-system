import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/register/register";
import Admin from "./pages/Manager/layout/Dashboard/Dashboard";
import Customer from "./pages/Customer/Customer";
import DeliveryStaff from "./pages/DeliveryStaff/home_delivery/delivery_staff/DeliveryStaff";
import AuthProvider from "./authentication/AuthProvider";
import PrivateRoute from "./authentication/PrivateRoute";
import DeliveryOrderHome from "./pages/DeliveryStaff/delivery_order_home/DeliveryOrderHome";
import LoginCustomer from "./pages/login/LoginCustomer/LoginCustomer";
import LoginSaleStaff from "./pages/login/LoginSaleStaff/LoginSaleStaff";
import LoginDeliveryStaff from "./pages/login/LoginDeliveryStaff/LoginDeliveryStaff";
import DeliveryOrderList from "./pages/DeliveryStaff/delivery_order_list/DeliveryOrderList";
import DeliveryOrderDetail from "./pages/DeliveryStaff/delivery_order_detail/DeliveryOrderDetail";
import DeliveryFishDetail from "./pages/DeliveryStaff/delivery_fish_detail/DeliveryFishDetail";
import LoginAdmin from "./pages/login/Loginadmin/LoginAdmin";
import OrderSalesStaff from "./pages/SalesStaff/OrderSalesStaff/OrderSalesStaff";
import CustomerLayout from "./pages/Layout/CustomerLayout/CustomerLayout";
import CustomerEditProfile from "./pages/Layout/CustomerLayout/components/CustomerEditProfile";
import SalesStaffHome from "./pages/SalesStaff/SalesStaffHome/SalesStaffHome";
import PaymentSuccess from "./utils/DefaultPages/PaymentSuccess";
import DeliveryStaffLayout from "./pages/Layout/DeliveryStaffLayout/DeliveryStaffLayout";
import SalesStaffLayout from "./pages/Layout/SalesStaffLayout/SalesStaffLayout";
import DeliveryOrderAvailable from "./pages/DeliveryStaff/delivery_available_order/DeliveryOrderAvailable";
import PublicRoute from "./authentication/PublicRoute";
import SalesOrderDetail from "./pages/SalesStaff/components/sales_order_detail/SalesOrderDetail";
import SalesFishDetail from "./pages/SalesStaff/components/sales_fish_detail/SalesFishDetail";

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

            <Route path="/admin" element={<ManagerPrivateRoute element={<Admin />} />} />

            <Route element={<CustomerLayout />}>
              <Route path="/customer-home" element={<CustomerPrivateRoute element={<Customer />} />} />
              <Route path="/customer-edit-profile" element={<CustomerPrivateRoute element={<CustomerEditProfile />} />} />
            </Route>

            <Route element={<DeliveryStaffLayout />}>
              <Route path="/delivery-staff" element={<DeliveryStaffPrivateRoute element={<DeliveryStaff />} />} />
              <Route path="/delivery-order-home" element={<DeliveryStaffPrivateRoute element={<DeliveryOrderHome />} />} />
              <Route path="/delivery-order-available" element={<DeliveryStaffPrivateRoute element={<DeliveryOrderAvailable />} />} />
              <Route path="/delivery-order-list" element={<DeliveryStaffPrivateRoute element={<DeliveryOrderList />} />} />

              <Route path="/delivery-order-detail/:id" element={<DeliveryStaffPrivateRoute element={<DeliveryOrderDetail />} />} >
                <Route path="delivery-fish-detail/:fishId" element={<DeliveryStaffPrivateRoute element={<DeliveryFishDetail />} />} />
              </Route>
            </Route>

            <Route element={<SalesStaffLayout />}>
              <Route path="/order-sales-staff" element={<SalesStaffPrivateRoute element={<OrderSalesStaff />} />} />
              <Route path="/sales-staff-home" element={<SalesStaffPrivateRoute element={<SalesStaffHome />} />} />
              <Route path="/sales-order-detail/:id" element={<SalesStaffPrivateRoute element={<SalesOrderDetail />} />} >
                <Route path="sales-fish-detail/:fishId" element={<SalesStaffPrivateRoute element={<SalesFishDetail />} />} />
              </Route>
            </Route>


            <Route path="/payment-success" element={<AllowedRoute element={<PaymentSuccess />} />} />


          </Routes>
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;