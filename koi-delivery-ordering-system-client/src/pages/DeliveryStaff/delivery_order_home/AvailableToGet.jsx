import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../utils/axios/order";
import OrderCard from "./OrderCard/OrderCard";

function AvailableToGet() {
  const [orders, setOrders] = useState();
  const [filteredOrders, setFilteredOrders] = useState([]); // Filtered orders for display
  const [searchTrackingId, setSearchTrackingId] = useState(""); // For search by order ID
  const [searchOrderName, setSearchOrderName] = useState(""); // For search by customer name

  useEffect(() => {
    const availableToGetStatus = 2;
    async function fetchPostedOrder() {
      const response = await getOrdersByStatus(availableToGetStatus);
      if (response) {
        setOrders(response);
        setFilteredOrders(response);
      }
    }

    fetchPostedOrder();
  }, []);

  return (
    <OrderCard orders={orders}/>
  );
}

export default AvailableToGet;
