import axiosClient from "../axios";

const prefixAdminSalesStaff = "salesStaff/";

export async function getAllSalesStaff() {
    try {
        const response = await axiosClient.get(prefixAdminSalesStaff + "getAllSalesStaff");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function createSalesStaff(email, username, phoneNumber) {
    try {
        const response = await axiosClient.post(prefixAdminSalesStaff + "createSalesStaff",
            {
                email,
                username,
                phoneNumber,
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
