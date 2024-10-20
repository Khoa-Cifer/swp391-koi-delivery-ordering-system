import { useState } from "react";
import "./register.scss";
import { userRegister } from "../../utils/axios/customer";
import { toast } from "react-toastify";
import ToastUtil from "../../components/toastContainer";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/SpinnerLoading";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const email = formData.email;
      const username = formData.username;
      const password = formData.password;
      const phoneNumber = formData.phoneNumber;

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        toast("Please enter a valid email address.");
        setIsLoading(false); // Stop loading spinner if validation fails
        return; // Stop the form submission process
      }

      const response = await userRegister(email, username, password, phoneNumber);
      if (response) {
        toast("Registration successfully");
        setTimeout(() => {
          navigate("/waiting-for-confirmation");  // Replace with your desired route
        }, 2000);
      } else {
        toast("This email already exists");
      }
    } catch (error) {
      console.error("Error while receiving the order:", error);
      toast("An error occurred while processing request.");
    } finally {
      setIsLoading(false); // Hide loading spinner after processing
    }
  }

  return (
    <div className="signup-container">
      <ToastUtil />{isLoading && <Spinner />}
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