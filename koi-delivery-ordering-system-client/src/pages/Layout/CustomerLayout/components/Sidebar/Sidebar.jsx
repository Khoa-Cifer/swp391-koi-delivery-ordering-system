import { ListItem, ListItemText } from "@mui/material";
import { List } from "antd";
import "./customer_sidebar.scss";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleOpenEditProfile = () => {
    navigate("/customer-edit-profile")
  }

  const handleOpenCreateOrder = () => {
    navigate("customer-home");
  }

  return (
    <div className="sidebar-body-customer">
      <div className="image-container">
        <img
          src={"./assets/default-avatar.jpg"}
          alt="Avatar"
          className="avatar"
        />
      </div>

      <div className="profile">
        <div>User Name:</div>
        <div>Phone Number:</div>
        <div>Email:</div>
      </div>

      <div className="list-function">
        <List>
          <ListItem className="button">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem className="button">
            <ListItemText
              primary="Profile"
              onClick={handleOpenEditProfile}
            />
          </ListItem>
          <ListItem className="button">
            <ListItemText 
            primary="Create Order" 
              onClick={handleOpenCreateOrder}
              />
          </ListItem>
          <ListItem className="button">
            <ListItemText primary="Navigate To Wallet Page" />
          </ListItem>
          <ListItem className="button">
            <ListItemText primary="Contact Support" />
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default Sidebar;
