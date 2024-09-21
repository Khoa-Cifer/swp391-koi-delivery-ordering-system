import { NavLink } from "react-router-dom";
import "./header.scss";
import { useEffect, useState } from "react";
import { Button, Popover } from "@mui/material";

function Header() {
  const [customerUsername, setCustomerUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('customerData');
    window.location.reload();
  }

  useEffect(() => {
    const customerDataFromLocalStorage = localStorage.getItem('customerData');
    if (customerDataFromLocalStorage) {
      const parsedData = JSON.parse(customerDataFromLocalStorage);
      setCustomerUsername(parsedData.username);
    };
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
        <button className="contact-btn"><NavLink style={{ textDecoration: 'none', color: 'inherit' }}>Contact</NavLink></button>
        {customerUsername ? (
          <span aria-describedby={id} onClick={handleClick}>
            Welcome, {customerUsername}
          </span>
        ) : (
          <>
            <button className="register-btn">
              <NavLink to={"/register"} style={{ textDecoration: 'none', color: 'inherit' }}>
                Register
              </NavLink>
            </button>
            <button className="login-btn">
              <NavLink to={"/login"} style={{ textDecoration: 'none', color: 'inherit' }}>
                Log In
              </NavLink>
            </button>
          </>
        )}

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Button onClick={handleLogout} sx={{ p: 2 }}>View Profile</Button>
          <Button onClick={handleLogout} sx={{ p: 2 }}>Logout</Button>
        </Popover>
      </div>
    </div>
  );
}

export default Header;
