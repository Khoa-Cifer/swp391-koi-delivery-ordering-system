import { NavLink } from "react-router-dom";
import "./header.scss";
function Header() {
  return (
    <div className="header-container">
      <div className="header-left">
        <div className="logo">Logo</div>
      </div>

      <div className="dashboard">
        <div className="service">SERVICE</div>
        <div className="order-tracking">ORDER TRACKING</div>
        <div className="support">SUPPORT</div>
      </div>

      <div className="search">
        <input type="text" className="search-bar" placeholder="Search..." />
        <button>Search</button>
      </div>

      <div className="header-right">
        <button className="register-btn"><NavLink to={"/register"} style={{ textDecoration: 'none', color: 'inherit' }}>Register</NavLink></button>
        <button className="login-btn"><NavLink to={"/login"} style={{ textDecoration: 'none', color: 'inherit' }}>Log In</NavLink></button>
        <button className="contact-btn"><NavLink style={{ textDecoration: 'none', color: 'inherit' }}>Contact</NavLink></button>
      </div>
    </div>
  );
}

export default Header;
