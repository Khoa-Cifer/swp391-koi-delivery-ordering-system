import { useState } from "react";
import "./LoginCustomer.scss";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../authentication/AuthProvider";
import { userLogin } from "../../../utils/axios/customer";
import { toast } from "react-toastify";
import ToastUtil from "../../../components/toastContainer";

const modalStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: "40px",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function LoginCustomer() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSignUp = () => {
    navigate("/register");
  }

  const handleSalesStaffNavigate = () => {
    navigate("/login-sales-staff");
  }

  const handleDeliveryStaffNavigate = () => {
    navigate("/login-delivery-staff");
  }

  const handleManagerNavigate = () => {
    navigate("/login-manager")
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLogin(roleId) {
    const data = await userLogin(email, password, roleId);
    if (data) {
      auth.handleLogin(data);
      navigate("/");
    } else {
      toast("Invalid username or password");
    }
  }

  return (
    <div className="login">
      <ToastUtil />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={modalStyle}
          style={{ padding: "40px 70px" }}>
          <Button
            variant="outlined"
            style={{ backgroundColor: "#C3F4FD" }}
            onClick={() => handleDeliveryStaffNavigate()}
          >
            <Typography>Delivery Staff</Typography>
          </Button>

          <Button
            variant="outlined"
            style={{ backgroundColor: "#C3F4FD" }}
            onClick={() => handleSalesStaffNavigate()}
          >
            <Typography>Sales Staff</Typography>
          </Button>

          <Button
            variant="outlined"
            style={{ backgroundColor: "#C3F4FD" }}
            onClick={() => handleManagerNavigate()}
          >
            <Typography>Manager</Typography>
          </Button>
        </Box>
      </Modal>
      <div className="wraper">
        <div className="login__form">
          <h3 className="text-center">
            <strong>Login</strong>
          </h3>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => handleEmailChange(e)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => handlePasswordChange(e)}
          />

          <div className="role__form">
            <Button className="customer-login-btn" onClick={() => handleLogin(1)} variant="contained" style={{ maxWidth: "100%", margin: "auto" }}>
              Login
            </Button>
          </div>

          <div className="form__bottom">
            <Button
              variant="outlined"
              style={{ backgroundColor: "#C3F4FD" }}
              onClick={() => handleDeliveryStaffNavigate()}
            >
              <Typography onClick={handleSignUp} style={{ fontSize: "12px" }}>Sign Up here</Typography>
            </Button>
            <Button
              variant="outlined"
              style={{ backgroundColor: "#C3F4FD" }}
              onClick={() => handleDeliveryStaffNavigate()}
            >
              <Typography onClick={handleOpen} style={{ fontSize: "12px" }}>Are you with us ?</Typography>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCustomer;
