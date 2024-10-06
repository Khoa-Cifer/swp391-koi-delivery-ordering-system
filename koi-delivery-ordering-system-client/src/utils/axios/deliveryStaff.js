import axiosClient from "../axios";

const prefixAdminDeliveryStaff = "deliveryStaff/";

export async function getAllDeliveryStaff() {
    try {
        const response = await axiosClient.get(prefixAdminDeliveryStaff + "getAllDeliveryStaff");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function createDeliveryStaff(email, username) {
    try {
        const response = await axiosClient.post(prefixAdminDeliveryStaff + "createDeliveryStaff",
            {
                email,
                username,
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
