import supabase from "./supabase";

async function getProjects() {
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    console.error(error);
    throw new Error("Projects could not be loaded");
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

  const { data: projectData, error } = await supabase
    .from("projects")
    .insert({
      name,
      description,
      country,
      date_start,
      date_end,
    })
    .select();

  console.log(projectData);

  if (error) {
    console.error(error);
    throw new Error("Project could not be created");
  }

  const projectId = projectData[0].id;
  const createdProject = projectData[0];

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

export { getProjects, deleteProject, createProject };
