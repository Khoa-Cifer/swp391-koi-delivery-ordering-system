import "./Header.scss"
import { Avatar, Button } from "antd";
import logo from '../../../../assets/logo.png';

function Header() {
  return (
    <div className="sale-header-container">
      <div className="logo">
      <div className="logo"><img src={logo} alt="Logo" style={{ width: "180px", height:"180px"}}  /></div>
      </div>

      <div className="function">
        <Button style={{backgroundColor: "white", color: ""}}>Home</Button>
        <Button style={{backgroundColor: "white"}}>About</Button>
        <Button style={{backgroundColor: "white"}}>Contact</Button>
      </div>

      <div className="avatar">
      <Avatar alt="User Avatar" src="/path-to-avatar.jpg" />
      </div>
    </div>
  );
}

export default Header;
