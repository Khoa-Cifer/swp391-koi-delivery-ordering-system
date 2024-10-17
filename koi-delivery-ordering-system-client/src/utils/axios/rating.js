import axiosClient from "../axios";

export async function createFeedback(orderId, userId, comment, rateStar) {
    try {
        const response = await axiosClient.post(`ratings/create-new-ratings`, {
            orderId, userId, comment, rateStar
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}