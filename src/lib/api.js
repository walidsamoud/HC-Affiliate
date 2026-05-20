import axios from "axios";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://api.crownxbet.com").replace(/\/+$/, "");

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const TOKEN_KEY = "crownx_partners_token";
const USER_KEY = "crownx_partners_user";

export function getToken() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    return null;
  }
}

export function setToken(token) {
  if (typeof window === "undefined") return;
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch (e) {}
}

export function getStoredAffiliator() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setStoredAffiliator(user) {
  if (typeof window === "undefined") return;
  try {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  } catch (e) {}
}

export function clearSession() {
  setToken(null);
  setStoredAffiliator(null);
}

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const isOnDashboard = pathname.includes("/dashboard");
      if (isOnDashboard) {
        clearSession();
        const locale = pathname.split("/")[1] || "en";
        window.location.href = `/${locale}/login`;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
