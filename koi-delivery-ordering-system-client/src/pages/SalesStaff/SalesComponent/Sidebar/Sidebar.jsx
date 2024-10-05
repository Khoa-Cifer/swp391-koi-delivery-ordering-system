import { ListItem, ListItemText } from "@mui/material";
import { List } from "antd";
import "./Sidebar.scss";

function Sidebar() {
  return (
    <div className="sidebar-body">
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
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem className="button">
            <ListItemText primary="Create Order" />
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
