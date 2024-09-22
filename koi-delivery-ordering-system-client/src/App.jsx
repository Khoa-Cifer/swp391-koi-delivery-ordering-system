import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import SignUp from "./pages/register/register";
import Admin from "./pages/Manager/Admin";
import Customer from "./pages/Customer/Customer";
import CustomerHomePage from "./pages/Customer/CustomerHomePage/CustomerHomePage";
import DeliveryStaff from "./pages/DeliveryStaff/delivery_staff";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/delivery-staff" element={<DeliveryStaff />} />
        <Route path="/customer-home" element={<CustomerHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
