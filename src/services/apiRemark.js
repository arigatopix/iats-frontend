import { BACKEND_URL, axiosInstance } from "./axios";

async function deleteRemark({ id, type }) {
  if (type === "project_additional_remarks") {
    await removeProjectAdditionalRemarks(id);
  } else if (type === "ticket_additional_remarks") {
    await removeTicketAdditionalRemarks(id);
  }

  return { id, type };
}

async function removeProjectAdditionalRemarks(id) {
  try {
    await axiosInstance.delete(
      `${BACKEND_URL}/project-additional-remarks-id/${id}`
    );
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function removeTicketAdditionalRemarks(id) {
  try {
    await axiosInstance.delete(
      `${BACKEND_URL}/ticket-additional-remarks-id/${id}`
    );
    return null;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
}

async function removeProjectAdditionalRemarksByProjectId(projectId) {
  try {
    const data = await getProjectAdditionalRemarks(projectId);

    if (data.length) {
      await axiosInstance.delete(
        `${BACKEND_URL}/project-additional-remarks/${projectId}`
      );
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function getProjectAdditionalRemarks(projectId) {
  try {
    const { data } = await axiosInstance.get(
      `${BACKEND_URL}/project-additional-remarks/${projectId}`
    );
    return data;
  } catch (error) {
    return [];
  }
}

async function removeTicketAdditionalRemarksByTicketId(ticketId) {
  try {
    const data = await getTicketAdditionalRemarksByTicketId(ticketId);

    if (data.length) {
      await axiosInstance.delete(
        `${BACKEND_URL}/ticket-additional-remarks/${ticketId}`
      );
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function getTicketAdditionalRemarksByTicketId(ticketId) {
  try {
    const { data } = await axiosInstance.get(
      `${BACKEND_URL}/ticket-additional-remarks/${ticketId}`
    );
    return data;
  } catch (error) {
    return [];
  }
}

export {
  deleteRemark,
  removeProjectAdditionalRemarksByProjectId,
  removeTicketAdditionalRemarksByTicketId,
};
