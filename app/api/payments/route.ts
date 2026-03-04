import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { invoiceId } = body;

    if (!invoiceId) {
      return NextResponse.json(
        { message: "invoiceId is required" },
        { status: 400 }
      );
    }

    // Ambil invoice + relasi
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        payments: true,
        penalty: true,
      },
    });

    if (!invoice) {
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 }
      );
    }

    // Cegah double payment
    if (invoice.payments.length > 0) {
      return NextResponse.json(
        { message: "Invoice already paid" },
        { status: 400 }
      );
    }

    const penaltyAmount = invoice.penalty
      ? Number(invoice.penalty.amount)
      : 0;

    const totalAmount = Number(invoice.amount) + penaltyAmount;

    // Buat payment
    await prisma.payment.create({
      data: {
        invoiceId: invoice.id,
        amount: totalAmount,
        method: "MANUAL",
        status: "SUCCESS", // WAJIB ADA (error kamu sebelumnya)
      },
    });

    // Update invoice
    await prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        status: "PAID",
      },
    });

    return NextResponse.json({
      message: "Payment successful",
    });
  } catch (error) {
    console.error("PAYMENT ERROR:", error);
    return NextResponse.json(
      { message: "Payment failed" },
      { status: 500 }
    );
  }
}
