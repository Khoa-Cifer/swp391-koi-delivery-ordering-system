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