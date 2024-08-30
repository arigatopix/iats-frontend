import axios from "axios";

// Create an instance of axios with custom configuration

const apiKey = "4p5pbs0ITasWFEqSyFfauqLez2juSPFk";

async function getEmployee(emp_id) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/get-employee-detail-m`,
      {
        params: { emp_id },
        headers: {
          apiKey,
        },
      }
    );

    const { data } = response.data;

    console.log(import.meta.env.VITE_API_KEY);

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
