import { useState } from "react";
import "./LoginAdmin.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../authentication/AuthProvider";
import { userLogin } from "../../../utils/axios/user";

function LoginAdmin() {
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
      navigate("/admin");
    }
  }

  return (
    <div className="login-admin-container">
      <div className="card">
        <h3 className="text-center">
          <strong>Admin Login</strong>
        </h3>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Type your email"
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

          <div className="btn">
            <button type="submit" onClick={() => handleLogin(4)}>Login</button>
          </div>
      </div>
    </div>
  );
}
export default LoginAdmin;
