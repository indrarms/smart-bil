import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const formData = await req.formData();

  if (formData.get("_method") === "DELETE") {
    await prisma.invoice.delete({
      where: { id: params.id },
    });
    return NextResponse.redirect("/invoices");
  }

  await prisma.invoice.update({
    where: { id: params.id },
    data: {
      amount: Number(formData.get("amount")),
      dueDate: new Date(formData.get("dueDate") as string),
      status: formData.get("status") as any,
    },
  });

  return NextResponse.redirect("/invoices");
}
