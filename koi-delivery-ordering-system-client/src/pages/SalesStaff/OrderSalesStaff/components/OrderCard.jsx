import { Button, TextField, Box } from "@mui/material";
import dateTimeConvert from "../../../../components/utils";
import "./sales_card.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ orders }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewDetail = (order) => {
    navigate(`/sales-order-detail/${order.id}`, {
      state: order,
    });
  };

  // Filter orders by name based on the search term
  const filteredOrders = (orders || []).filter(
    (order) =>
      order.name && order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="order-container-sale">
      <Box display="flex" justifyContent="center" mb={7}>
        <TextField
        className="order-container-sale-search"
          label="Search by name"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{
            maxWidth: 450, // set the width of the search bar
            backgroundColor: "#f5f5f5", // light background for elegance
            boxSizing: "unset",
          }}
        />
      </Box>

      {filteredOrders && filteredOrders.length > 0 ? (
        <div className="order-container">
          <div className="order-card">
            {filteredOrders.map((order) => (
              <div key={order.id} className="order-item">
                <div className="order-content">
                  <h3 className="order-title">{order.name}</h3>
                  <p className="order-description">
                    Created Date: {dateTimeConvert(order.createdDate)}
                  </p>
                  <p className="order-description">
                    Expected Finish Date:{" "}
                    {dateTimeConvert(order.expectedFinishDate)}
                  </p>
                  <div className="order-footer">
                    <Button
                      variant="contained"
                      onClick={() => handleViewDetail(order)}
                    >
                      Detail
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No order found</p>
      )}
    </div>
  );
};

export default OrderCard;
