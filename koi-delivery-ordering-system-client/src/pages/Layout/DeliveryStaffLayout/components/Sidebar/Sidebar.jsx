import { Avatar, ListItem, ListItemText, styled, Typography } from "@mui/material";
import { List } from "antd";
import "./delivery_staff_sidebar.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import default_avatar from "../../../../../assets/default-avatar.jpg";
import { getCustomerById } from "../../../../../utils/axios/customer";
import { jwtDecode } from "jwt-decode";
import { getFileByFileId } from "../../../../../utils/axios/file";

const InfoHeader = styled(Typography)(() => ({
  margin: "0px",
  color: "#252c6d",
  fontSize: "12px",
}));

function Sidebar() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(default_avatar);

  const handleOpenEditProfile = () => {
    // navigate("/customer-edit-profile")
  }

  const token = localStorage.getItem("token");
  let deliveryStaffId;
  let deliveryStaffInfo;
  if (token) {
    deliveryStaffInfo = jwtDecode(token);
    deliveryStaffId = deliveryStaffInfo.sub.substring(2);
  }

  useEffect(() => {
    async function fetchUserData() {
      const customer = await getCustomerById(deliveryStaffId);
      if (customer.file) {
        const imageResponse = await getFileByFileId(customer.file.id);;
        const imgUrl = URL.createObjectURL(imageResponse);
        setImagePreview(imgUrl);
      }
      // const imageResponse = await getFileByFileId();
    }
    fetchUserData();
  }, [])

  return (
    <div className="sidebar-body-delivery-staff">
      <div className="image-container">
        <Avatar
          src={imagePreview}
          alt="avatar"
          style={{ width: "7vw", height: "14vh" }}
        />
      </div>

      <div className="profile">
        <InfoHeader>Username</InfoHeader>
        <Typography>{deliveryStaffInfo.userData.username}</Typography>
        <InfoHeader>Email</InfoHeader>
        <Typography>{deliveryStaffInfo.userData.email}</Typography>
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
              primary="Getting Order"
            />
          </ListItem>
          <ListItem className="button">
            <ListItemText
              primary="Delivering Order"
            />
          </ListItem>
          <ListItem className="button">
            <ListItemText
              primary="Available to Get"
            />
          </ListItem>
          <ListItem className="button">
            <ListItemText
              primary="Available to Delivery"
            />
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default Sidebar;
