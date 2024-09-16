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
        <button className="register-btn">Register</button>
        <button className="login-btn">Log In</button>
        <button className="contact-btn">Contact</button>
      </div>
    </div>
  );
}

export default Header;
