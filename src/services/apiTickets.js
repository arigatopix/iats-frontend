import axios from "axios";
import { baseURL } from "./axios";
import supabase from "./supabase";

async function getTickets() {
  try {
    const response = await axios.get(`${baseURL}/tickets`);

    const { data } = response;

    if (response.statusText !== "OK") {
      throw new Error("Cabins could not be loaded");
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Cabins could not be loaded");
  }
}

async function getTicket(id) {
  try {
    const response = await axios.get(`${baseURL}/tickets/${id}`);

    const { data } = response;

    if (response.statusText !== "OK") {
      throw new Error("Cabins could not be loaded");
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Cabins could not be loaded");
  }
}

async function editTicket({ ticket, editId }) {
  const {
    name,
    name_eng,
    email,
    phone_number,
    position,
    department,
    contact_name,
    status,
    remark,
    employee_id,
    title,
    title_eng,
  } = ticket;

  const { ticketAttachments, ticketAdditionalRemarks } = ticket;

  const { data, error } = await supabase
    .from("tickets")
    .update({
      name,
      name_eng,
      email,
      phone_number,
      position,
      department,
      contact_name,
      status,
      remark,
      employee_id,
      title,
      title_eng,
    })
    .eq("id", editId)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Ticket could not be update");
  }

  const editedTicket = data[0];

  // remove projectAdditionalRemarks
  const { error: errorTicketAdditionalRemarks } =
    await removeTicketAdditionalRemarks(editId);

  if (errorTicketAdditionalRemarks) {
    console.error(errorTicketAdditionalRemarks);
    throw new Error("Ticket additionalRemarks could not be delete");
  }

  // remove projectAttachments
  const { error: errorTicketAttachments } = await removeTicketAttachments(
    editId
  );

  if (errorTicketAttachments) {
    console.error(errorTicketAttachments);
    throw new Error("ticket attachments could not be delete");
  }

  // check foreign
  if (ticketAdditionalRemarks.length) {
    const remarks = await createTicketAdditionalRemarks(
      editId,
      ticketAdditionalRemarks
    );

    editedTicket.ticketAdditionalRemarks = remarks;
  }

  if (ticketAttachments.length) {
    const attachments = await createTicketAttachments(
      editId,
      ticketAttachments
    );
    editedTicket.ticketAttachments = attachments;
  }

  return editedTicket;
}

async function removeTicketAdditionalRemarks(ticketId) {
  try {
    await axios.delete(`${baseURL}/ticket-additional-remarks/${ticketId}`);
    return null;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
}

async function removeTicketAttachments(ticketId) {
  try {
    await axios.delete(`${baseURL}/ticket-attachments/${ticketId}`);
    return null;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
}

async function createTicketAdditionalRemarks(
  ticket_id,
  ticketAdditionalRemarks
) {
  const remarks = ticketAdditionalRemarks.map(el => {
    return {
      ticket_id,
      remark: el.remark,
    };
  });

  try {
    const response = await axios.post(`${baseURL}/ticket-additional-remarks`, {
      remarks,
    });

    const { data } = response;

    if (response.statusText !== "Created") {
      throw new Error("Remarks could not be created");
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function createTicketAttachments(ticket_id, ticketAttachments) {
  const attachments = ticketAttachments.map(el => {
    return {
      ticket_id,
      title: el.title,
      url: el.url,
    };
  });

  try {
    const response = await axios.post(`${baseURL}/ticket-attachments`, {
      attachments,
    });

    const { data } = response;

    if (response.statusText !== "Created") {
      throw new Error("Remarks could not be created");
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function deleteTicket(id) {
  try {
    await axios.delete(`${baseURL}/tickets/${id}`);
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function createTicket({ projectId: project_id, ticket }) {
  const {
    title,
    name,
    title_eng,
    name_eng,
    email,
    phone_number,
    position,
    department,
    contact_name,
    status,
    remark,
    employee_id,
  } = ticket;

  try {
    const response = await axios.post(`${baseURL}/tickets`, {
      project_id,
      title,
      name,
      title_eng,
      name_eng,
      email,
      phone_number,
      position,
      department,
      contact_name,
      status,
      remark,
      employee_id,
    });

    const { data } = response;

    if (response.statusText !== "Created") {
      throw new Error("Ticket could not be created");
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Ticket could not be created");
  }
}

async function createTickets(project_id, tickets) {
  const created = tickets.map(el => {
    return {
      project_id,
      title: el.title,
      name: el.name,
      title_eng: el.title_eng,
      name_eng: el.name_eng,
      email: el.email,
      phone_number: el.phone_number,
      position: el.position,
      department: el.department,
      contact_name: el.contact_name,
      status: el.status,
      remark: el.remark,
      employee_id: el.employee_id,
    };
  });

  try {
    const response = await axios.post(`${baseURL}/tickets`, {
      tickets: created,
    });
    const { data } = response;
    if (response.statusText !== "Created") {
      throw new Error("Ticket could not be created");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Ticket could not be created");
  }
}

export {
  getTickets,
  getTicket,
  editTicket,
  deleteTicket,
  createTickets,
  createTicket,
};
