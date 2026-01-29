import { Invoice, Payment, Penalty } from "@prisma/client";

type InvoiceWithRelations = Invoice & {
  payments: Payment[];
  penalty?: Penalty | null;
};

export function calculateInvoiceStatus(invoice: InvoiceWithRelations) {
  // Jika sudah dibayar
  if (invoice.payments.length > 0) {
    return {
      status: "PAID" as const,
      penaltyAmount: 0,
    };
  }

  const today = new Date();
  const isOverdue = today > invoice.dueDate;

  if (isOverdue) {
    const penaltyAmount = Number(invoice.amount) * 0.05;

    return {
      status: "OVERDUE" as const,
      penaltyAmount,
    };
  }

  return {
    status: "PENDING" as const,
    penaltyAmount: 0,
  };
}
