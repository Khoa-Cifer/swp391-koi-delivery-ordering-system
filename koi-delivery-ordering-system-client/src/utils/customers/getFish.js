import axiosClient from "../axios";

export async function getFishesByOrderId(orderId) {
    try {
        const response = await axiosClient.get(`fishes/getFishByOrderId/${orderId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getFishFileByFileId(id) {
    try {
        const response = await axiosClient.get(`images/getFileSystem/${id}`, {
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}