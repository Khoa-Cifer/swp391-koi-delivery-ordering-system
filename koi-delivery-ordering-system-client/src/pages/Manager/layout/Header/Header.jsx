import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import "./header.scss"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import default_avatar from "../../../../assets/default-avatar.jpg";
import { useAuth } from "../../../../authentication/AuthProvider";
import { jwtDecode } from 'jwt-decode';

function Header() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/");
  }

  return (
    <div className="header">
      <div className="header-left">
        <h3>Dashboard</h3>
        <h3>Koi Fish Deliveries</h3>
      </div>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: "20px"
        }}
      >
        <Button onClick={() => handleLogout()} variant="contained" style={{ margin: "auto" }}>Logout</Button>
      </Box>
    </div>
  );
}

export default Header;
