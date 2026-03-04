import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export default async function MyInvoicesPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return <div className="text-black">Unauthorized</div>;
  }

  const customer = await prisma.customer.findFirst({
    where: { userId },
  });

  if (!customer) {
    return <div className="text-black">Customer not found</div>;
  }

  const invoices = await prisma.invoice.findMany({
    where: { customerId: customer.id },
    include: {
      penalty: true,
      payments: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">
        My Invoices
      </h1>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Invoice No</th>
              <th className="p-3 text-left">Period</th>
              <th className="p-3 text-left">Due Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => {
              const penaltyAmount = inv.penalty
                ? Number(inv.penalty.amount)
                : 0;

              const totalAmount =
                Number(inv.amount) + penaltyAmount;

              const isPaid = inv.status === "PAID";

              return (
                <tr key={inv.id} className="border-t">
                  <td className="p-3 text-black">
                    {inv.invoiceNo}
                  </td>

                  <td className="p-3 text-black">
                    {inv.periodMonth}/{inv.periodYear}
                  </td>

                  <td className="p-3 text-black">
                    {inv.dueDate.toLocaleDateString("id-ID")}
                  </td>

                  <td className="p-3 font-semibold text-black">
                    {inv.status}
                  </td>

                  <td className="p-3 text-right text-black">
                    Rp {totalAmount.toLocaleString("id-ID")}
                  </td>

                  <td className="p-3 text-center">
                    {!isPaid ? (
                      <form
                        action="/api/payments"
                        method="POST"
                      >
                        <input
                          type="hidden"
                          name="invoiceId"
                          value={inv.id}
                        />
                        <button
                          type="submit"
                          className="px-3 py-1 bg-slate-900 text-white rounded"
                        >
                          Pay Now
                        </button>
                      </form>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Paid
                      </span>
                    )}
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
