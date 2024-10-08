import axiosClient from "../axios";

export async function createOrderDeliveringData(deliveryStaffId, orderId) {
    try {
        const response = await axiosClient.post(`order-delivering/createOrderDelivering`, {
            deliveryStaffId,
            orderId
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}