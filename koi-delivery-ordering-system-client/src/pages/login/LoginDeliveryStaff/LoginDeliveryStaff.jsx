import { useState } from "react";
import "./LoginDeliveryStaff.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../authentication/AuthProvider";
import { userLogin } from "../../../utils/axios/customer";

function LoginDelivery() {
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
      navigate("/delivery-order-home");
    }
  }

  return (
    <div className="login-delivery-container">
      <div className="card">
        <h3 className="text-center">Dellivery Staff Login</h3>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Type your email"
            onChange={e => handleEmailChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Type your password"
            onChange={e => handlePasswordChange(e)}
          />
        </div>

        <div className="text-end">
          <a href="#!" className="small-link">
            Forgot password?
          </a>
        </div>

        <div className="btn">
          <button onClick={() => handleLogin(3)}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginDelivery;
