const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://servicehub.pea.co.th:8443"
    : "/api";

const apiKey = "4p5pbs0ITasWFEqSyFfauqLez2juSPFk";

async function getEmployee(emp_id) {
  try {
    const response = await fetch(
      `${baseURL}/get-employee-detail-m?emp_id=${emp_id}`,
      {
        method: "GET",
        headers: {
          apiKey: apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();

    if (!data.ServiceStatus) {
      throw new Error(data.ServiceMessage);
    }

    return data.dataDetail[0];
  } catch (error) {
    console.error("Error fetching employee details:", error.message);
    throw error;
  }
}

export { getEmployee };
