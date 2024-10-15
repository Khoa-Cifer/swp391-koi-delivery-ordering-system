import axiosClient from "../axios";

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

export async function getAllLicenses() {
    try {
        const response = await axiosClient.get("licenses/getAllLicenses");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateLicenseOrderInfo(
    licenseId,
    licenseName,
    licenseDescription,
    licenseDate,
    fishId
) {
    try {
        const response = await axiosClient.put("licenses/update-license-by-id", {
            licenseId,
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

export async function updateLicenseFiles(
    licenseId,
    fileList
) {
    let response = false;
    if (fileList.length > 0) {
        try {
            fileList.forEach(async file => {
                await axiosClient.put("licenses/update-license-files", {
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