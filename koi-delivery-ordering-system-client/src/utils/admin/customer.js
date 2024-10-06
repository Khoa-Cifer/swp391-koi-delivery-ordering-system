import axiosClient from "../axios";

export async function getAllCustomers() {
    try {
        const response = await axiosClient.get("customer/getAllCustomers");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
