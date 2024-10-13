import { List, ListItem, ListItemText, styled } from "@mui/material";
import { Image, Typography } from "antd";
import { useState } from "react";
import logo from "../../../../assets/logo.png"
import { useNavigate } from "react-router-dom";

const CustomTypo = styled(Typography)(() => ({
    fontSize: "16px",
    color: "#01428E",
    margin: "10px",
}));

// eslint-disable-next-line react/prop-types
function Sidebar() {
    const navigate = useNavigate();

    const [selectedItem, setSelectedItem] = useState(null);
    const dataItemList = [
        "Customer",
        "Delivery Staff",
        // "File",
        // "Manager",
        // "News",
        // "Order",
        // "Rating",
        "Sales Staff",
        "Fish",
        "License",
        "Transaction",
        "Payment History",
        // "Delivery Type",
        "Storage",
        "Payment Rate",
    ];

    const dashboardItemList = ["Dashboard", "Report"];

    const handleClick = (e) => {
        setSelectedItem(e); // Set the selected item
        const navLink = e.toLowerCase().replace(/ /g, "-");
        navigate(`/admin/${navLink}`);
    };

    return (
        <div className="admin-container-left">
            <div className="logo">
                <Image src={logo} />
            </div>

            <div>
                <hr></hr>
            </div>

            <div className="dashboard">
                <p style={{ margin: "0" }}>DASHBOARD</p>
            </div>

            <div className="admin-users">
                <CustomTypo>ADMIN USERS</CustomTypo>
                <List>
                    {dashboardItemList && dashboardItemList.map && dashboardItemList.map((text) => (
                        <ListItem
                            button
                            key={text}
                            onClick={() => handleClick(text)}
                            // Apply conditional styling for the background color
                            style={{
                                backgroundColor: selectedItem === text ? '#01428E' : 'transparent', // Change color if selected
                                borderRadius: selectedItem === text ? '8px' : '0px', // Add border-radius if selected
                                transition: 'background-color 0.3s, border-radius 0.3s', // Smooth transition for better UX
                            }}
                        >
                            <ListItemText primary={text} style={{
                                color: selectedItem === text ? '#FFFFFF' : '#000000'
                            }} />
                        </ListItem>
                    ))}

                </List>
            </div>

            <div className="modules">
                <CustomTypo>MODULES</CustomTypo>

                <div className="modules-information">
                    <List>
                        {dataItemList && dataItemList.map && dataItemList.map((text) => (
                            <ListItem
                                button
                                key={text}
                                onClick={() => handleClick(text)}
                                // Apply conditional styling for the background color
                                style={{
                                    backgroundColor: selectedItem === text ? '#01428E' : 'transparent', // Change color if selected
                                    borderRadius: selectedItem === text ? '8px' : '0px', // Add border-radius if selected
                                    transition: 'background-color 0.3s, border-radius 0.3s', // Smooth transition for better UX
                                }}
                            >
                                <ListItemText primary={text} style={{
                                    color: selectedItem === text ? '#FFFFFF' : '#000000'
                                }} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;