import axiosClient from "../axios";

export async function getAllCustomers() {
    try {
        const response = await axiosClient.get("admin/customer/getAllCustomer");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
