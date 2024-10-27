import { useEffect, useState } from "react";
import { getOrdersByStatusAndCustomerId } from "../../../../utils/axios/order";
import OrderDetailComponent from "../components/OrderDetailComponent";
import { jwtDecode } from "jwt-decode";

function GettingOrderDetail() {
    const [orders, setOrders] = useState();

    const token = localStorage.getItem("token");
    let customerId;
    if (token) {
        const customerInfo = jwtDecode(token);
        customerId = customerInfo.sub.substring(2);
    }

    const gettingOrderStatus = 3;
    async function fetchDraftOrder() {
        const response = await getOrdersByStatusAndCustomerId(customerId, gettingOrderStatus);
        if (response) {
            setOrders(response);
        }
    }

    useEffect(() => {
        fetchDraftOrder();
    }, [])

    return (
        <OrderDetailComponent orders={orders} />
    )
}

export default GettingOrderDetail;