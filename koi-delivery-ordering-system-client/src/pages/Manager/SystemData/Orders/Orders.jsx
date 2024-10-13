import {
  Box,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  TextField,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../../../utils/axios/order";
import dateTimeConvert from "../../../../components/utils";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const commonStyles = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  ml: -2.5,
  border: 1,
};

const OrderInfoHeader = styled(Typography)(() => ({
  margin: "0px",
  color: "#252c6d",
  fontSize: "12px",
}));

function Orders() {
  const [orders, setOrders] = useState([]); // Initialize as an empty array
  const [expandedOrderId, setExpandedOrderId] = useState(null); // To track expanded orders
  const [filteredOrders, setFilteredOrders] = useState([]); // Filtered orders for display
  const [searchTrackingId, setSearchTrackingId] = useState(""); // For search by order ID
  const [searchOrderName, setSearchOrderName] = useState(""); // For search by customer name

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Display 5 orders per page

  const handleFilter = () => {
    let filtered = orders;

    if (searchTrackingId !== "") {
      // Filter by order ID
      filtered = filtered.filter((order) =>
        order.trackingId?.includes(searchTrackingId.toUpperCase())
      );
    }

    if (searchOrderName !== "") {
      // Filter by customer name
      filtered = filtered.filter((order) =>
        order.name?.toLowerCase().includes(searchOrderName.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const handleClick = (orderId) => {
    // Toggle the visibility of the order table by setting the orderId
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  useEffect(() => {
    async function fetchGettingOrder() {
      const response = await getAllOrders();
      if (response) {
        setOrders(response);
        setFilteredOrders(response); // Set initial filtered orders to all orders
      }
    }

    fetchGettingOrder();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchTrackingId, searchOrderName, orders]); // Re-filter when search terms or orders change

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate the current orders to display
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  return (
    <div className="customer-home-order-list">
      <Grid container spacing={2} sx={{ mb: 3, ml: -4 }}>
        <Grid item xs={3}>
          <TextField
            label="Tracking ID"
            variant="outlined"
            value={searchTrackingId}
            onChange={(e) => setSearchTrackingId(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Name"
            variant="outlined"
            value={searchOrderName}
            onChange={(e) => setSearchOrderName(e.target.value)}
          />
        </Grid>
      </Grid>

      {currentOrders.length > 0 ? (
        currentOrders.map((order) => (
          <Box
            sx={{ ...commonStyles, borderRadius: "16px" }}
            className="order-box"
            key={order.id}
          >
            <div className="order-main-info">
              <div className="order-text-info">
                <div>
                  <OrderInfoHeader>Name</OrderInfoHeader>
                  <Typography>{order.name}</Typography>
                </div>

                <div>
                  <OrderInfoHeader>Created Date</OrderInfoHeader>
                  <Typography>{dateTimeConvert(order.createdDate)}</Typography>
                </div>

                <div>
                  <OrderInfoHeader>Expected Finish Date</OrderInfoHeader>
                  <Typography>
                    {dateTimeConvert(order.expectedFinishDate)}
                  </Typography>
                </div>
              </div>

              <div>
                <div>
                  <OrderInfoHeader>Sender Address</OrderInfoHeader>
                  <Typography>{order.senderAddress}</Typography>
                </div>
                <div>
                  <OrderInfoHeader>Receiver Address</OrderInfoHeader>
                  <Typography>{order.destinationAddress}</Typography>
                </div>
              </div>

              <div className="order-text-info">
                <div>
                  <OrderInfoHeader>Price</OrderInfoHeader>
                  <Typography>{Math.floor(order.price)}</Typography>
                </div>
                <div>
                  <OrderInfoHeader>Tracking Id</OrderInfoHeader>
                  <Typography>{order.trackingId}</Typography>
                </div>

                <div className="icon-group">
                  <div className="button-icon">
                    <EditIcon />
                  </div>
                  <div className="button-icon">
                    <RestoreFromTrashIcon />
                  </div>
                  <div
                    className="button-icon"
                    onClick={() => handleClick(order.id)}
                  >
                    <MenuOpenIcon />
                  </div>
                </div>
              </div>
            </div>

            {expandedOrderId === order.id && (
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table aria-label="order-details">
                  <TableHead>
                    <TableRow>
                      <TableCell>Fish Id</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Weight</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.fishes &&
                      order.fishes.map((fish) => (
                        <TableRow key={fish.id}>
                          <TableCell>{fish.id}</TableCell>
                          <TableCell>{fish.name}</TableCell>
                          <TableCell>{fish.price}</TableCell>
                          <TableCell>{fish.size}</TableCell>
                          <TableCell>
                            {fish.status === 0
                              ? "Unknown"
                              : fish.status === 1
                              ? "Good"
                              : fish.status === 2
                              ? "Sick"
                              : "Dead"}
                          </TableCell>
                          <TableCell>{fish.weight}</TableCell>
                          <TableCell>
                            <div className="button-icon">
                              <MoreHorizIcon />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        ))
      ) : (
        <Typography>No orders found.</Typography>
      )}

      {/* Pagination */}
      <Pagination
        count={Math.ceil(filteredOrders.length / ordersPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 3, display: "flex", justifyContent: "end" }}
      />
    </div>
  );
}

export default Orders;
