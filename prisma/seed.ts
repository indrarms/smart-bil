import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  // Admin
  const admin = await prisma.user.create({
    data: {
      email: "admin@smartbil.com",
      password: "admin123",
      role: "ADMIN",
    },
  });

  // Customer user
  const customerUser = await prisma.user.create({
    data: {
      email: "customer@smartbil.com",
      password: "customer123",
      role: "CUSTOMER",
    },
  });

  const customer = await prisma.customer.create({
    data: {
      userId: customerUser.id,
      name: "Budi Santoso",
      phone: "081234567890",
      address: "Jakarta",
    },
  });

  // Pending invoice
  const invoicePending = await prisma.invoice.create({
    data: {
      invoiceNo: "INV-2026-001",
      customerId: customer.id,
      periodMonth: 1,
      periodYear: 2026,
      amount: 1500000,
      dueDate: new Date("2026-02-20"),
      status: "PENDING",
      items: {
        create: [
          {
            name: "Biaya Layanan Januari",
            quantity: 1,
            price: 1500000,
          },
        ],
      },
    },
  });

  // Overdue invoice
  const invoiceOverdue = await prisma.invoice.create({
    data: {
      invoiceNo: "INV-2026-002",
      customerId: customer.id,
      periodMonth: 12,
      periodYear: 2025,
      amount: 1200000,
      dueDate: new Date("2026-01-20"),
      status: "OVERDUE",
      items: {
        create: [
          {
            name: "Biaya Layanan Desember",
            quantity: 1,
            price: 1200000,
          },
        ],
      },
    },
  });

  await prisma.penalty.create({
    data: {
      invoiceId: invoiceOverdue.id,
      percentage: 5,
      amount: 60000,
    },
  });

  // Paid invoice
  const invoicePaid = await prisma.invoice.create({
    data: {
      invoiceNo: "INV-2025-012",
      customerId: customer.id,
      periodMonth: 11,
      periodYear: 2025,
      amount: 900000,
      dueDate: new Date("2025-12-20"),
      status: "PAID",
      items: {
        create: [
          {
            name: "Biaya Layanan November",
            quantity: 1,
            price: 900000,
          },
        ],
      },
    },
  });

  await prisma.payment.create({
    data: {
      invoiceId: invoicePaid.id,
      amount: 900000,
      method: "BANK_TRANSFER",
      paidAt: new Date("2025-12-15"),
    },
  });

  console.log("✅ Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
