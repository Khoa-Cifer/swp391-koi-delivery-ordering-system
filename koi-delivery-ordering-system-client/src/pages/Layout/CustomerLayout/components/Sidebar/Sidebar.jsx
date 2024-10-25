import { Avatar, Divider, ListItem, ListItemText, styled, Typography } from "@mui/material";
import { List } from "antd";
import "./customer_sidebar.scss";
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
  fontWeight: 600,
  marginTop: "8px"
}));

function Sidebar() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(default_avatar);

  const handleOpenEditProfile = () => {
    navigate("/customer-edit-profile")
  }

  const token = localStorage.getItem("token");
  let customerId;
  let customerInfo
  if (token) {
    customerInfo = jwtDecode(token);
    customerId = customerInfo.sub.substring(2);
  }

  useEffect(() => {
    async function fetchUserData() {
      try {
        const customer = await getCustomerById(customerId);
        if (customer.file) {
          const imageResponse = await getFileByFileId(customer.file.id);
          const imgUrl = URL.createObjectURL(imageResponse);
          setImagePreview(imgUrl);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, [customerId]);

  const handleOpenCreateOrder = () => {
    navigate("customer-create-order");
  }

  const handleOpenHome = () => {
    navigate("customer-home");
  }

  return customerInfo && (
    <div className="sidebar-body-customer">
      <div className="image-container">
        <Avatar
          src={imagePreview}
          alt="avatar"
          style={{ width: "7vw", height: "14vh" }}
        />
      </div>

      <div className="profile">
        <InfoHeader>Username</InfoHeader>
        <Typography variant="body1">{customerInfo.userData.username}</Typography>
        <InfoHeader>Email</InfoHeader>
        <Typography variant="body1">{customerInfo.userData.email}</Typography>
      </div>

      <div className="list-function">
        <List>
          <ListItem className="button">
            <ListItemText
              primary="Home"
              onClick={handleOpenHome}
            />
          </ListItem>
          <ListItem className="button">
            <ListItemText
              primary="Profile"
              onClick={handleOpenEditProfile}
            />
          </ListItem>
          
          <Divider style={{ margin: "16px 0" }}>Orders</Divider>

          <ListItem className="button">
            <ListItemText
              primary="Create Order"
              onClick={handleOpenCreateOrder}
            />
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default Sidebar;