import { axiosInstance, BACKEND_URL } from "./axios";
import { clearSession } from "../utils/session";

export function login() {
  window.location.href = `${BACKEND_URL}/auth/login`;
}

export async function getCurrentUser() {
  try {
    const { data } = await axiosInstance.get(
      `${BACKEND_URL}/auth/getCurrentUser`
    );

    const { isAuthenticated, token, user } = data;

    return { isAuthenticated, token, ...user };
  } catch (error) {
    if (error.status === 500) {
      return { isAuthenticated: false };
    }
    throw new Error(error.message);
  }
}

export async function logout() {
  clearSession();
  window.location.href = `${BACKEND_URL}/auth/logout`;
}
