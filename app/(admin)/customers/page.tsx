import { prisma } from "@/lib/prisma";

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    include: {
      user: true,
      invoices: {
        include: {
          payments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const rows = customers.map((customer) => {
    const totalInvoices = customer.invoices.length;

    const paidInvoices = customer.invoices.filter(
      (inv) => inv.status === "PAID"
    ).length;

    const unpaidInvoices = customer.invoices.filter(
      (inv) => inv.status !== "PAID"
    ).length;

    const totalPayment = customer.invoices.reduce((sum, inv) => {
      return (
        sum +
        inv.payments.reduce(
          (pSum, p) => pSum + Number(p.amount),
          0
        )
      );
    }, 0);

    return {
      id: customer.id,
      name: customer.name,
      email: customer.user.email,
      totalInvoices,
      paidInvoices,
      unpaidInvoices,
      totalPayment,
    };
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black">
        Customers
      </h1>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Total Invoices</th>
              <th className="p-3 text-left">Paid</th>
              <th className="p-3 text-left">Unpaid</th>
              <th className="p-3 text-left">Total Payment</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="p-3 font-medium text-black">
                  {row.name}
                </td>

                <td className="p-3 text-black">
                  {row.email}
                </td>

                <td className="p-3 text-black">
                  {row.totalInvoices}
                </td>

                <td className="p-3 font-semibold text-green-600">
                  {row.paidInvoices}
                </td>

                <td className="p-3 font-semibold text-red-600">
                  {row.unpaidInvoices}
                </td>

                <td className="p-3 text-black">
                  Rp{" "}
                  {row.totalPayment.toLocaleString("id-ID")}
                </td>

                <td className="p-3">
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            Tidak ada customer
          </div>
        )}
      </div>
    </div>
  );
}
