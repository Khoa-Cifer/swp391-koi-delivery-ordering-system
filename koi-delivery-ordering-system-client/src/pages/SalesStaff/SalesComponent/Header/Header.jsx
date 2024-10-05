import "./Header.scss";
import {Button, Image } from "antd";
import avatar from "../../../../assets/avatar.png";

function Header() {
  return (
    <div className="sale-header-container">
      <div className="logo">
          <Image src="./src/assets/logo.png" />
        </div>

      <div className="function">
        <Button style={{ backgroundColor: "white", color: "rgb(17, 17, 162)" }}><strong>Home</strong></Button>
        <Button style={{ backgroundColor: "white", color: "rgb(17, 17, 162)" }}><strong>About</strong></Button>
        <Button style={{ backgroundColor: "white", color: "rgb(17, 17, 162)" }}><strong>Contact</strong></Button>
      </div>

      <div className="avatar">
        <img
          src={avatar}
          alt="avatar"
          style={{ width: "5vw", height: "8vh", marginRight: "30px" }}
        />
      </div>
    </div>
  );
}

export default Header;
