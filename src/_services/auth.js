import api, { setToken, setStoredAffiliator, clearSession } from "../lib/api";

export async function login({ username, password }) {
  const res = await api.post("/api/affiliate/login", { username, password });
  const payload = res?.data || {};
  const token = payload?.token;
  const affiliator = payload?.data || null;
  if (token) setToken(token);
  if (affiliator) setStoredAffiliator(affiliator);
  return { token, affiliator };
}

export async function register(payload) {
  const res = await api.post("/api/affiliate/register", payload);
  return res?.data?.data || res?.data || {};
}

export async function me() {
  const res = await api.get("/api/affiliate/me");
  const affiliator = res?.data?.data || null;
  if (affiliator) setStoredAffiliator(affiliator);
  return affiliator;
}

export async function logout() {
  try {
    await api.post("/api/affiliate/logout");
  } catch (e) {
    /* ignore */
  } finally {
    clearSession();
  }
}

export async function changePassword({ current_password, new_password, new_password_confirmation }) {
  const res = await api.post("/api/affiliate/change-password", {
    current_password,
    new_password,
    new_password_confirmation,
  });
  return res?.data || {};
}

export async function sendContact(payload) {
  const res = await api.post("/api/affiliate/contact", payload);
  return res?.data?.data || res?.data || {};
}
