import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/register/register";
import Admin from "./pages/Manager/Admin";
import Customer from "./pages/Customer/Customer";
import EditCustomerProfile from "./pages/Customer/components/EditCustomerProfile";
import DeliveryStaff from "./pages/DeliveryStaff/home_delivery/delivery_staff/DeliveryStaff";
import AuthProvider from "./authentication/AuthProvider";
import PrivateRoute from "./authentication/PrivateRoute";
import OrderAvailable from "./pages/DeliveryStaff/delivery_available_order/OrderAvailable"
import DeliveryOrderHome from "./pages/DeliveryStaff/delivery_order_home/DeliveryOrderHome"
import LoginCustomer from "./pages/login/LoginCustomer/LoginCustomer";
import LoginSaleStaff from "./pages/login/LoginSaleStaff/LoginSaleStaff";
import LoginDeliveryStaff from "./pages/login/LoginDeliveryStaff/LoginDeliveryStaff";
import DeliveryOrderList from "./pages/DeliveryStaff/delivery_order_list/DeliveryOrderList";
import DeliveryOrderDetail from "./pages/DeliveryStaff/delivery_order_detail/DeliveryOrderDetail";
import DeliveryFishDetail from "./pages/DeliveryStaff/delivery_fish_detail/DeliveryFishDetail";
import LoginAdmin from "./pages/login/LoginAdmin/LoginAdmin";

function App() {
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

            <Route path="/admin" element={
              <PrivateRoute allowedRoles={4}>
                <Admin />
              </PrivateRoute>
            } />

            <Route path="/admin" element={<Admin />} />
            <Route path="/delivery-staff" element={
              <PrivateRoute allowedRoles={3}>
                <DeliveryStaff />
              </PrivateRoute>
            } />

            <Route path="/customer-edit-profile" element={
              <PrivateRoute allowedRoles={1}>
                <EditCustomerProfile />
              </PrivateRoute>
            } />


            <Route path="/customer-home" element={
              <PrivateRoute allowedRoles={1}>
                <Customer />
              </PrivateRoute>
            } />

            <Route path="/delivery-order-home" element={
              <PrivateRoute allowedRoles={2}>
                <DeliveryOrderHome />
              </PrivateRoute>
            } />


            <Route path="/order-available" element={
              <PrivateRoute allowedRoles={2}>
                <OrderAvailable />
              </PrivateRoute>
            } />

            <Route path="/delivery-order-list" element={
              <PrivateRoute allowedRoles={2}>
                <DeliveryOrderList />
              </PrivateRoute>
            } />

            <Route path="/delivery-order-detail" element={
              <PrivateRoute allowedRoles={2}>
                <DeliveryOrderDetail />
              </PrivateRoute>
            } />

            <Route path="/delivery-fish-detail" element={
              <PrivateRoute allowedRoles={2}>
                <DeliveryFishDetail />
              </PrivateRoute>
            } />
          </Routes>
        </Router>
      </main>
    </AuthProvider>
  );
}


export default App;
