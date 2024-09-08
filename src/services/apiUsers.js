import { PAGE_SIZE } from "../utils/constants";
import { axiosInstance, BACKEND_URL } from "./axios";

async function getAllUser({
  filter,
  sortBy,
  searchByName,
  searchByEmployeeId,
  page,
}) {
  const { field, direction } = sortBy;

  const pageQuery = page ? `page=${page}&page_size=${PAGE_SIZE}` : "";
  const sortQuery = sortBy ? `&sort=${field},${direction}` : "";
  const filterQuery = filter ? `&${filter.field}=${filter.value}` : "";
  const queryName = searchByName
    ? `&${searchByName.field}=${searchByName.value}`
    : "";
  const queryEmployeeId = searchByEmployeeId
    ? `&${searchByEmployeeId.field}=${searchByEmployeeId.value}`
    : "";

  try {
    const queryString = `${pageQuery}${sortQuery}${filterQuery}${queryName}${queryEmployeeId}`;

    const response = await axiosInstance.get(
      `${BACKEND_URL}/admin/users?${queryString}`
    );

    const { data } = response;

    const { data: users, total, current_page, last_page, per_page } = data;

    return {
      users,
      total,
      current_page,
      last_page,
      per_page,
    };
  } catch (error) {
    console.error(error.message);
    throw new Error("Users could not be loaded");
  }
}

async function getUser(employee_id) {
  try {
    const response = await axiosInstance.get(
      `${BACKEND_URL}/admin/users/${employee_id}`
    );

    const { data } = response;

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("User could not be loaded");
  }
}

async function createUser(user) {
  try {
    const response = await axiosInstance.post(
      `${BACKEND_URL}/admin/users`,
      user
    );

    const { data } = response;

    return data;
  } catch (error) {
    console.error(error.message);
    if (error.status === 400) {
      throw new Error(
        "สร้างผู้ใช้งานไม่สำเร็จ เนื่องจากมีผู้ใช้งานในระบบอยู่แล้ว"
      );
    }
    throw new Error("can not create user");
  }
}

async function updateUser(employee_id, user) {
  try {
    const response = await axiosInstance.patch(
      `${BACKEND_URL}/admin/users/${employee_id}`,
      user
    );

    const { data } = response;

    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("User could not be loaded");
  }
}

async function deleteUser(employee_id) {
  try {
    await axiosInstance.delete(`${BACKEND_URL}/admin/users/${employee_id}`);
  } catch (error) {
    console.error(error.message);
    throw new Error("User could not be delete");
  }
}

export { getAllUser, getUser, createUser, deleteUser, updateUser };
