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

export async function updateOrderDeliveringLocation(
    orderDeliveringId,
    currentAddress,
    latitude,
    longitude) {
    try {
        const response = await axiosClient.put(`order-delivering/updateOrderDeliveringLocation`, {
            orderDeliveringId,
            currentAddress,
            latitude,
            longitude
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}