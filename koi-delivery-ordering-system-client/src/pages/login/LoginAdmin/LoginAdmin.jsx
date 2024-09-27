import "./LoginAdmin.scss";

function Login_admin() {
  return (
    <div className="login-admin-container">
      <div className="card">
        <h3 className="text-center">
          <strong>Admin Login</strong>
        </h3>
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

          <div className="btn">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login_admin;
