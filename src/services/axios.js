import axios from "axios";
import { getToken } from "../utils/session";

export const BACKEND_URL = `${import.meta.env.VITE_API_URL}/api`;
export const appURL = import.meta.env.VITE_APP_URL;
export const keycloakLogoutURL = import.meta.env.VITE_APP_KEYCLOAK_LOGOUT_URL;

axios.interceptors.request.use(async config => {
  const token = getToken();

  config.headers = { Authorization: token ? `Bearer ${token}` : "" };

  return config;
});

export const axiosInstance = axios;
