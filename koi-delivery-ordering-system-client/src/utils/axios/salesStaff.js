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

export async function salesStaffUpdateProfile(id, email, username, phoneNumber, password) {
    try {
        const response = await axiosClient.put(prefixAdminSalesStaff + "updateSalesStaffProfile",
            {
                id,
                email,
                username,
                phoneNumber,
                password,
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function salesStaffUpdateProfileImage(id, file) {
    try {
        const response = await axiosClient.put(prefixAdminSalesStaff + `updateSalesStaffAvatar/${id}`, {
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

export async function managerEditSalesStaffProfile(id, username, email, phoneNumber) {
    try {
        const response = await axiosClient.put(`salesStaff/updateSalesStaffById/${id}`,
            {
                username,
                email,
                phoneNumber
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// export async function deletesalesStaffById(id) {
//     try {
//         const response = await axiosClient.delete(`salesStaff/${id}`);
//         return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// }

export async function disableSalesStaffById(id) {
    try {
        const response = await axiosClient.put(`salesStaff/disable/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function enableSalesStaffById(id) {
    try {
        const response = await axiosClient.put(`salesStaff/enable/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}