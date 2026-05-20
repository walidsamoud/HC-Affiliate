export function formatEur(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return "€0.00";
  return new Intl.NumberFormat("en-EU", { style: "currency", currency: "EUR" }).format(n);
}

export function formatDate(value) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return String(value);
  }
}

export function apiErrorMessage(err, fallback = "Something went wrong") {
  const raw = err?.response?.data?.message;
  if (typeof raw === "string") return raw;
  if (raw && typeof raw === "object") {
    const first = Object.values(raw)[0];
    return Array.isArray(first) ? first[0] : String(first);
  }
  return fallback;
}
