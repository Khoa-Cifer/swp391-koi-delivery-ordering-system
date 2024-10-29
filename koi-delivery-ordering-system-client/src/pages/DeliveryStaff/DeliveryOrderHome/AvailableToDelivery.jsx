import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../utils/axios/order";
import OrderCard from "./OrderCard/OrderCard";

function AvailableToDelivery() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const availableToDeliveryStatus = 5;
    async function fetchOrder() {
      const response = await getOrdersByStatus(availableToDeliveryStatus);
      if (response) {
        setOrders(response);
      }
    }

    fetchOrder();
  }, []);

  return (
    <OrderCard orders={orders}/>
  );
}

export default AvailableToDelivery;
