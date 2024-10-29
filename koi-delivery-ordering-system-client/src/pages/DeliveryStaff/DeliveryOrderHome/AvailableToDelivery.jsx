import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../utils/axios/order";
import OrderCard from "./OrderCard/OrderCard";

function AvailableToDelivery() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const availableToDeliveryStatus = 5;
    async function fetchPostedOrder() {
      const response = await getOrdersByStatus(availableToDeliveryStatus);
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

export default AvailableToDelivery;
