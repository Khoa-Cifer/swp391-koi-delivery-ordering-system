import axiosClient from "./axios";

export async function userLogin(email, password) {
    try {
        const response = await axiosClient.post("users/login",
            {
                email,
                password
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function userRegister(email, username, password) {
    try {
        const response = await axiosClient.post("users/register",
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
