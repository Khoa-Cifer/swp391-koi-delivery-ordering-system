import { useState } from "react";
import "./register.scss";
import { userRegister } from "../../utils/customers/user";
import { toast } from "react-toastify";
import ToastUtil from "../../components/toastContainer";
import { Link } from "react-router-dom";

const SignUp = () => {
  // return (
  //   <div className="signup-container">
  //     <div className="signup-form">
  //       <h2>Create Account</h2>

  //       <div className="input-group">
  //         <input type="email" name="email" placeholder="Email" required />
  //       </div>

  //       <div className="input-group">
  //         <input
  //           type="password"
  //           name="password"
  //           placeholder="Password"
  //           required
  //         />
  //       </div>

  //       <button type="submit" className="signup-btn">
  //         Sign Up
  //       </button>

  //       <p className="login-link">
  //         Already have an account? <a href="/login">Login here</a>
  //       </p>
  //     </div>
  //   </div>
  // );

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function handleSubmit() {
    const email = formData.email;
    const username = formData.username;
    const password = formData.password;
    const phoneNumber = formData.phoneNumber;
    const data = await userRegister(email, username, password, phoneNumber);
    toast(data);
  };

  return (
    <div className="signup-container">
      <ToastUtil />
      <div className="signup-form">
        <h2>Create Account</h2>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <button onClick={handleSubmit} className="signup-btn">
          Sign Up
        </button>

        <p className="login-link">
          Already have an account? <Link to={"/login-customer"}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
