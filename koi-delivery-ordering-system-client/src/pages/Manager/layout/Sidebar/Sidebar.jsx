import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Sidebar({ onDataTypeChange }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const itemList = ["Customer", "Delivery Staff", "File", "Fish", "License", "Manager", "News", "Notification",
        "Order", "Rating", "Sale Staff", "Payment History", "Delivery Type", "Storage"];

    const handleClick = (e) => {
        setSelectedItem(e); // Set the selected item
        onDataTypeChange(e); // Call the parent's function
    };

    return (
        <div>
            <List>
                {itemList && itemList.map && itemList.map((text) => (
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
                        <ListItemText primary={text} />

                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>

    );
}

export default Sidebar;