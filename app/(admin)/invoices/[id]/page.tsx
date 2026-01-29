import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function AdminInvoiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) return notFound();

  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: {
      customer: true,
      payments: true,
      penalty: true,
    },
  });

  if (!invoice) return notFound();

  const penaltyAmount = invoice.penalty
    ? Number(invoice.penalty.amount)
    : 0;

  const totalAmount =
    Number(invoice.amount) + penaltyAmount;

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-4">
        Invoice Detail
      </h1>

      <div className="bg-white rounded shadow p-6 mb-6">
        <p><strong>Invoice No:</strong> {invoice.invoiceNo}</p>
        <p><strong>Customer:</strong> {invoice.customer.name}</p>
        <p>
          <strong>Period:</strong>{" "}
          {invoice.periodMonth}/{invoice.periodYear}
        </p>
        <p>
          <strong>Due Date:</strong>{" "}
          {invoice.dueDate.toLocaleDateString("id-ID")}
        </p>
        <p>
          <strong>Status:</strong> {invoice.status}
        </p>
      </div>

      <div className="bg-white rounded shadow p-6 text-right">
        {penaltyAmount > 0 && (
          <p className="text-red-600">
            Penalty: Rp{" "}
            {penaltyAmount.toLocaleString("id-ID")}
          </p>
        )}
        <p className="text-lg font-bold text-black">
          Total: Rp {totalAmount.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
