import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import SignUp from "./pages/register/register";
import Admin from "./pages/Manager/Admin";
import Customer from "./pages/Customer/Customer";
import EditCustomerProfile from "./pages/Customer/pages/EditCustomerProfile";
import DeliveryStaff from "./pages/DeliveryStaff/Delivery_staff/Delivery_staff";
import AuthProvider from "./authentication/AuthProvider";
import PrivateRoute from "./authentication/PrivateRoute";


function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
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
