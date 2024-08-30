import axios from "axios";

// Create an instance of axios with custom configuration

const apiKey = "4p5pbs0ITasWFEqSyFfauqLez2juSPFk";
const url = `${import.meta.env.VITE_API_URL}/api/employee`;
// const url =`${import.meta.env.VITE_API_URL}/get-employee-detail-m`

async function getEmployee(emp_id) {
  try {
    const response = await axios.get(`${url}/${emp_id}`, {
      headers: {
        apiKey,
      },
    });

    const { data } = response.data;

    if (!data.ServiceStatus) {
      throw new Error(data.ServiceMessage);
    }

    return data.dataDetail[0];
  } catch (error) {
    console.error("Error fetching employee details:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export { getEmployee };
