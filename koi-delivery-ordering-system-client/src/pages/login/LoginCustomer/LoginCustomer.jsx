import { useState } from "react";
import "./LoginCustomer.scss";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../authentication/AuthProvider";
import { userLogin } from "../../../utils/customers/user";
import { toast } from "react-toastify";
import ToastUtil from "../../../components/toastContainer";

function LoginCustomer() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();
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

          <div className="one__line">
            <div className="line"></div>
            <span style={{ color: "black" }}>
              <strong>Login as</strong>
            </span>
            <div className="line"></div>
          </div>

          <div className="role__form">
            <Button className="customer-login-btn" onClick={() => handleLogin(1)} variant="contained" style={{ maxWidth: "70%", margin: "auto" }}>
              Customer
            </Button>
          </div>
          <div className="form__bottom">
            <Typography><Link to={"/register"}>Sign up here</Link></Typography>
            <Typography>Are you with us ?</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCustomer;
