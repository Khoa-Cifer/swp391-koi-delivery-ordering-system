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

export async function updateDeliveryStaffCurrentLocation(
    id,
    address,
    latitude,
    longitude) {
    try {
        const response = await axiosClient.put(prefixAdminDeliveryStaff + "updateDeliveryStaffLocation", {
            id, address, latitude, longitude
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deliveryStaffUpdateProfile(id, email, username, phoneNumber, password) {
    try {
        const response = await axiosClient.put("delivery-staff/updateDeliveryStaffProfile",
            {
                id,
                email,
                password,
                username,
                phoneNumber
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deliveryStaffUpdateProfileImage(id, file) {
    try {
        const response = await axiosClient.put(`delivery-staff/updateDeliveryStaffAvatar/${id}`, {
            file
        }, {
            headers: {
                'Accept': '*/*', // Accept all types for this request
                'Content-Type': 'multipart/form-data' // Set Content-Type if uploading a file
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getDeliveryStaffById(id) {
    try {
        const response = await axiosClient.get(`delivery-staff/getDeliveryStaffById/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
