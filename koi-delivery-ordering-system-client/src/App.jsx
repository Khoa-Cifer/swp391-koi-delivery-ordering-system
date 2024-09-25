import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import SignUp from "./pages/register/register";
import Admin from "./pages/Manager/Admin";
import Customer from "./pages/Customer/Customer";
import EditCustomerProfile from "./pages/Customer/pages/EditCustomerProfile";
import DeliveryStaff from "./pages/DeliveryStaff/Delivery_staff/Delivery_staff";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/delivery-staff" element={<DeliveryStaff />} />
        <Route path="/customer-home" element={<Customer />} />
        <Route path="/customer-edit-profile" element={<EditCustomerProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
