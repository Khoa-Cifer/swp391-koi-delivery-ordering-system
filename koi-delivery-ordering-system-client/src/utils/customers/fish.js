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

export async function createFishOrderInfo(
    fishName,
    fishAge,
    fishSize,
    fishWeight,
    fishPrice,
    fishImage,
    orderId
) {
    try {
        const response = await axiosClient.post("fishes/createFishByOrderId", {
            fishName,
            fishAge,
            fishSize,
            fishWeight,
            fishPrice,
            fishImage,
            orderId
        }, {
            headers: {
                'Accept': '*/*', // Accept all types for this request
                'Content-Type': 'multipart/form-data' // Set Content-Type if uploading a file
            }
        });
        return response.data
    } catch (error) {
        console.log(error);
    }
}