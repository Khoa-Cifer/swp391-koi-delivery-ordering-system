import { useState } from "react";
import "./login.scss";
import { userLogin } from "../../utils/user";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLogin() {
    const data = await userLogin(email, password);
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
          <input type="text" placeholder="Email" onChange={(e) => handleEmailChange(e)} />
          <input type="password" placeholder="Password" onChange={(e) => handlePasswordChange(e)} />
          <div className="button__login">
            <button onClick={handleLogin}>Login</button>
          </div>
          <div className="one__line">
            <div className="line"></div>
            <span>Or</span>
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

export default Login;
