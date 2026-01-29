export default async function MyPaymentsPage() {
  const res = await fetch("http://localhost:3000/api/customer/payments", {
    cache: "no-store",
  });

  const payments: {
    id: string;
    invoiceNo: string;
    period: string;
    amount: number;
    method: string;
    status: string;
    date: string;
  }[] = await res.json();

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
        Payment History
      </h1>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Invoice</th>
              <th className="text-left p-3">Period</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Method</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.invoiceNo}</td>
                <td className="p-3">{p.period}</td>
                <td className="p-3">
                  Rp {p.amount.toLocaleString("id-ID")}
                </td>
                <td className="p-3">{p.method}</td>

                {/* STATUS */}
                <td className="p-3 font-semibold">
                  <span className={statusClass(p.status)}>
                    {p.status}
                  </span>
                </td>

                <td className="p-3">
                  {new Date(p.date).toLocaleDateString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            Belum ada pembayaran
          </div>
        )}
      </div>
    </div>
  );
}
