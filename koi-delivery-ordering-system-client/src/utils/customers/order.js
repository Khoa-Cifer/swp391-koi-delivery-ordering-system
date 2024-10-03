import { jwtDecode } from "jwt-decode";
import axiosClient from "../axios";

export async function createGeneralOrderInfo(
    name,
    description,
    destinationAddress,
    destinationLongitude,
    destinationLatitude,
    senderAddress,
    senderLongitude,
    senderLatitude,
    expectedFinishDate
) {
    try {
        const token = localStorage.getItem("token");
        const customerInfo = jwtDecode(token);
        const customerId = customerInfo.sub.substring(2);
        const response = await axiosClient.post("orders/createOrderGeneralData", {
            customerId,
            name,
            description,
            destinationAddress,
            destinationLongitude,
            destinationLatitude,
            senderAddress,
            senderLongitude,
            senderLatitude,
            expectedFinishDate
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function postOrder(orderId) {
    try {
        const response = await axiosClient.post(`orders/postOrder/${orderId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function filterOrder(orderId) {
    try {
        const response = await axiosClient.post(`orders/filterOrderDistance/${orderId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getOrderById(orderId) {
    try {
        const response = await axiosClient.get(`orders/getOrderById/${orderId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}