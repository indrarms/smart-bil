import { prisma } from "@/lib/prisma";

export default async function AdminReportsPage() {
  // ===== INVOICE SUMMARY =====
  const totalInvoices = await prisma.invoice.count();

  const paidInvoices = await prisma.invoice.count({
    where: { status: "PAID" },
  });

  const overdueInvoices = await prisma.invoice.count({
    where: { status: "OVERDUE" },
  });

  // ===== PAYMENT SUMMARY =====
  const revenueAgg = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: "SUCCESS" },
  });

  const totalRevenue = revenueAgg._sum.amount ?? 0;

  // ===== LATEST PAYMENTS =====
  const payments = await prisma.payment.findMany({
    where: { status: "SUCCESS" },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black">
        Reports
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <ReportCard
          title="Total Invoices"
          value={totalInvoices}
        />

        <ReportCard
          title="Paid Invoices"
          value={paidInvoices}
          color="text-green-600"
        />

        <ReportCard
          title="Overdue Invoices"
          value={overdueInvoices}
          color="text-red-600"
        />

        <ReportCard
          title="Total Revenue"
          value={`Rp ${Number(totalRevenue).toLocaleString("id-ID")}`}
        />
      </div>

      {/* LATEST PAYMENTS TABLE */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="px-6 py-4 font-semibold text-black border-b">
          Latest Payments
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 text-black">
                  {p.createdAt.toLocaleDateString("id-ID")}
                </td>

                <td className="p-3 text-black">
                  Rp {Number(p.amount).toLocaleString("id-ID")}
                </td>

                <td className="p-3 text-black">
                  {p.method}
                </td>

                <td className="p-3 font-semibold text-green-600">
                  {p.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            Belum ada data pembayaran
          </div>
        )}
      </div>
    </div>
  );
}

function ReportCard({
  title,
  value,
  color = "text-black",
}: {
  title: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="bg-white rounded shadow p-5">
      <div className="text-sm text-gray-500 mb-2">
        {title}
      </div>
      <div className={`text-2xl font-bold ${color}`}>
        {value}
      </div>
    </div>
  );
}
