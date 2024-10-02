import "./Header.scss";
import {Button } from "antd";
import logo from "../../../../assets/logo.png";
import avatar from "../../../../assets/avatar.png";

function Header() {
  return (
    <div className="sale-header-container">
      <div className="logo">
        <img
          src={logo}
          alt="Logo"
          style={{ width: "180px", height: "180px" }}
        />
      </div>

      <div className="function">
        <Button style={{ backgroundColor: "white", color: "rgb(17, 17, 162)" }}><strong>Home</strong></Button>
        <Button style={{ backgroundColor: "white", color: "rgb(17, 17, 162)" }}><strong>About</strong></Button>
        <Button style={{ backgroundColor: "white", color: "rgb(17, 17, 162)" }}><strong>Contact</strong></Button>
      </div>

      <div className="logo">
        <img
          src={avatar}
          alt="avatar"
          style={{ width: "5vw", height: "10vh", marginRight: "30px" }}
        />
      </div>
    </div>
  );
}

export default Header;
