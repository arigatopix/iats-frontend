import axios from "axios";
import { baseURL } from "./axios";

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
    await axios.delete(`${baseURL}/project-additional-remarks-id/${id}`);
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function removeTicketAdditionalRemarks(id) {
  try {
    await axios.delete(`${baseURL}/ticket-additional-remarks-id/${id}`);
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
      await axios.delete(`${baseURL}/project-additional-remarks/${projectId}`);
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function getProjectAdditionalRemarks(projectId) {
  try {
    const { data } = await axios.get(
      `${baseURL}/project-additional-remarks/${projectId}`
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
      await axios.delete(`${baseURL}/ticket-additional-remarks/${ticketId}`);
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function getTicketAdditionalRemarksByTicketId(ticketId) {
  try {
    const { data } = await axios.get(
      `${baseURL}/ticket-additional-remarks/${ticketId}`
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
