import api from "../lib/api";

export async function getStats(period = "month", locale = "en") {
  const res = await api.get("/api/affiliate/stats", { params: { period, locale } });
  return res?.data?.data || {};
}

export async function getPlayers({ period = "month", page = 1, per_page = 25 } = {}) {
  const res = await api.get("/api/affiliate/players", { params: { period, page, per_page } });
  return res?.data?.data || { data: [], total: 0, current_page: 1, last_page: 1 };
}

export async function getSubAffiliators({ period = "month", page = 1, per_page = 25 } = {}) {
  const res = await api.get("/api/affiliate/sub-affiliators", { params: { period, page, per_page } });
  return res?.data?.data || { data: [], total: 0, current_page: 1, last_page: 1 };
}

export async function createSubAffiliator(payload) {
  const res = await api.post("/api/affiliate/sub-affiliators", payload);
  return res?.data?.data || res?.data || {};
}

export async function getWithdrawals({ page = 1, per_page = 25 } = {}) {
  const res = await api.get("/api/affiliate/withdrawals", { params: { page, per_page } });
  return res?.data?.data || { data: [], summary: {}, total: 0, current_page: 1, last_page: 1 };
}
