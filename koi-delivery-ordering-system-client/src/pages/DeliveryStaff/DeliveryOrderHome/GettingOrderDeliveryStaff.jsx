import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../utils/axios/order";
import OrderCard from "./OrderCard/OrderCard";

function GettingOrderDeliveryStaff() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const gettingOrderStatus = 3;
    async function fetchPostedOrder() {
      const response = await getOrdersByStatus(gettingOrderStatus);
      if (response) {
        setOrders(response);
      }
    }

    fetchPostedOrder();
  }, []);

  return (
    <div className="content-container">
      <h1>Getting Order</h1>
      <OrderCard orders={orders}/>
    </div>
    
  );
}

export default GettingOrderDeliveryStaff;
