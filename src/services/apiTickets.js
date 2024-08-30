import supabase from "./supabase";

async function getTickets() {
  const { data, error } = await supabase
    .from("tickets")
    .select(
      "id, name, email, phone_number, position, department, title, status, projects(name, date_start, date_end, country)"
    );

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

async function getTicket(id) {
  const { data, error } = await supabase
    .from("tickets")
    .select("*, ticketAdditionalRemarks(*), ticketAttachments(*), projects(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Ticket not found");
  }

  return data;
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
  return await supabase
    .from("ticketAdditionalRemarks")
    .delete()
    .eq("ticket_id", ticketId);
}

async function removeTicketAttachments(ticketId) {
  return await supabase
    .from("ticketAttachments")
    .delete()
    .eq("ticket_id", ticketId);
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

  const { data, error } = await supabase
    .from("ticketAdditionalRemarks")
    .insert(remarks)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Remarks could not be created");
  }

  return data;
}

async function createTicketAttachments(ticket_id, ticketAttachments) {
  const attachments = ticketAttachments.map(el => {
    return {
      ticket_id,
      title: el.title,
      url: el.url,
    };
  });

  const { data, error } = await supabase
    .from("ticketAttachments")
    .insert(attachments)
    .select();

  if (error) {
    console.error(error);
    throw new Error("attachments could not be created");
  }

  return data;
}

async function deleteTicket(id) {
  const { data, error } = await supabase.from("tickets").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Ticket could not be deleted");
  }

  return data;
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
      employee_id: el.employeeId,
    };
  });

  const { data, error } = await supabase
    .from("tickets")
    .insert(created)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Ticket could not be created");
  }

  return data;
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
    employeeId: employee_id,
  } = ticket;

  const { data, error } = await supabase
    .from("tickets")
    .insert({
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
    })
    .select();

  if (error) {
    console.error(error);
    throw new Error("Ticket could not be created");
  }

  return data;
}

export {
  getTickets,
  getTicket,
  editTicket,
  deleteTicket,
  createTickets,
  createTicket,
};
