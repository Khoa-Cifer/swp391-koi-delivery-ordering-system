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

import ToastUtil from "../../../../components/toastContainer";

function Orders() {
  const [orders, setOrders] = useState([]); // Initialize as an empty array
  const [filteredOrders, setFilteredOrders] = useState([]); // Filtered orders for display
  const [searchTrackingId, setSearchTrackingId] = useState(""); // For search by order ID
  const [searchOrderName, setSearchOrderName] = useState(""); // For search by customer name

  const statusMapping = {
    0: "Draft",
    1: "Posted",
    2: "Order Accepted",
    3: "Order Getting",
    4: "Order Received",
    5: "Order Confirmed",
    6: "Delivering",
    7: "Complete",
    8: "Failed",
    9: "Aborted by Customer",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;

  const handleFilter = () => {
    let filtered = orders;

    if (searchTrackingId !== "") {
      filtered = filtered.filter((order) =>
        order.trackingId?.includes(searchTrackingId.toUpperCase())
      );
    }

    if (searchOrderName !== "") {
      filtered = filtered.filter((order) =>
        order.name?.toLowerCase().includes(searchOrderName.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
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

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  return (
    <div>
      <ToastUtil />
      <div className="dashboard-info">
        <h2 style={{ marginTop: "0" }}>Orders</h2>
      </div>

      <Grid container sx={{ mb: -1, columnGap: "1.5%", paddingLeft: "5%" }}>
        <Grid item xs={2}>
          <TextField
            label="Tracking ID"
            variant="outlined"
            type=""
            value={searchTrackingId}
            onChange={(e) => setSearchTrackingId(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          />
        </Grid>
        <Grid item xs={{ ml: 2 }}>
          <TextField
            label="Name"
            variant="outlined"
            type=""
            value={searchOrderName}
            onChange={(e) => setSearchOrderName(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          />
        </Grid>
      </Grid>
      <div className={open ? "blur" : ""}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "30px",
          }}
        ></div>
      </div>

      <TableContainer component={Paper} style={{ marginTop: "25px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#041967" }}>
                <Typography>Id</Typography>
              </TableCell>
              <TableCell style={{ color: "#041967" }}>
                <Typography>Name</Typography>
              </TableCell>
              <TableCell style={{ color: "#041967" }}>
                <Typography>Created date</Typography>
              </TableCell>
              <TableCell style={{ color: "#041967" }}>
                <Typography>Sender address</Typography>
              </TableCell>
              <TableCell style={{ color: "#041967" }}>
                <Typography>Destination address</Typography>
              </TableCell>
              <TableCell style={{ color: "#041967" }}>
                <Typography>Expected date</Typography>
              </TableCell>
              <TableCell style={{ color: "#041967" }}>
                <Typography>Tracking id</Typography>
              </TableCell>
              <TableCell style={{ color: "#041967" }}>
                <Typography>Price</Typography>
              </TableCell>
              <TableCell style={{ color: "#041967" }}>
                <Typography>Order status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders?.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>
                  {new Date(data.createdDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{data.senderAddress}</TableCell>
                <TableCell>{data.destinationAddress}</TableCell>
                <TableCell>
                  {new Date(data.expectedFinishDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{data.trackingId}</TableCell>
                <TableCell>{data.price}</TableCell>
                <TableCell>{statusMapping[data.orderStatus]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
