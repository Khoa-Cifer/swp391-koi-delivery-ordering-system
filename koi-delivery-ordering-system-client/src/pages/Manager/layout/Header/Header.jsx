import { Avatar, Box, Menu, MenuItem } from "@mui/material";
import "./header.scss"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import default_avatar from "../../../../assets/default-avatar.jpg";
import { useAuth } from "../../../../authentication/AuthProvider";
import { jwtDecode } from 'jwt-decode';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const auth = useAuth();
  const [imagePreview, setImagePreview] = useState(default_avatar);
  
  const token = localStorage.getItem("token");
  const customerInfo = jwtDecode(token);

  const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
      setAnchorEl(null);
  };

  const handleLogout = () => {
      setAnchorEl(null);
      auth.handleLogout();
      navigate("/");
  }

  return (
    <div className="header">
      <div className="header-left">

        <h3>Dashboard</h3>
        <h3>Koi Fish Deliveries</h3>
      </div>

      <div>
        <Box sx={{ ml: 2 }}>
          <Avatar
            src={imagePreview}
            onClick={handleMenuOpen}
            alt="avatar"
            style={{ width: "4vw", height: "8vh", marginRight: "30px" }}
          />
          <Menu
            style={{ marginTop: "40px" }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </div>
    </div>
  );
}

export default Header;
