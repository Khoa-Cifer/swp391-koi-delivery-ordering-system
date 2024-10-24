import axiosClient from "../axios";

const prefixManager = "manager/";

export async function getAllManagers() {
    try {
        const response = await axiosClient.get(prefixManager + "get-all-managers");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function createManagers(email, username, phoneNumber) {
    try {
        const response = await axiosClient.post(prefixManager + "create-manager",
            {
                email,
                username,
                phoneNumber
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function editManagerProfile(id, username, email, phoneNumber) {
    try {
        const response = await axiosClient.put(`manager/update-manager-by-id/${id}`,
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

export async function getManagerById(id) {
    try {
        const response = await axiosClient.get(`manager/get-manager-by-id/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteManagerById(id) {
    try {
        const response = await axiosClient.delete(`manager/delete-manager-by-id/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}