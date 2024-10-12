import React, { useEffect, useState } from "react";
import { Box, styled, Typography } from "@mui/material";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import { getAllOrders } from "../../../utils/axios/order"; // Assuming this is your API function

const DashboardBox = styled(Box)(() => ({
  margin: "30px",
  padding: "40px",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
}));

const LineChartBox = styled(Box)(() => ({}));

const PieChartBox = styled(Box)(() => ({
  borderRadius: "16px",
  border: "1px solid #ccc",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 20px",
}));

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllOrders(); // Fetch all orders
        setOrders(response); // Set the orders in state

        // Calculate completed and failed counts
        const completed = response.filter(
          (order) => order.orderStatus === 7
        ).length;
        const failed = response.filter(
          (order) => order.orderStatus === 8
        ).length;

        setCompletedCount(completed); // Update completed count
        setFailedCount(failed); // Update failed count
        console.log(completedCount);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    }

    fetchData();
  }, []); // Run this effect once when the component mounts

  return (
    <DashboardBox>
      <Typography variant="h4" gutterBottom>
        Order Statistics Dashboard
      </Typography>

      <LineChartBox>
        <LineChart completedCount={completedCount} failedCount={failedCount} />
      </LineChartBox>

      <PieChartBox>
        <PieChart title="Completed Orders" value={completedCount} />
        <PieChart title="Failed Orders" value={failedCount} />
      </PieChartBox>
    </DashboardBox>
  );
}

export default Dashboard;
