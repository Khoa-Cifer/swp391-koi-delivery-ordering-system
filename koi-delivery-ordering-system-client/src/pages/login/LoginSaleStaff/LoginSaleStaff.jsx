import { useNavigate } from "react-router-dom";
import { userLogin } from "../../../utils/customers/user";
import { useAuth } from "../../../authentication/AuthProvider";
import "./LoginSaleStaff.scss"
import { useState } from "react";

function LoginSaleStaff() {
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
      navigate("/sales-staff-home");
    }
  }

  return (
    <div className="login-sale-container">
      <div className="card">
        <h3 className="text-center"><strong>Sale Staff Login</strong></h3>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input type="text" id="email" placeholder="Type your email"
            onChange={(e) => handleEmailChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => handlePasswordChange(e)}
            placeholder="Type your password"
          />
        </div>

        <div className="text-end">
          <a href="#!" className="small-link">
            Forgot password?
          </a>
        </div>

        <div className="btn">
          <button type="submit" onClick={() => handleLogin(2)}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginSaleStaff