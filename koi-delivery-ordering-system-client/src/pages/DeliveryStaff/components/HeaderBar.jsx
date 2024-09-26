import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  styled,
} from "@mui/material";
const HeaderWrapper = styled(AppBar)`
  background-color: #1976d2;
`;
const HeaderBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <HeaderWrapper position="fixed" sx={{ width: "100vw" }}>
      <Toolbar>
        <div className="logo">
          <img src={"./assets/logo.png"} alt="Logo" style={{ width: "40px" }} />
        </div>
        <Button color="inherit">Home</Button>
        <Button color="inherit">About</Button>
        <Button color="inherit">Contact</Button>
        <Box sx={{ ml: 2 }}>
          <IconButton onClick={handleMenuOpen}>
            <Avatar alt="User Avatar" src="/path-to-avatar.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </HeaderWrapper>
  );
};
export default HeaderBar;
