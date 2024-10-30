import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../utils/axios/order";
import OrderCard from "./OrderCard/OrderCard";

function AvailableToGet() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const availableToGetStatus = 2;
    async function fetchOrder() {
      const response = await getOrdersByStatus(availableToGetStatus);
      if (response) {
        setOrders(response);
      }
    }

    fetchOrder();
  }, []);

  return (
    <div className="content-container">
    <h1>Available To Get</h1>
    <OrderCard orders={orders}/>
  </div>
  );
}

export default AvailableToGet;
