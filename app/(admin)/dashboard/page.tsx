import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  // TOTAL INVOICES
  const totalInvoices = await prisma.invoice.count();

  // PAID INVOICES
  const paidInvoices = await prisma.invoice.count({
    where: { status: "PAID" },
  });

  // UNPAID + OVERDUE INVOICES
  const unpaidInvoices = await prisma.invoice.count({
    where: {
      status: {
        in: ["PENDING", "OVERDUE"],
      },
    },
  });

  // TOTAL REVENUE (SUCCESS PAYMENTS)
  const revenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      status: "SUCCESS",
    },
  });

  const totalRevenue = revenue._sum.amount ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black">
        Admin Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Invoices"
          value={totalInvoices}
        />

        <DashboardCard
          title="Paid Invoices"
          value={paidInvoices}
          valueColor="text-green-600"
        />

        <DashboardCard
          title="Unpaid / Overdue"
          value={unpaidInvoices}
          valueColor="text-red-600"
        />

        <DashboardCard
          title="Total Revenue"
          value={`Rp ${Number(totalRevenue).toLocaleString("id-ID")}`}
        />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  valueColor = "text-black",
}: {
  title: string;
  value: string | number;
  valueColor?: string;
}) {
  return (
    <div className="bg-white rounded shadow p-5">
      <div className="text-sm text-gray-500 mb-2">
        {title}
      </div>
      <div className={`text-2xl font-bold ${valueColor}`}>
        {value}
      </div>
    </div>
  );
}
