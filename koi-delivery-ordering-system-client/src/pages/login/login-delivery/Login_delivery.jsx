import "./Login_delivery.scss";

function LoginDelivery() {
  return (
    <div className="container">
      <div className="card">
        <h3 className="text-center">Login</h3>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Type your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Type your password"
            />
          </div>
          <div className="text-end">
            <a href="#!" className="small-link">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <div className="text-center">
          <p>
            Have not an account yet? <a href="#!">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginDelivery;
