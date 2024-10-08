import { Box, Button, Divider } from "@mui/material";
import "./header.scss"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../../authentication/AuthProvider";

function Header() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/");
  }

  return (
    <div>
      <div className="header">
        <div className="header-left">
          {/* <h3>Dashboard</h3>   */}
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
      <Divider />
    </div>
  );
}

export default Header;
