import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminInvoicesPage() {
  const invoices = await prisma.invoice.findMany({
    include: {
      customer: true,
      penalty: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const statusClass = (status: string) => {
    switch (status) {
      case "PAID":
        return "text-green-600";
      case "OVERDUE":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black">
        Invoices
      </h1>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Invoice No</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Period</th>
              <th className="p-3 text-left">Due Date</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => {
              const penalty = inv.penalty
                ? Number(inv.penalty.amount)
                : 0;

              const totalAmount =
                Number(inv.amount) + penalty;

              return (
                <tr key={inv.id} className="border-t">
                  <td className="p-3 text-black">
                    {inv.invoiceNo}
                  </td>

                  <td className="p-3 text-black">
                    {inv.customer.name}
                  </td>

                  <td className="p-3 text-black">
                    {inv.periodMonth}/{inv.periodYear}
                  </td>

                  <td className="p-3 text-black">
                    {inv.dueDate
                      ? inv.dueDate.toLocaleDateString("id-ID")
                      : "-"}
                  </td>

                  <td className="p-3 text-black">
                    Rp {totalAmount.toLocaleString("id-ID")}
                  </td>

                  <td className="p-3 font-semibold">
                    <span className={statusClass(inv.status)}>
                      {inv.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <a
                      href={`/my-invoices`}
                      className="text-slate-900 underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Customer Invoice
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {invoices.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            Tidak ada invoice
          </div>
        )}
      </div>
    </div>
  );
}
