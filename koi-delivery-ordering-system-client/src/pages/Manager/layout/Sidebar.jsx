import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
function Sidebar({ onDataTypeChange }) {
    return (
        <>
            <Button onClick={() => onDataTypeChange("Customer")} variant="outlined">Customer</Button>
            <Button onClick={() => onDataTypeChange("Delivery Staff")} variant="outlined">Delivery Staff</Button>
            <Button onClick={() => onDataTypeChange("File")} variant="outlined">File</Button>
            <Button onClick={() => onDataTypeChange("Fish")} variant="outlined">Fish</Button>
            <Button onClick={() => onDataTypeChange("License")} variant="outlined">License</Button>
            <Button onClick={() => onDataTypeChange("Manager")} variant="outlined">Manager</Button>
            <Button onClick={() => onDataTypeChange("News")} variant="outlined">News</Button>
            <Button onClick={() => onDataTypeChange("Notification")} variant="outlined">Notification</Button>
            <Button onClick={() => onDataTypeChange("Order")} variant="outlined">Order</Button>
            <Button onClick={() => onDataTypeChange("Rating")} variant="outlined">Rating</Button>
            <Button onClick={() => onDataTypeChange("Sale Staff")} variant="outlined">Sale Staff</Button>
            <Button onClick={() => onDataTypeChange("Payment History")} variant="outlined">Payment History</Button>
            <Button onClick={() => onDataTypeChange("License Type")} variant="outlined">License Type</Button>
            <Button onClick={() => onDataTypeChange("Delivery Type")} variant="outlined">Delivery Type</Button>

        </>
    )
}

export default Sidebar;