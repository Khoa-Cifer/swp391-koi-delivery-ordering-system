import axiosClient from "../axios";

export async function forgotPassword(email, userType) {
    try {
        const response = await axiosClient.post("auth/forgot-password", {
            email, userType
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}