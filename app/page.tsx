import { cookies } from "next/headers";
import Link from "next/link";

export default async function LandingPage() {
  const cookieStore = await cookies(); // ✅ WAJIB await
  const role = cookieStore.get("role")?.value;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold text-black mb-4">
        Smart-Bil
      </h1>

      <p className="text-gray-600 mb-8">
        Smart Invoice & Billing Platform
      </p>

      <div className="flex gap-4">
        {!role && (
          <Link
            href="/auth/login"
            className="px-6 py-3 bg-slate-900 text-white rounded"
          >
            Login
          </Link>
        )}

        {role === "ADMIN" && (
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-slate-900 text-white rounded"
          >
            Go to Admin Dashboard
          </Link>
        )}

        {role === "CUSTOMER" && (
          <Link
            href="/my-invoices"
            className="px-6 py-3 bg-slate-900 text-white rounded"
          >
            Go to My Invoices
          </Link>
        )}
      </div>
    </div>
  );
}
