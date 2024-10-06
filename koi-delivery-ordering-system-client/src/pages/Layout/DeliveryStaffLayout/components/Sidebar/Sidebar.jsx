import { Avatar, ListItem, ListItemText } from "@mui/material";
import { List } from "antd";
import "./delivery_staff_sidebar.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import default_avatar from "../../../../../assets/default-avatar.jpg";
import { getCustomerById } from "../../../../../utils/customers/user";
import { jwtDecode } from "jwt-decode";
import { getFileByFileId } from "../../../../../utils/customers/file";

function Sidebar() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(default_avatar);

  const handleOpenEditProfile = () => {
    navigate("/customer-edit-profile")
  }

  const token = localStorage.getItem("token");
  const customerInfo = jwtDecode(token);
  const customerId = customerInfo.sub.substring(2);

  useEffect(() => {
    async function fetchUserData() {
        const customer = await getCustomerById(customerId);
        if(customer.file) {
            const imageResponse = await getFileByFileId(customer.file.id);;
            const imgUrl = URL.createObjectURL(imageResponse);
            setImagePreview(imgUrl);
        }
        // const imageResponse = await getFileByFileId();
    }
    fetchUserData();
}, [])


  const handleOpenCreateOrder = () => {
    navigate("customer-home");
  }

  return (
    <div className="sidebar-body-delivery-staff">
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
