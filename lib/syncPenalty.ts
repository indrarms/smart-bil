import { prisma } from "@/lib/prisma";
import { calculateInvoiceStatus } from "./invoice";

export async function syncInvoicePenalty(invoiceId: string) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      payments: true,
      penalty: true,
    },
  });

  if (!invoice) return;

  const { status, penaltyAmount } = calculateInvoiceStatus(invoice);

  // Update status invoice
  await prisma.invoice.update({
    where: { id: invoice.id },
    data: { status },
  });

  // Handle penalty
  if (status === "OVERDUE") {
    await prisma.penalty.upsert({
      where: { invoiceId: invoice.id },
      update: { amount: penaltyAmount },
      create: {
        invoiceId: invoice.id,
        percentage: 5,
        amount: penaltyAmount,
      },
    });
  }
}
