import { useState } from "react";
import { userRegister } from "../../utils/users/user";
import "./register.scss";

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
    const data = await userRegister(email, username, password);
    console.log(data);
  };

  return (
    <div className="signup-container">
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
            type="username"
            name="username"
            placeholder="Username"
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
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
