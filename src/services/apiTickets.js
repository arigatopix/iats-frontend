import { PAGE_SIZE } from "../utils/constants";
import { removeTicketAttachmentByTicketId } from "./apiAttatchments";
import { removeTicketAdditionalRemarksByTicketId } from "./apiRemark";
import { axiosInstance, BACKEND_URL } from "./axios";

async function getTickets({
  filter,
  sortBy,
  searchByName,
  searchByProjectname,
  page,
  searchByCountry,
  searchByDateStart,
}) {
  const { field, direction } = sortBy;

  const pageQuery = page ? `page=${page}&page_size=${PAGE_SIZE}` : "";
  const sortQuery = sortBy ? `&sort=${field},${direction}` : "";
  const filterQuery = filter ? `&${filter.field}=${filter.value}` : "";
  const queryName = searchByName
    ? `&${searchByName.field}=${searchByName.value}`
    : "";
  const queryProjectName = searchByProjectname
    ? `&${searchByProjectname.field}=${searchByProjectname.value}`
    : "";

  const queryCountryName = searchByCountry
    ? `&${searchByCountry.field}=${searchByCountry.value}`
    : "";

  const queryStartDate = searchByDateStart
    ? `&${searchByDateStart.field}=${searchByDateStart.value}`
    : "";

  try {
    const queryString = `${pageQuery}${sortQuery}${filterQuery}${queryName}${queryProjectName}${queryCountryName}${queryStartDate}`;

    const response = await axiosInstance.get(
      `${BACKEND_URL}/tickets?${queryString}`
    );

    if (response.statusText !== "OK") {
      throw new Error("Tickets could not be loaded");
    }

    const { data } = response;

    const { data: tickets, total } = data;

    return { tickets, total };
  } catch (error) {
    console.error(error.message);
    throw new Error("Tickets could not be loaded");
  }
}

async function getTicket(id) {
  try {
    const response = await axiosInstance.get(`${BACKEND_URL}/tickets/${id}`);

    const { data } = response;

    if (response.statusText !== "OK") {
      throw new Error("Tickets could not be loaded");
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Tickets could not be loaded");
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

  const { ticket_attachments = [], ticket_additional_remarks = [] } = ticket;

  try {
    const response = await axiosInstance.patch(
      `${BACKEND_URL}/tickets/${editId}`,
      {
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
      }
    );

    const { data } = response;

    if (response.statusText !== "OK") {
      throw new Error("Project could not be update");
    }

    // check foreign
    if (ticket_additional_remarks.length) {
      // remove first
      await removeTicketAdditionalRemarksByTicketId(editId);

      await createTicketAdditionalRemarks(editId, ticket_additional_remarks);
    }

    if (ticket_attachments.length) {
      // remove first
      await removeTicketAttachmentByTicketId(editId);

      await createTicketAttachments(editId, ticket_attachments);
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
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
    const response = await axiosInstance.post(
      `${BACKEND_URL}/ticket-additional-remarks`,
      {
        remarks,
      }
    );

    const { data } = response;

    if (response.statusText !== "Created") {
      throw new Error("Ticket Remarks could not be created");
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
      path: el.path,
    };
  });

  try {
    const response = await axiosInstance.post(
      `${BACKEND_URL}/ticket-attachments`,
      {
        attachments,
      }
    );

    const { data } = response;

    if (response.statusText !== "Created") {
      throw new Error("Ticket Attachments not created");
    }

    return data;
  } catch (error) {
    console.error("Ticket Attachments not created");
    throw new Error(error.message);
  }
}

async function deleteTicket(id) {
  try {
    await axiosInstance.delete(`${BACKEND_URL}/tickets/${id}`);
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
    const response = await axiosInstance.post(`${BACKEND_URL}/tickets`, {
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
    const response = await axiosInstance.post(`${BACKEND_URL}/tickets`, {
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
