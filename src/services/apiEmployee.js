import { axiosInstance, BACKEND_URL } from "./axios";

async function getEmployee(employee_id) {
  try {
    const response = await axiosInstance.get(
      `${BACKEND_URL}/employee/${employee_id}`
    );

    const { employee } = response.data;

    return employee;
  } catch (error) {
    console.error("Error fetching employee details:", error);
    throw new Error("ไม่พบข้อมูลพนักงาน");
  }
}

export { getEmployee };
