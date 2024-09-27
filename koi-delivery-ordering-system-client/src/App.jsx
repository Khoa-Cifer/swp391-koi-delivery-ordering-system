import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import SignUp from "./pages/register/register";
import Admin from "./pages/Manager/Admin";
import Customer from "./pages/Customer/Customer";
import EditCustomerProfile from "./pages/Customer/pages/EditCustomerProfile";
import DeliveryStaff from "./pages/DeliveryStaff/home_delivery/Delivery_staff/Delivery_staff";
import AuthProvider from "./authentication/AuthProvider";
import PrivateRoute from "./authentication/PrivateRoute";
import OrderAvailable from "./pages/DeliveryStaff/delivery_available_order/OrderAvailable";
import DeliveryOrderHome from "./pages/DeliveryStaff/delivery_order_home/DeliveryOrderHome";
import LoginCustomer from "./pages/login/LoginCustomer/LoginCustomer";
import LoginSaleStaff from "./pages/login/LoginSaleStaff/LoginSaleStaff";
import LoginDeliveryStaff from "./pages/login/LoginDeliveryStaff/LoginDeliveryStaff";
import LoginAdmin from "./pages/login/LoginAdmin/LoginAdmin";
import DeliveryFishDetail from "./pages/DeliveryStaff/delivery_fish_detail/DeliveryFishDetail";
import DeliveryOrderDetail from "./pages/DeliveryStaff/delivery_order_detail/DeliveryOrderDetail";

function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/LoginCustomer" element={<LoginCustomer />} />
            <Route path="/LoginSaleStaff" element={<LoginSaleStaff />} />
            <Route
              path="/LoginDeliveryStaff"
              element={<LoginDeliveryStaff />}
            />
            <Route path="/LoginAdmin" element={<LoginAdmin />} />

            <Route
              path="/admin"
              element={
                <PrivateRoute allowedRoles={4}>
                  <Admin />
                </PrivateRoute>
              }
            />
            {/* <Route path="/admin" element={<Admin />} /> */}
            <Route
              path="/delivery-staff"
              element={
                <PrivateRoute allowedRoles={3}>
                  <DeliveryStaff />
                </PrivateRoute>
              }
            />

            <Route
              path="/customer-edit-profile"
              element={
                <PrivateRoute allowedRoles={1}>
                  <EditCustomerProfile />
                </PrivateRoute>
              }
            />

            <Route path="/deliveryOrderHome" element={<DeliveryOrderHome />} />
            <Route path="/orderAvailable" element={<OrderAvailable />} />
            <Route
              path="/DeliveryFishDetail"
              element={<DeliveryFishDetail />}
            />

            <Route
              path="/DeliveryOrderDetail"
              element={<DeliveryOrderDetail />}
            />

            <Route
              path="/customer-home"
              element={
                <PrivateRoute allowedRoles={1}>
                  <Customer />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;
