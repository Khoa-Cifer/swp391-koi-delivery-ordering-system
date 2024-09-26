import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import SignUp from "./pages/register/register";
import Admin from "./pages/Manager/Admin";
import Customer from "./pages/Customer/Customer";
import EditCustomerProfile from "./pages/Customer/pages/EditCustomerProfile";
import AuthProvider from "./authentication/AuthProvider";
import PrivateRoute from "./authentication/PrivateRoute";
import DeliveryStaff from "./pages/Manager/components/DeliveryStaff/DeliveryStaff";
import DeliveryOrderHome from "./pages/DeliveryStaff/delivery_order_home/DeliveryOrderHome";
import OrderAvailable from "./pages/DeliveryStaff/delivery_available_order/OrderAvailable";
function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />

            <Route path="/deliveryOrderHome" element={<DeliveryOrderHome />} />
            <Route path="/orderAvailable" element={<OrderAvailable />} />

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
