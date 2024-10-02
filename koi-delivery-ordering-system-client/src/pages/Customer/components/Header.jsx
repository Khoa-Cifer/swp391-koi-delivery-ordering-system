import { useState } from 'react';
import logo from '../../../assets/logo.png'
import { AppBar, Toolbar, Button, Avatar, IconButton, Menu, MenuItem, Box, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HeaderWrapper = styled(AppBar)`
  background-color: #1976d2;
`;

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenEditProfile = () => {
        navigate("/customer-edit-profile")
    }

    const handleLogout = () => {
        setAnchorEl(null);
        localStorage.removeItem('userData');
        navigate("/");
    }

    return (
        <HeaderWrapper position="fixed" sx={{ width: "100vw" }}>
            <Toolbar>
                <div className="logo"><img src={logo} alt="Logo" style={{ width: "40px" }} /></div>
                <Button color="inherit">Home</Button>
                <Button color="inherit">About</Button>
                <Button color="inherit">Contact</Button>
                <Box sx={{ ml: 2 }}>
                    <IconButton onClick={handleMenuOpen}>
                        <Avatar alt="User Avatar" src="/path-to-avatar.jpg" />
                    </IconButton>
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
                        <MenuItem onClick={handleOpenEditProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </HeaderWrapper>
    );
}

export default Header;