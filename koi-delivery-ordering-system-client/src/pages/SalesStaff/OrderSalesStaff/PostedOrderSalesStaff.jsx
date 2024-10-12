import { useEffect, useState } from "react";
import OrderCard from "./components/OrderCard";
import { getOrdersByStatus } from "../../../utils/axios/order";

function PostedOrderSalesStaff() {
  const [orders, setOrders] = useState();
  const [filteredOrders, setFilteredOrders] = useState([]); // Filtered orders for display
  const [searchTrackingId, setSearchTrackingId] = useState(""); // For search by order ID
  const [searchOrderName, setSearchOrderName] = useState(""); // For search by customer name

  useEffect(() => {
    const postedOrderStatus = 1;
    async function fetchPostedOrder() {
      const response = await getOrdersByStatus(postedOrderStatus);
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

export default PostedOrderSalesStaff;
