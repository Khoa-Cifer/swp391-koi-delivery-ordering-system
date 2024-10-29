import { useEffect, useState } from "react";
import { getOnGoingOrderForDeliveryStaff } from "../../../utils/axios/order";
import OrderCard from "./OrderCard/OrderCard";
import { jwtDecode } from "jwt-decode";

function DeliveringOrder() {
  const [orders, setOrders] = useState();

  const token = localStorage.getItem("token");
  let deliveryStaffId;
  if (token) {
    const deliveryStaffInfo = jwtDecode(token);
    deliveryStaffId = deliveryStaffInfo.sub.substring(2);
  }

  useEffect(() => {
    const deliveringOrderStatus = 6;
    async function fetchOrder() {

      const ongoingDeliveringOrderResponse =
        await getOnGoingOrderForDeliveryStaff(
          deliveryStaffId,
          1,
          deliveringOrderStatus
        );
      if (ongoingDeliveringOrderResponse) {
        setOrders(ongoingDeliveringOrderResponse);
      }
    }

    fetchOrder();
  }, []);

  return (
    <OrderCard orders={orders} />
  );
}

export default DeliveringOrder;
