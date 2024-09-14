import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/login/login";
import Home from "./pages/home/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
