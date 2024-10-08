import { Avatar, ListItem, ListItemText, styled, Typography } from "@mui/material";
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
}));

function Sidebar() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(default_avatar);

  const handleOpenEditProfile = () => {
    navigate("/customer-edit-profile")
  }

  const token = localStorage.getItem("token");
  const customerInfo = jwtDecode(token);
  const customerId = customerInfo.sub.substring(2);

  console.log(customerInfo);
  useEffect(() => {

    async function fetchUserData() {
      const customer = await getCustomerById(customerId);
      if (customer.file) {
        const imageResponse = await getFileByFileId(customer.file.id);;
        const imgUrl = URL.createObjectURL(imageResponse);
        setImagePreview(imgUrl);
      }
      // const imageResponse = await getFileByFileId();
    }
    fetchUserData();
  }, [])


  const handleOpenCreateOrder = () => {
    navigate("customer-create-order");
  }

  const handleOpenHome = () => {
    navigate("customer-home");
  }

  return (
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
        <Typography>{customerInfo.userData.username}</Typography>
        <InfoHeader>Email</InfoHeader>
        <Typography>{customerInfo.userData.email}</Typography>
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
          <ListItem className="button">
            <ListItemText
              primary="Create Order"
              onClick={handleOpenCreateOrder}
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
