import { prisma } from "@/lib/prisma";

export default async function AdminPaymentsPage() {
  const payments = await prisma.payment.findMany({
    include: {
      invoice: {
        include: {
          customer: {
            include: {
              user: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const statusClass = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "text-green-600";
      case "FAILED":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black">
        Payments
      </h1>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Payment ID</th>
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay) => (
              <tr key={pay.id} className="border-t">
                <td className="p-3 text-black">
                  {pay.id.slice(0, 8)}…
                </td>

                <td className="p-3 text-black">
                  {pay.invoice.invoiceNo}
                </td>

                <td className="p-3 text-black">
                  {pay.invoice.customer.name}
                </td>

                <td className="p-3 text-black">
                  Rp {Number(pay.amount).toLocaleString("id-ID")}
                </td>

                <td className="p-3 text-black">
                  {pay.method}
                </td>

                <td className="p-3 font-semibold">
                  <span className={statusClass(pay.status)}>
                    {pay.status}
                  </span>
                </td>

                <td className="p-3 text-black">
                  {pay.createdAt.toLocaleDateString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            Tidak ada pembayaran
          </div>
        )}
      </div>
    </div>
  );
}
