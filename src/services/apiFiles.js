import { axiosInstance, BACKEND_URL } from "./axios";

async function fileUpload(formData) {
  try {
    const response = await axiosInstance.post(
      `${BACKEND_URL}/files/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const { data } = response;

    return data;
  } catch (error) {
    console.log("error", error.message);
    throw new Error(error.message);
  }
}

async function readFile(path) {
  console.log(path);
  try {
    const response = await axiosInstance.get(`${BACKEND_URL}/files/${path}`);

    const { data } = response;

    return data;
  } catch (error) {
    console.log("error", error.message);
    throw new Error(error.message);
  }
}

async function deleteFile(path) {
  try {
    await axiosInstance.delete(`${BACKEND_URL}/files/${path}`);
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export { fileUpload, readFile, deleteFile };
