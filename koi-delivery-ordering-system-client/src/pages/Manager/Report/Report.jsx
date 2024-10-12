import React, { useEffect, useState } from "react";
import StatCard from "./components/Card/ReportCard";
import Table from "./components/Card/Table";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { HelpCircle } from "lucide-react";
import { getOrdersByStatus } from "../../../utils/axios/order";

const Report = () => {
  // State to hold the fetched data
  const [data, setData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const responses = await Promise.all([
          getOrdersByStatus(7),
          getOrdersByStatus(8),
        ]);
        console.log(responses);

        const combinedData = [
          ...responses[0].map((item) => ({ ...item, status: "Completed" })),
          ...responses[1].map((item) => ({ ...item, status: "Failed" })),
        ];

        setData(combinedData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, []);

  // Calculate totals
  const totalDaysOperated = data.reduce(
    (sum, item) => sum + item.daysOperated || 0,
    0
  );
  const totalCompleted = data.filter(
    (item) => item.status === "Completed"
  ).length; // Count completed orders
  const totalFailed = data.filter((item) => item.status === "Failed").length;

  return (
    <Container
      sx={{ minHeight: "100vh", padding: "32px", backgroundColor: "#f5f5f5" }}
    >
      <Box mb={8}>
        <Typography
          variant="h3"
          component="h1"
          color="textPrimary"
          gutterBottom
        >
          Delivery Dashboard
        </Typography>
      </Box>

      {/* Report Cards */}
      <Grid container spacing={3} mb={8}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Days Operated"
            value={totalDaysOperated}
            description="NaN% vs last 7 days"
            icon={<HelpCircle className="w-5 h-5 text-blue-500" />}
            color="#bbdefb"
            textColor="#0d47a1"
            trend="down"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Completed"
            value={`${totalCompleted} Deliveries`}
            description="2% vs last 7 days"
            icon={<HelpCircle className="w-5 h-5 text-green-500" />}
            color="#c8e6c9"
            textColor="#2e7d32"
            trend="down"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Failed"
            value={`${totalFailed} Deliveries`}
            description="147% vs last 7 days"
            icon={<HelpCircle className="w-5 h-5 text-red-500" />}
            color="#ffcdd2"
            textColor="#c62828"
            trend="up"
          />
        </Grid>
      </Grid>

      {/* Tables */}
      <Grid container spacing={3}>
        {/*Delivery staff orders Table */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ p: 2, backgroundColor: "#1976d2", color: "white" }}
            >
              Delivery staff orders
            </Typography>
            <Table
              headers={["Delivery Staff", "Order Status"]}
              data={data
                .filter((item) => item.status === "Completed")
                .map((item) => [item.deliveryStaff, item.status])}
            />
          </Paper>
        </Grid>

        {/*Orders delivery details Table */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ p: 2, backgroundColor: "#1976d2", color: "white" }}
            >
              Orders delivery detail
            </Typography>
            <Table
              headers={[
                "Order ID",
                "Sender Address",
                "Destination Address",
                "Created Date",
                "Order Status",
              ]}
              data={data.map((item) => [
                item.id,
                item.senderAddress,
                item.destinationAddress,
                new Date(item.createdDate).toLocaleDateString(),
                item.status, // Show status as Completed or Failed
              ])}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Report;
