import axiosClient from "./axios";

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

export async function userRegister(email, username, password) {
    try {
        const response = await axiosClient.post("auth/register",
            {
                email,
                username,
                password
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
