import { Avatar, Collapse, Divider, ListItemButton, ListItemText, styled, Typography } from "@mui/material";
import { List } from "antd";
import "./customer_sidebar.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import default_avatar from "../../../../../assets/default-avatar.jpg";
import { getCustomerById } from "../../../../../utils/axios/customer";
import { jwtDecode } from "jwt-decode";
import { getFileByFileId } from "../../../../../utils/axios/file";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

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
  const [open, setOpen] = useState(false);

  const handleToggleOrders = () => {
    setOpen(!open);
  };

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
          <ListItemButton className="button">
            <ListItemText
              primary="Home"
              onClick={handleOpenHome}
            />
          </ListItemButton>
          <ListItemButton className="button">
            <ListItemText
              primary="Profile"
              onClick={handleOpenEditProfile}
            />
          </ListItemButton>

          <Divider style={{ margin: "16px 0" }}>Orders</Divider>

          <ListItemButton className="button" onClick={handleOpenCreateOrder}>
            <ListItemText primary="Create Order" />
          </ListItemButton>

          <ListItemButton
            className="button"
            style={{ backgroundColor: "#1e4fa9" }}
            sx={{ justifyContent: 'flex-start' }}
            onClick={handleToggleOrders}
          >
            <ListItemText primary="Order List" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                className="button"
                sx={{ pl: 4, justifyContent: 'flex-start' }}
                onClick={() => navigate("/customer-draft-orders")}
              >
                <ListItemText primary="Draft Orders" sx={{ textAlign: 'left' }} />
              </ListItemButton>

              <ListItemButton
                className="button"
                sx={{ pl: 4, justifyContent: 'flex-start' }}
                onClick={() => navigate("/customer-posted-orders")}
              >
                <ListItemText primary="Posted Orders" sx={{ textAlign: 'left' }} />
              </ListItemButton>

              <ListItemButton
                className="button"
                sx={{ pl: 4, justifyContent: 'flex-start' }}
                onClick={() => navigate("/customer-getting-orders")}
              >
                <ListItemText primary="Getting Orders" sx={{ textAlign: 'left' }} />
              </ListItemButton>

              <ListItemButton
                className="button"
                sx={{ pl: 4, justifyContent: 'flex-start' }}
                onClick={() => navigate("/customer-delivering-orders")}
              >
                <ListItemText primary="Delivering Orders" sx={{ textAlign: 'left' }} />
              </ListItemButton>

              <ListItemButton
                className="button"
                sx={{ pl: 4, justifyContent: 'flex-start' }}
                onClick={() => navigate("/customer-complete-orders")}
              >
                <ListItemText primary="Complete Orders" sx={{ textAlign: 'left' }} />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </div>
    </div>
  );
}

export default Sidebar;