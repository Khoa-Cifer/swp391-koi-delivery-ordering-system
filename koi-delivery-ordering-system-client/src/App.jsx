import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import SignUp from "./pages/register/register";
import Admin from "./pages/Manager/Admin";
import Customer from "./pages/Customer/Customer";
import EditCustomerProfile from "./pages/Customer/pages/EditCustomerProfile";
import DeliveryStaff from "./pages/DeliveryStaff/home_delivery/Delivery_staff/Delivery_staff";
import AuthProvider from "./authentication/AuthProvider";
import PrivateRoute from "./authentication/PrivateRoute";
import OrderAvailable from "./pages/DeliveryStaff/delivery_available_order/OrderAvailable"
import DeliveryOrderHome from "./pages/DeliveryStaff/delivery_order_home/DeliveryOrderHome"
import Login from "./pages/login/Login_home/login";
import Login_delivery from "./pages/login/login-delivery/Login_delivery";

function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-delivery" element={<Login_delivery />} />
            <Route path="/register" element={<SignUp />} />

            <Route path="/admin" element={
              <PrivateRoute allowedRoles={4}>
                <Admin />
              </PrivateRoute>
            } />
            {/* <Route path="/admin" element={<Admin />} /> */}
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
            <Route path="/deliveryOrderHome" element={<DeliveryOrderHome />} />
            <Route path="/orderAvailable" element={<OrderAvailable />} />
            <Route path="/customer-home" element={
              <PrivateRoute allowedRoles={1}>
                <Customer />
              </PrivateRoute>
            } />

          </Routes>
        </Router>
      </main>
    </AuthProvider>
  );
}


export default App;
