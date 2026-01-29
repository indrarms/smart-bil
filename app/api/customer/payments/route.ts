import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // DEV MODE: ambil customer pertama
    const customer = await prisma.customer.findFirst();

    if (!customer) {
      return NextResponse.json([]);
    }

    const payments = await prisma.payment.findMany({
      where: {
        invoice: {
          customerId: customer.id,
        },
      },
      include: {
        invoice: {
          select: {
            invoiceNo: true,
            periodMonth: true,
            periodYear: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      payments.map((p) => ({
        id: p.id,
        invoiceNo: p.invoice.invoiceNo,
        period: `${p.invoice.periodMonth}/${p.invoice.periodYear}`,
        amount: Number(p.amount),
        method: p.method,
        status: p.status,
        date: p.createdAt,
      }))
    );
  } catch (error) {
    console.error("PAYMENT HISTORY ERROR:", error);
    return NextResponse.json([], { status: 500 });
  }
}
