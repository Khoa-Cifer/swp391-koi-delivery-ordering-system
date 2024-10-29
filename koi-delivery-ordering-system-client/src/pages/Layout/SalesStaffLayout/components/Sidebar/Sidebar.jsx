import { Avatar, Divider, ListItem, ListItemText, styled, Typography } from "@mui/material";
import { List } from "antd";
import "./sales_sidebar.scss";
import { useEffect, useState } from "react";
import default_avatar from "../../../../../assets/default-avatar.jpg";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getFileByFileId } from "../../../../../utils/axios/file";
import { getSalesStaffById } from "../../../../../utils/axios/salesStaff";

const InfoHeader = styled(Typography)(() => ({
  margin: "0px",
  color: "#252c6d",
  fontSize: "12px",
}));

function Sidebar() {
  const [imagePreview, setImagePreview] = useState(default_avatar);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let salesStaffInfo;
  let salesStaffId;
  if (token) {
    salesStaffInfo = jwtDecode(token);
    salesStaffId = salesStaffInfo.sub.substring(2);
  }

  useEffect(() => {
    async function fetchUserData() {
      const customer = await getSalesStaffById(salesStaffId);
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
    <div className="sidebar-body-sales">
      <div className="image-container">
        <Avatar
          src={imagePreview}
          alt="avatar"
          style={{ width: "7vw", height: "14vh" }}
        />
      </div>
      <Typography style={{textAlign: "center"}}>Sales Staff</Typography>
      <div className="profile">
        <InfoHeader>Username</InfoHeader>
        <Typography>{salesStaffInfo.userData.username}</Typography>
        <InfoHeader>Email</InfoHeader>
        <Typography>{salesStaffInfo.userData.email}</Typography>
      </div>

      <div className="list-function">
        <List>
          <ListItem className="button">
            <ListItemText
              primary="Home"
              onClick={() => navigate('/sales-staff-home')}
            />
          </ListItem>
          <ListItem className="button">
            <ListItemText
              primary="Profile"
            />
          </ListItem>
          <Divider style={{ marginBottom: "5%" }}>Orders</Divider>
          
          <ListItem className="button">
            <ListItemText
              primary="Posted Order"
              onClick={() => navigate('/posted-order-sales-staff')}
            />
          </ListItem>
          <ListItem className="button">
            <ListItemText
              primary="Received Order"
              onClick={() => navigate('/received-order-sales-staff')}
            />
          </ListItem>
          <ListItem className="button">
            <ListItemText
              primary="Post News"
              onClick={() => navigate("/news-sales-staff")}
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
