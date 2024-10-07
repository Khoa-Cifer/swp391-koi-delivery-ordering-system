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