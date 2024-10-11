import axiosClient from "../axios";

const prefixManageNews = "news/";

export async function CreateNews(formData) {
  try {
    const response = await axiosClient.post(
      prefixManageNews + "createNews",
      formData, // Pass the FormData object directly
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file upload
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
