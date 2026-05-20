"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function AppChrome({ children }) {
  const pathname = usePathname() || "";
  const isDashboard = pathname.includes("/dashboard");

  if (isDashboard) {
    return <main className="cx-main cx-main--dashboard">{children}</main>;
  }

  return (
    <div className="cx-shell">
      <Header />
      <main className="cx-main">{children}</main>
      <Footer />
    </div>
  );
}
