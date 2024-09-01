import axios from "axios";
import { createTickets } from "./apiTickets";
import { baseURL } from "./axios";
import { removeProjectAdditionalRemarksByProjectId } from "./apiRemark";

async function getProjects() {
  try {
    const response = await axios.get(`${baseURL}/projects`);

    const { data } = response;

    if (response.statusText !== "OK") {
      throw new Error("Projects could not be loaded");
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Projects could not be loaded");
  }
}

async function getProject(id) {
  try {
    const response = await axios.get(`${baseURL}/projects/${id}`);

    const { data } = response;

    if (response.statusText !== "OK") {
      throw new Error("Project not found");
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function deleteProject(id) {
  try {
    const response = await axios.delete(`${baseURL}/projects/${id}`);

    const { data } = response;

    if (response.statusText !== "OK") {
      throw new Error("Project could not be deleted");
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function createProject(newProject) {
  const { name, description, country, date_start, date_end } = newProject;

  const { project_attachments, project_additional_remarks, tickets } =
    newProject;

  try {
    const response = await axios.post(`${baseURL}/projects`, {
      name,
      description,
      country,
      date_start,
      date_end,
    });

    const { data } = response;

    if (response.statusText !== "Created") {
      throw new Error("Project could not be created");
    }

    const createdProject = data;

    const projectId = createdProject.id;

    // check foreign
    // project_additional_remarks
    if (project_additional_remarks.length) {
      const remarks = await createProjectAdditionalRemarks(
        projectId,
        project_additional_remarks
      );

      createdProject.project_additional_remarks = remarks;
    }

    // projectAttachments
    if (project_attachments.length) {
      const attachments = await createProjectAttachments(
        projectId,
        project_attachments
      );
      createdProject.project_attachments = attachments;
    }

    // tickets
    if (tickets.length) {
      const createdTickets = await createTickets(projectId, tickets);
      createdProject.tickets = createdTickets;
    }

    return createProject;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
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

  try {
    const response = await axios.post(`${baseURL}/project-additional-remarks`, {
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

async function createProjectAttachments(project_id, projectAttachments) {
  const attachments = projectAttachments.map(el => {
    return {
      project_id,
      title: el.title,
      url: el.url,
    };
  });

  try {
    const response = await axios.post(`${baseURL}/project-attachments`, {
      attachments,
    });

    const { data } = response;

    if (response.statusText !== "Created") {
      throw new Error("attachments could not be created");
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function editProject({ project, editId }) {
  const { name, description, country, date_start, date_end } = project;
  const {
    project_attachments = [],
    project_additional_remarks = [],
    tickets,
  } = project;

  try {
    const response = await axios.patch(`${baseURL}/projects/${editId}`, {
      name,
      description,
      country,
      date_start,
      date_end,
    });

    const { data } = response;

    if (response.statusText !== "OK") {
      throw new Error("Project could not be update");
    }

    const editedProject = data;

    // check foreign
    if (project_additional_remarks.length) {
      // remove first
      await removeProjectAdditionalRemarksByProjectId(editId);

      const remarks = await createProjectAdditionalRemarks(
        editId,
        project_additional_remarks
      );

      editedProject.project_additional_remarks = remarks;
    }

    // projectAttachments
    if (project_attachments.length) {
      await removeProjectAdditionalRemarksByProjectId(editId);

      const attachments = await createProjectAttachments(
        editId,
        project_attachments
      );
      editedProject.project_attachments = attachments;
    }

    // tickets
    if (tickets.length) {
      editedProject.tickets = tickets;
    }

    return editedProject;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export { getProjects, getProject, deleteProject, createProject, editProject };
