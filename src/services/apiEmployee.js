import axios from "axios";

// Create an instance of axios with custom configuration

const url = `${import.meta.env.VITE_API_URL}/api/employee`;

async function getEmployee(emp_id) {
  try {
    const response = await axios.get(`${url}/${emp_id}`);

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
