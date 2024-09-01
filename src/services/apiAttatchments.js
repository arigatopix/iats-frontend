import axios from "axios";
import { baseURL } from "./axios";

async function deleteAttachment({ id, type }) {
  if (type === "project_attachments") {
    await removeProjectAttachments(id);
  } else if (type === "ticket_attachments") {
    await removeTicketAttachments(id);
  }

  return { id, type };
}

async function removeProjectAttachments(id) {
  try {
    await axios.delete(`${baseURL}/project-attachments-id/${id}`);
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function removeTicketAttachments(id) {
  try {
    await axios.delete(`${baseURL}/ticket-attachments-id/${id}`);
    return null;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
}

async function removeProjectAttachmentByProjectId(projectId) {
  try {
    const data = await getProjectAttachmentByProjectId(projectId);

    if (data.length) {
      await axios.delete(`${baseURL}/project-attachments/${projectId}`);
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
async function getProjectAttachmentByProjectId(projectId) {
  try {
    const { data } = await axios.get(
      `${baseURL}/project-attachments/${projectId}`
    );
    return data;
  } catch (error) {
    return [];
  }
}

async function removeTicketAttachmentByTicketId(ticketId) {
  try {
    const data = await getTicketAttachmentByTicketId(ticketId);

    if (data.length) {
      await axios.delete(`${baseURL}/ticket-attachments/${ticketId}`);
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function getTicketAttachmentByTicketId(ticketId) {
  try {
    const { data } = await axios.get(
      `${baseURL}/ticket-attachments/${ticketId}`
    );
    return data;
  } catch (error) {
    return [];
  }
}

export {
  deleteAttachment,
  removeProjectAttachmentByProjectId,
  removeTicketAttachmentByTicketId,
};
