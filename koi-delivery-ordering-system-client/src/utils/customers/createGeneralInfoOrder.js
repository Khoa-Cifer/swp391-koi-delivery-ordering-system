import { jwtDecode } from "jwt-decode";
import axiosClient from "../axios";

export async function createGeneralOrderInfo(
    orderName,
    description,
    destinationAddress,
    longitude,
    latitude
) {
    try {
        const token = localStorage.getItem("token");
        const customerInfo = jwtDecode(token);
        const customerId = customerInfo.sub.substring(2);
        const response = await axiosClient.post("orders/createOrderGeneralData", {
            customerId,
            orderName,
            description,
            destinationAddress,
            longitude,
            latitude
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}