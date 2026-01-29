"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CustomerSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const itemClass = (active: boolean) =>
    `block px-6 py-3 text-sm font-medium transition ${
      active
        ? "bg-slate-800 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 flex flex-col">
      {/* BRAND */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800">
        <span className="text-xl font-bold text-white">
          Smart-Bil
        </span>
      </div>

      {/* MENU (DITURUNKAN DARI BRAND) */}
      <nav className="mt-8 flex-1">
        <Link
          href="/my-invoices"
          className={itemClass(isActive("/my-invoices"))}
        >
          My Invoices
        </Link>

        <Link
          href="/my-payments"
          className={itemClass(isActive("/my-payments"))}
        >
          Payment History
        </Link>
      </nav>
    </aside>
  );
}
