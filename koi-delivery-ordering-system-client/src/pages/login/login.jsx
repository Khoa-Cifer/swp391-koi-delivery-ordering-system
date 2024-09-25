import { useState } from "react";
import "./login.scss";
import { Button } from "@mui/material";
import { userLogin } from "../../utils/users/user";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

  async function handleCustomerLogin() {
    const data = await userLogin(email, password, 1);
    if (data.email) {
      localStorage.setItem('customerData', JSON.stringify(data));
      navigate("/");
    }
  }

  async function handleDeliveryStaffLogin() {
    const data = await userLogin(email, password, 2);
    if (data.email) {
      localStorage.setItem('deliveryStaffData', JSON.stringify(data));
      navigate("/delivery-staff");
    }
  }

  async function handleSalesStaffLogin() {
    const data = await userLogin(email, password, 3);
    console.log(data);
  }

  async function handleManagerLogin() {
    const data = await userLogin(email, password, 4);
    console.log(data);
  }

  return (
    <div className="login">
      <div className="login__image">
        <img
          src="https://img2.thuthuatphanmem.vn/uploads/2019/03/07/hinh-anh-ho-ca-koi-dep_111108115.jpg"
          alt=""
        />
      </div>

      <div className="wraper">
        <div className="login__form">
          <input type="email" placeholder="Email" onChange={(e) => handleEmailChange(e)} />
          <input type="password" placeholder="Password" onChange={(e) => handlePasswordChange(e)} />

          <div className="one__line">
            <div className="line"></div>
            <span style={{ color: "#ffbd3f" }}>Login as</span>
            <div className="line"></div>
          </div>

          <div className="role__form">
            <Button
              onClick={() => handleCustomerLogin()}
              variant="contained"
            >
              Customer
            </Button>

            <Button
              onClick={() => handleDeliveryStaffLogin()}
              variant="contained"
            >
              Sales Staff
            </Button>
          </div>

          <div className="role__form">
            <Button
              onClick={() => handleSalesStaffLogin()}
              variant="contained"
            >
              Delivery Staff
            </Button>

            <Button
              onClick={() => handleManagerLogin()}
              variant="contained"
            >
              Manager
            </Button>
          </div>

          <div className="one__line">
            <div className="line"></div>
            <span style={{ color: "#ffbd3f" }}>Or</span>
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
    </div >
  );
}

export default Login;
