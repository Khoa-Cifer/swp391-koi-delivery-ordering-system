import axiosClient from "../axios";

export async function getAllPaymentHistory() {
    try {
        const response = await axiosClient.get("fishes/getAllFishes");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}