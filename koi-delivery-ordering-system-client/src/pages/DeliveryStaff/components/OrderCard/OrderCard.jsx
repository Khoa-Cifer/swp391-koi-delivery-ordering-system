import "bootstrap/dist/css/bootstrap.min.css";
import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";

const OrderCard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      {/* Search Bar */}
      <Box display="flex" alignItems="center" mb={3}>
        <TextField
          label="Search by name"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            flex: 1,
            marginRight: "8px", // space between input and button
            backgroundColor: "#f8f9fa", // similar to bootstrap light background
            borderRadius: "4px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ced4da", // Bootstrap-like border color
              },
              "&:hover fieldset": {
                borderColor: "#80bdff", // Bootstrap focus border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#80bdff", // Blue focus border
              },
            },
          }}
        />
        <Button
          variant="contained"
          size="small"
          className="btn btn-secondary btn-sm"
          style={{ height: "40px" }}
        >
          Search
        </Button>
      </Box>

      {/* Order Card */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Order Name</h5>
          <p className="card-text">Last Updated Date: 2024-09-26</p>
          <p className="card-text">Destination Address: ABC Street</p>

          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary btn-sm me-2">
              Order Status
            </button>
            <button className="btn btn-danger btn-sm">Detail</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
