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
            <Button onClick={() => handleLogin(1)} variant="contained">
              Customer
            </Button>

            <Button onClick={() => handleLogin(2)} variant="contained">
              Sales Staff
            </Button>
          </div>

          <div className="role__form">
            <Button onClick={() => handleLogin(3)} variant="contained">
              Delivery Staff
            </Button>

            <Button onClick={() => handleLogin(4)} variant="contained">
              Manager
            </Button>
          </div>

          <div className="one__line">
            <div className="line"></div>
            <span style={{ color: "black" }}>
              <strong>Or</strong>
            </span>
            <div className="line"></div>
          </div>

          <button className="login__google">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.3J_yQxG-eAHaTXfZVcWcrwHaHa&pid=Api&P=0&h=180"
              alt=""
              width={30}
            />
            <span>Login with google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginCustomer;
