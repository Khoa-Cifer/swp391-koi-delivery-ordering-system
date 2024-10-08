import { Avatar, ListItem, ListItemText } from "@mui/material";
import { List } from "antd";
import "./sales_sidebar.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import default_avatar from "../../../../../assets/default-avatar.jpg";
import { getCustomerById } from "../../../../../utils/axios/customer";
import { jwtDecode } from "jwt-decode";
import { getFileByFileId } from "../../../../../utils/axios/file";

function Sidebar() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(default_avatar);

  const token = localStorage.getItem("token");
  const customerInfo = jwtDecode(token);
  const customerId = customerInfo.sub.substring(2);



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
              primary="Assign Order"
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
