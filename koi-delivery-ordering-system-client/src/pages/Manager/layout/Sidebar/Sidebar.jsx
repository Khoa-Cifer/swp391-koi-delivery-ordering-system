import { Divider, List, ListItem, ListItemText } from "@mui/material";

// eslint-disable-next-line react/prop-types
function Sidebar({ onDataTypeChange }) {
    const itemList = ["Customer", "Delivery Staff", "File", "Fish", "License", "Manager", "News", "Notification",
        "Order", "Rating", "Sale Staff", "Payment History", "Delivery Type", "Storage"]
    return (
        <div>
            <List>
                {itemList && itemList.map && itemList.map((text) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} onClick={() => onDataTypeChange(text)} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>

    );
}

export default Sidebar;