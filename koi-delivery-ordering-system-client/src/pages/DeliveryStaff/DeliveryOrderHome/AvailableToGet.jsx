import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../utils/axios/order";
import OrderCard from "./OrderCard/OrderCard";

function AvailableToGet() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const availableToGetStatus = 2;
    async function fetchPostedOrder() {
      const response = await getOrdersByStatus(availableToGetStatus);
      if (response) {
        setOrders(response);
      }
    }

    fetchPostedOrder();
  }, []);

  return (
    <OrderCard orders={orders}/>
  );
}

export default AvailableToGet;
