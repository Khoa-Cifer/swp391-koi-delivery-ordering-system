import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getAllOrders } from "../../../../utils/axios/order";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [chartData, setChartData] = useState({
    days: [], // Days of the current month
    completed: [], // Completed orders per day
    failed: [], // Failed orders per day
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const orders = await getAllOrders(); // Fetch all orders

        // Set the current month (October in this example, or dynamically get current month)
        const currentMonth = new Date().getMonth(); // Dynamically set to the current month (0=Jan, 1=Feb,...)
        const totalDaysInMonth = new Date(
          new Date().getFullYear(),
          currentMonth + 1,
          0
        ).getDate();

        // Initialize arrays for completed and failed orders for each day in the current month
        const days = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);
        const completed = Array(totalDaysInMonth).fill(0); // Array for completed orders by day
        const failed = Array(totalDaysInMonth).fill(0); // Array for failed orders by day

        // Filter orders for the current month and sort by day
        orders.forEach((order) => {
          const orderDate = new Date(order.expectedFinishDate);
          const orderMonth = orderDate.getMonth();

          // Only count orders from the current month
          if (orderMonth === currentMonth) {
            const orderDay = orderDate.getDate() - 1; // Get the day (0-based index)
            if (order.orderStatus === 7) {
              completed[orderDay] += 1; // Increment completed count for the respective day
            } else if (order.orderStatus === 8) {
              failed[orderDay] += 1; // Increment failed count for the respective day
            }
          }
        });

        // Set the data for the chart
        setChartData({
          days,
          completed,
          failed,
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchData();
  }, []);

  // Prepare data for the line chart for the selected month
  const data = {
    labels: chartData.days, // [1, 2, 3, ..., total days of the month]
    datasets: [
      {
        label: "Completed Orders",
        data: chartData.completed, // [completed orders per day]
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Failed Orders",
        data: chartData.failed, // [failed orders per day]
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Completed and Failed Orders for the Current Month",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
