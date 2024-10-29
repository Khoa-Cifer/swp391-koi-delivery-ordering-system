import { useEffect, useState } from "react";
import { getOnGoingOrderForDeliveryStaff } from "../../../utils/axios/order";
import OrderCard from "./OrderCard/OrderCard";
import { jwtDecode } from "jwt-decode";

function GettingOrderDeliveryStaff() {
  const [orders, setOrders] = useState();

  const token = localStorage.getItem("token");
  let deliveryStaffId;
  if (token) {
    const deliveryStaffInfo = jwtDecode(token);
    deliveryStaffId = deliveryStaffInfo.sub.substring(2);
  }

  useEffect(() => {
    const gettingOrderStatus = 3;
    async function fetchOrder() {
      const ongoingGettingOrderResponse = await getOnGoingOrderForDeliveryStaff(
        deliveryStaffId,
        0,
        gettingOrderStatus
      );
      if (ongoingGettingOrderResponse) {
        setOrders(ongoingGettingOrderResponse);
      }
    }

    fetchOrder();
  }, []);

  return (
    <div className="content-container">
      <h1>Getting Orders</h1>
      <OrderCard orders={orders} />
    </div>
  );
}

export default GettingOrderDeliveryStaff;
