import { jwtDecode } from "jwt-decode";
import axiosClient from "../axios";

export async function createGeneralOrderInfo(
    name,
    description,
    destinationAddress,
    destinationLongitude,
    destinationLatitude,
    senderAddress,
    senderLongitude,
    senderLatitude,
    expectedFinishDate
) {
    try {
        const token = localStorage.getItem("token");
        const customerInfo = jwtDecode(token);
        const customerId = customerInfo.sub.substring(2);
        const response = await axiosClient.post("orders/createOrderGeneralData", {
            customerId,
            name,
            description,
            destinationAddress,
            destinationLongitude,
            destinationLatitude,
            senderAddress,
            senderLongitude,
            senderLatitude,
            expectedFinishDate
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

export async function createLicenseOrderInfo(
    licenseName,
    licenseDescription,
    licenseDate,
    fishId
) {
    try {
        const response = await axiosClient.post("licenses/insertLicenseByFishId", {
            licenseName,
            licenseDescription,
            licenseDate,
            fishId
        });
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function createLicenseFiles(
    licenseId,
    fileList
) {
    let response = false;
    if (fileList.length > 0) {
        try {
            fileList.forEach(async file => {
                await axiosClient.post("licenses/insertLicenseFiles", {
                    licenseId,
                    file
                }, {
                    headers: {
                        'Accept': '*/*', // Accept all types for this request
                        'Content-Type': 'multipart/form-data' // Set Content-Type if uploading a file
                    }
                });
            });

            response = true;
        } catch (error) {
            response = false;
            console.log(error);
        }
    }
    return response.data
}

export async function postOrder(orderId) {
    try {
        const response = await axiosClient.post(`orders/postOrder/${orderId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}