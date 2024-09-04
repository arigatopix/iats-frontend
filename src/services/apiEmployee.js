import { axiosInstance, BACKEND_URL } from "./axios";

async function getEmployee(emp_id) {
  try {
    const response = await axiosInstance.get(
      `${BACKEND_URL}/employee/${emp_id}`
    );

    const { data } = response.data;

    if (!data.ServiceStatus) {
      throw new Error(data.ServiceMessage);
    }

    return data.dataDetail[0];
  } catch (error) {
    console.error("Error fetching employee details:", error);
    throw error;
  }
}

export { getEmployee };
