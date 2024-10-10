import { Avatar, ListItem, ListItemText } from "@mui/material";
import { List } from "antd";
import "./sales_sidebar.scss";
import { useState } from "react";
import default_avatar from "../../../../../assets/default-avatar.jpg";
function Sidebar() {
  const [imagePreview, setImagePreview] = useState(default_avatar);

  return (
    <div className="sidebar-body-sales">
      <div className="image-container">
        <Avatar
          src={imagePreview}
          alt="avatar"
          style={{ width: "7vw", height: "14vh"}}
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
            />
          </ListItem>
          <ListItem className="button">
            <ListItemText
              primary="Posted Order"
            />
          </ListItem>
          <ListItem className="button">
            <ListItemText
              primary="Received Order"
            />
          </ListItem>
          <ListItem className="button">
            <ListItemText
              primary="Post News"
            />
          </ListItem>
          {/* <ListItem className="button">
            <ListItemText primary="Navigate To Wallet Page" />
          </ListItem>
          <ListItem className="button">
            <ListItemText primary="Contact Support" />
          </ListItem> */}
        </List>
      </div>
    </div>
  );
}

export default Sidebar;
