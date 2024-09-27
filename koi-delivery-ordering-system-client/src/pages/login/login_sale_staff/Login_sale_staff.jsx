import "./Login_sale_staff.scss"

function Login_sale_staff() {
  return (
    <div className="login-sale-container">
      <div className="card">
        <h3 className="text-center"><strong>Sale Staff Login</strong></h3>
        <form>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input type="text" id="email" placeholder="Type your email" />
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

          <div className="btn">
          <button type="submit" >
            Login
          </button>
          </div>
          
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

export default Login_sale_staff