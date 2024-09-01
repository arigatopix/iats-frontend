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
    // TODO get มาดูว่ามีข้อมูลมั้ย ค่อยลบ
    const { data } = await axios.get(
      `${baseURL}/project-attachments/${projectId}`
    );

    if (data.length) {
      await axios.delete(`${baseURL}/project-attachments/${projectId}`);
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function removeTicketAttachmentByTicketId(ticketId) {
  try {
    // TODO get มาดูว่ามีข้อมูลมั้ย ค่อยลบ
    const { data } = await axios.get(
      `${baseURL}/ticket-attachments/${ticketId}`
    );

    if (data.length) {
      await axios.delete(`${baseURL}/ticket-attachments/${ticketId}`);
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export {
  deleteAttachment,
  removeProjectAttachmentByProjectId,
  removeTicketAttachmentByTicketId,
};
