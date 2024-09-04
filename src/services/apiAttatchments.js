import { BACKEND_URL, axiosInstance } from "./axios";

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
    await axiosInstance.delete(`${BACKEND_URL}/project-attachments-id/${id}`);
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function removeTicketAttachments(id) {
  try {
    await axiosInstance.delete(`${BACKEND_URL}/ticket-attachments-id/${id}`);
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
      await axiosInstance.delete(
        `${BACKEND_URL}/project-attachments/${projectId}`
      );
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
async function getProjectAttachmentByProjectId(projectId) {
  try {
    const { data } = await axiosInstance.get(
      `${BACKEND_URL}/project-attachments/${projectId}`
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
      await axiosInstance.delete(
        `${BACKEND_URL}/ticket-attachments/${ticketId}`
      );
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function getTicketAttachmentByTicketId(ticketId) {
  try {
    const { data } = await axiosInstance.get(
      `${BACKEND_URL}/ticket-attachments/${ticketId}`
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
