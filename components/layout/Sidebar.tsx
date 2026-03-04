import Link from "next/link";

const menuItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Customers", href: "/customers" },
  { label: "Invoices", href: "/invoices" },
  { label: "Payments", href: "/payments" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-950 border-r border-slate-800 px-6 py-6">
      {/* Brand */}
      <h1 className="text-xl font-bold text-white tracking-wide text-center mb-24">
        Smart-Bil
      </h1>

      {/* Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
