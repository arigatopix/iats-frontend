import supabase from "./supabase";

async function getProjects() {
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    console.error(error);
    throw new Error("Projects could not be loaded");
  }

  return data;
}

async function getProject(id) {
  const { data, error } = await supabase
    .from("projects")
    .select("*, projectAdditionalRemarks(*), projectAttachments(*), tickets(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Project not found");
  }

  return data;
}

async function deleteProject(id) {
  const { data, error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Project could not be deleted");
  }

  return data;
}

async function createProject(newProject) {
  const { name, description, country, date_start, date_end } = newProject;

  const { projectAttachments, projectAdditionalRemarks, tickets } = newProject;

  const { data, error } = await supabase
    .from("projects")
    .insert({
      name,
      description,
      country,
      date_start,
      date_end,
    })
    .select();

  if (error) {
    console.error(error);
    throw new Error("Project could not be created");
  }

  const createdProject = data[0];
  const projectId = createdProject.id;

  // check foreign
  // projectAdditionalRemarks
  if (projectAdditionalRemarks.length) {
    const remarks = await createProjectAdditionalRemarks(
      projectId,
      projectAdditionalRemarks
    );

    createdProject.projectAdditionalRemarks = remarks;
  }

  // projectAttachments
  if (projectAttachments.length) {
    const attachments = await createProjectAttachments(
      projectId,
      projectAttachments
    );
    createdProject.projectAttachments = attachments;
  }

  // tickets
  if (tickets.length) {
    const createdTickets = await createTickets(projectId, tickets);
    createdProject.tickets = createdTickets;
  }

  return createProject;
}

async function createProjectAdditionalRemarks(
  project_id,
  projectAdditionalRemarks
) {
  const remarks = projectAdditionalRemarks.map(el => {
    return {
      project_id,
      remark: el.remark,
    };
  });

  const { data, error } = await supabase
    .from("projectAdditionalRemarks")
    .insert(remarks)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Remarks could not be created");
  }

  return data;
}

async function createProjectAttachments(project_id, projectAttachments) {
  const attachments = projectAttachments.map(el => {
    return {
      project_id,
      title: el.title,
      url: el.url,
    };
  });

  const { data, error } = await supabase
    .from("projectAttachments")
    .insert(attachments)
    .select();

  if (error) {
    console.error(error);
    throw new Error("attachments could not be created");
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
    };
  });

  const { data, error } = await supabase
    .from("tickets")
    .insert(created)
    .select();

  if (error) {
    console.error(error);
    throw new Error("attachments could not be created");
  }

  return data;
}

async function removeProjectAdditionalRemarks(projectId) {
  return await supabase
    .from("projectAdditionalRemarks")
    .delete()
    .eq("project_id", projectId);
}

async function removeProjectAttachments(projectId) {
  return await supabase
    .from("projectAttachments")
    .delete()
    .eq("project_id", projectId);
}

async function editProject({ project, editId }) {
  const { name, description, country, date_start, date_end } = project;

  const { projectAttachments, projectAdditionalRemarks, tickets } = project;

  const { data, error } = await supabase
    .from("projects")
    .update({
      name,
      description,
      country,
      date_start,
      date_end,
    })
    .eq("id", editId)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Project could not be update");
  }

  const editedProject = data[0];

  // remove projectAdditionalRemarks
  const { error: errorProjectAdditionalRemarks } =
    await removeProjectAdditionalRemarks(editId);

  if (errorProjectAdditionalRemarks) {
    console.error(errorProjectAdditionalRemarks);
    throw new Error("ProjectAdditionalRemarks could not be delete");
  }

  // remove projectAttachments
  const { error: errorProjectAttachments } = await removeProjectAttachments(
    editId
  );

  if (errorProjectAttachments) {
    console.error(projectAttachments);
    throw new Error("projectAttachments could not be delete");
  }

  // check foreign
  if (projectAdditionalRemarks.length) {
    const remarks = await createProjectAdditionalRemarks(
      editId,
      projectAdditionalRemarks
    );

    editedProject.projectAdditionalRemarks = remarks;
  }

  // projectAttachments
  if (projectAttachments.length) {
    const attachments = await createProjectAttachments(
      editId,
      projectAttachments
    );
    editedProject.projectAttachments = attachments;
  }

  // tickets
  if (tickets.length) {
    editedProject.tickets = tickets;
  }

  return editedProject;
}

export { getProjects, getProject, deleteProject, createProject, editProject };
