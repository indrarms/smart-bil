import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateInvoiceStatus } from "@/lib/invoice";

export async function GET() {
  try {
    const customer = await prisma.customer.findFirst();

    if (!customer) {
      return NextResponse.json([]);
    }

    const invoices = await prisma.invoice.findMany({
      where: { customerId: customer.id },
      include: {
        payments: true,
        penalty: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const result = invoices.map((invoice) => {
      const { status, penaltyAmount } = calculateInvoiceStatus(invoice);

      return {
        id: invoice.id,
        invoiceNo: invoice.invoiceNo,
        period: `${invoice.periodMonth}/${invoice.periodYear}`,
        amount: Number(invoice.amount),

        // ✅ FIX UTAMA DI SINI
        dueDate: invoice.dueDate
          ? invoice.dueDate.toISOString()
          : null,

        status,
        penaltyAmount,
        totalAmount:
          status === "OVERDUE"
            ? Number(invoice.amount) + penaltyAmount
            : Number(invoice.amount),
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}
