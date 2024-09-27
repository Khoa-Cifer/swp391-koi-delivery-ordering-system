import { useState } from "react";
import "./LoginCustomer.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../authentication/AuthProvider";
import { userLogin } from "../../../utils/customers/user";

function LoginCustomer() {
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

  // async function handleLogin() {
  //   console.log(userType);
  //   // const data = await userLogin(email, password);
  // }

  async function handleLogin(roleId) {
    const data = await userLogin(email, password, roleId);
    if (data) {
      auth.handleLogin(data);
      navigate("/customer-home");
    }
  }

  return (
    <div className="login">
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
            <Button onClick={() => handleLogin(1)} variant="contained" style={{ maxWidth: "70%", margin: "auto" }}>
              Customer
            </Button>
          </div>
          <a href="/register">Sign Up here</a>
        </div>
      </div>
    </div>
  );
}

export default LoginCustomer;
