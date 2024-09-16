import "./register.scss";

const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create Account</h2>

        <div className="input-group">
          <input type="email" name="email" placeholder="Email" required />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="signup-btn">
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
