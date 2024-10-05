import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/register/register";
import Admin from "./pages/Manager/layout/Dashboard/Dashboard";
import Customer from "./pages/Customer/Customer";
import DeliveryStaff from "./pages/DeliveryStaff/home_delivery/delivery_staff/DeliveryStaff";
import AuthProvider from "./authentication/AuthProvider";
import PrivateRoute from "./authentication/PrivateRoute";
import OrderAvailable from "./pages/DeliveryStaff/delivery_available_order/OrderAvailable";
import DeliveryOrderHome from "./pages/DeliveryStaff/delivery_order_home/DeliveryOrderHome";
import LoginCustomer from "./pages/login/LoginCustomer/LoginCustomer";
import LoginSaleStaff from "./pages/login/LoginSaleStaff/LoginSaleStaff";
import LoginDeliveryStaff from "./pages/login/LoginDeliveryStaff/LoginDeliveryStaff";
import DeliveryOrderList from "./pages/DeliveryStaff/delivery_order_list/DeliveryOrderList";
import DeliveryOrderDetail from "./pages/DeliveryStaff/delivery_order_detail/DeliveryOrderDetail";
import DeliveryFishDetail from "./pages/DeliveryStaff/delivery_fish_detail/DeliveryFishDetail";
import LoginAdmin from "./pages/login/Loginadmin/LoginAdmin";
import Order_Sales_Staff from "./pages/SalesStaff/OrderSalesStaff/Order_Sales_Staff";
import CustomerLayout from "./pages/Layout/CustomerLayout/CustomerLayout";
import CustomerEditProfile from "./pages/Layout/CustomerLayout/components/CustomerEditProfile";
import Used_sales_staff from "./pages/SalesStaff/UsedSalesStaff/Used_sales_staff";
import SalesStaffHome from "./pages/SalesStaff/SalesStaffHome/SalesStaffHome";
import PaymentSuccess from "./utils/DefaultPages/PaymentSuccess";

function App() {
  // eslint-disable-next-line react/prop-types
  const CustomerPrivateRoute = ({ element }) => (
    <PrivateRoute allowedRoles={1}>
      {element}
    </PrivateRoute>
  );

  const SalesStaffPrivateRoute = ({ element }) => (
    <PrivateRoute allowedRoles={2}>
      {element}
    </PrivateRoute>
  );

  const DeliveryStaffPrivateRoute = ({ element }) => (
    <PrivateRoute allowedRoles={3}>
      {element}
    </PrivateRoute>
  );

  const ManagerPrivateRoute = ({ element }) => (
    <PrivateRoute allowedRoles={4}>
      {element}
    </PrivateRoute>
  );

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

            {/* <Route path="/admin" element={<ManagerPrivateRoute element={<Admin />} />} /> */}

            <Route path="/admin" element={<Admin />} />

            <Route element={<CustomerLayout />}>
              <Route path="/customer-home" element={<CustomerPrivateRoute element={<Customer />} />} />
              <Route path="/customer-edit-profile" element={<CustomerPrivateRoute element={<CustomerEditProfile />} />} />
            </Route>


            {/* <Route path="/delivery-staff" element={<DeliveryStaffPrivateRoute element={<DeliveryStaff />} />} />
            <Route path="/delivery-order-home" element={<DeliveryStaffPrivateRoute element={<DeliveryOrderHome />} />} />
            <Route path="/order-available" element={<DeliveryStaffPrivateRoute element={<OrderAvailable />} />} />
            <Route path="/delivery-order-list" element={<DeliveryStaffPrivateRoute element={<DeliveryOrderList />} />} />
            <Route path="/delivery-order-detail" element={<DeliveryStaffPrivateRoute element={<DeliveryOrderDetail />} />} />
            <Route path="/delivery-fish-detail" element={<DeliveryStaffPrivateRoute element={<DeliveryFishDetail />} />} /> */}

            <Route path="/delivery-staff" element={ <DeliveryStaff />} />
            <Route path="/delivery-order-home" element={<DeliveryOrderHome />} />
            <Route path="/order-available" element={<OrderAvailable/>} />
            <Route path="/delivery-order-list" element={<DeliveryOrderList />} />
            <Route path="/delivery-order-detail" element={<DeliveryOrderDetail />} />
            <Route path="/delivery-fish-detail" element={<DeliveryFishDetail  />} />

            <Route path="/order-sales-staff" element={<Order_Sales_Staff />} />
            <Route path="/used-sales-staff" element={<Used_sales_staff />} />
            <Route path="/sales-staff-home" element={<SalesStaffHome />} />

            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Routes>
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;