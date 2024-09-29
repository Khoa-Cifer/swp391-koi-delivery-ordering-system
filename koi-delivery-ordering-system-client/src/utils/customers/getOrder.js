import axiosClient from "../axios";

export async function getOrderById(orderId) {
    try {
        const response = await axiosClient.get(`orders/getOrderById/${orderId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}