import axios from "axios";
import { BACKEND_URL } from "./axios";

export async function adminLogin(employee_id) {
  try {
    const { data } = await axios.post(`${BACKEND_URL}/bypass/login`, {
      employee_id,
    });

    const { isAuthenticated, token, user } = data;

    return { isAuthenticated, token, ...user };
  } catch (error) {
    if (error.status === 500) {
      return { isAuthenticated: false };
    }
    throw new Error(error.message);
  }
}

export async function changeAccount(employee_id) {
  try {
    const { data } = await axios.post(`${BACKEND_URL}/admin/login`, {
      employee_id,
    });

    const { isAuthenticated, token, user } = data;

    return { isAuthenticated, token, ...user };
  } catch (error) {
    if (error.status === 500) {
      return { isAuthenticated: false };
    }
    throw new Error(error.message);
  }
}
