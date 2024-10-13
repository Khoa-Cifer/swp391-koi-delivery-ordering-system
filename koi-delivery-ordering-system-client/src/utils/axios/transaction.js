import axiosClient from "../axios";

export async function getAllTransaction() {
    try {
        const response = await axiosClient.get("fishes/get-all-payment-history");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}