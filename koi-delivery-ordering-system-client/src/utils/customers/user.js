import axiosClient from "../axios";

export async function userLogin(email, password, userType) {
    try {
        const response = await axiosClient.post("auth/login",
            {
                email,
                password,
                userType
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function userRegister(email, username, password, phoneNumber) {
    try {
        const response = await axiosClient.post("auth/register",
            {
                email,
                username,
                password,
                phoneNumber
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function userUpdateProfile(id, email, username, phoneNumber, password) {
    try {
        const response = await axiosClient.put("customer/updateCustomerProfile",
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

export async function userUpdateProfileImage(id, file) {
    try {
        const response = await axiosClient.put("customer/updateCustomerAvatar",
            {
                id,
                file
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function loadUserAvatarImage(id) {
    // try {
    //     // const response
    // }
}