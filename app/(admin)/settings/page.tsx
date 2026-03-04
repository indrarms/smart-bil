import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage() {
  // Ambil admin pertama (sementara)
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black">
        Settings
      </h1>

      {/* SYSTEM INFO */}
      <Section title="System Information">
        <Item label="Application Name" value="Smart-Bil" />
        <Item label="Environment" value={process.env.NODE_ENV} />
        <Item label="Database" value="SQLite (Development)" />
        <Item label="Version" value="v1.0.0" />
      </Section>

      {/* BILLING CONFIG */}
      <Section title="Billing Configuration">
        <Item label="Payment Period" value="5 – 20 (Next Month)" />
        <Item label="Late Fee" value="5% after due date" />
        <Item label="Currency" value="IDR (Rp)" />
      </Section>

      {/* ADMIN PROFILE */}
      <Section title="Admin Profile">
        <Item label="Email" value={admin?.email ?? "-"} />
        <Item label="Role" value={admin?.role ?? "-"} />
      </Section>
    </div>
  );
}

/* =========================
   REUSABLE COMPONENTS
   ========================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded shadow p-6 mb-6">
      <h2 className="text-lg font-semibold text-black mb-4">
        {title}
      </h2>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function Item({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-600">
        {label}
      </span>
      <span className="text-black font-medium">
        {value ?? "-"}
      </span>
    </div>
  );
}
