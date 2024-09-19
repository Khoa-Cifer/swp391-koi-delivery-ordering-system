import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
<<<<<<< HEAD
import Register from "./pages/register/register";
import Admin from "./pages/Manager/Admin";
=======
import SignUp from "./pages/register/register";
>>>>>>> 7aae8068589d3496231b29c0ba8772d332d1b04d

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
<<<<<<< HEAD
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
=======
        <Route path="/register" element={<SignUp />} />
>>>>>>> 7aae8068589d3496231b29c0ba8772d332d1b04d
      </Routes>
    </Router>
  );
}

export default App;
