import Link from "next/link";
import CustomerSidebar from "@/components/customer/CustomerSidebar";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* SIDEBAR (SAMA DENGAN ADMIN) */}
      <CustomerSidebar />

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <Link
            href="/my-invoices"
            className="text-lg font-bold text-slate-900"
          >
            
          </Link>

          <div className="text-sm text-gray-500">
            Customer Portal
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 p-6 max-w-6xl w-full mx-auto">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-gray-200 bg-white text-center text-sm text-gray-500 py-4">
          © {new Date().getFullYear()} Smart-Bil. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
