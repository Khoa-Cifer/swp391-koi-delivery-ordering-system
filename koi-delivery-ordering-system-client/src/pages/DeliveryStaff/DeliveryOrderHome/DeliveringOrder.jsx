import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../utils/axios/order";
import OrderCard from "./OrderCard/OrderCard";

function DeliveringOrder() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const deliveringOrderStatus = 6;
    async function fetchPostedOrder() {
      const response = await getOrdersByStatus(deliveringOrderStatus);
      if (response) {
        setOrders(response);
      }
    }

    fetchPostedOrder();
  }, []);

  return (
    <div className="content-container">
    <h1>Delivering Order</h1>
    <OrderCard orders={orders}/>
  </div>
  );
}

export default DeliveringOrder;
