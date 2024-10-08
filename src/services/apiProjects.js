import { createTickets } from "./apiTickets";
import { BACKEND_URL, axiosInstance } from "./axios";
import { removeProjectAdditionalRemarksByProjectId } from "./apiRemark";
import { removeProjectAttachmentByProjectId } from "./apiAttatchments";
import { PAGE_SIZE } from "../utils/constants";

async function getProjects({
  sortBy,
  page,
  searchByName,
  searchByCountry,
  searchByDateStart,
}) {
  const { field, direction } = sortBy;

  const pageQuery =
    page !== 1 && page
      ? `page=${page}&page_size=${PAGE_SIZE}`
      : `page=1&page_size=${PAGE_SIZE}`;
  const sortQuery = sortBy ? `&sort=${field},${direction}` : "";
  const queryName = searchByName
    ? `&${searchByName.field}=${searchByName.value}`
    : "";

  const queryCountryName = searchByCountry
    ? `&${searchByCountry.field}=${searchByCountry.value}`
    : "";

  const queryStartDate = searchByDateStart
    ? `&${searchByDateStart.field}=${searchByDateStart.value}`
    : "";

  const queryString = `${pageQuery}${sortQuery}${queryName}${queryCountryName}${queryStartDate}`;

  try {
    const response = await axiosInstance.get(
      `${BACKEND_URL}/projects?${queryString}`
    );

    const { data } = response;

    if (response.statusText !== "OK") {
      throw new Error("Projects could not be loaded");
    }

    const { data: projects, total } = data;

    return { projects, total };
  } catch (error) {
    console.error(error.message);
    throw new Error("Projects could not be loaded");
  }
}

async function getProject(id) {
  try {
    const response = await axiosInstance.get(`${BACKEND_URL}/projects/${id}`);

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
    const response = await axiosInstance.delete(
      `${BACKEND_URL}/projects/${id}`
    );

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
  const {
    name,
    description,
    country,
    date_start,
    date_end,
    is_require_passport,
    is_require_visa,
  } = newProject;

  const { project_attachments, project_additional_remarks, tickets } =
    newProject;

  try {
    const response = await axiosInstance.post(`${BACKEND_URL}/projects`, {
      name,
      description,
      country,
      date_start,
      date_end,
      is_require_visa,
      is_require_passport,
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
    const response = await axiosInstance.post(
      `${BACKEND_URL}/project-additional-remarks`,
      {
        remarks,
      }
    );

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
      path: el.path,
    };
  });

  try {
    const response = await axiosInstance.post(
      `${BACKEND_URL}/project-attachments`,
      {
        attachments,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

async function editProject({ project, editId }) {
  const {
    name,
    description,
    country,
    date_start,
    date_end,
    is_require_visa,
    is_require_passport,
  } = project;
  const { project_attachments = [], project_additional_remarks = [] } = project;

  try {
    const response = await axiosInstance.patch(
      `${BACKEND_URL}/projects/${editId}`,
      {
        name,
        description,
        country,
        date_start,
        date_end,
        is_require_visa,
        is_require_passport,
      }
    );

    const { data } = response;

    if (response.statusText !== "OK") {
      throw new Error("Project could not be update");
    }

    // check foreign
    if (project_additional_remarks.length) {
      // remove first
      await removeProjectAdditionalRemarksByProjectId(editId);

      await createProjectAdditionalRemarks(editId, project_additional_remarks);
    }

    // projectAttachments
    if (project_attachments.length) {
      await removeProjectAttachmentByProjectId(editId);

      await createProjectAttachments(editId, project_attachments);
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export { getProjects, getProject, deleteProject, createProject, editProject };
