"use client";

import AuthGuard from "../../../components/dashboard/AuthGuard";
import DashboardShell from "../../../components/dashboard/DashboardShell";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  );
}
