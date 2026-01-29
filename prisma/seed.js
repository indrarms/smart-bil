const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  const adminPassword = await bcrypt.hash("admin123", 10);
  const customerPassword = await bcrypt.hash("customer123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@smartbil.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      email: "customer@smartbil.com",
      password: customerPassword,
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

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNo: "INV-2026-001",
      customerId: customer.id,
      periodMonth: 12,
      periodYear: 2025,
      amount: 1200000,
      dueDate: new Date("2026-01-20"),
      status: "OVERDUE",
    },
  });

  await prisma.penalty.create({
    data: {
      invoiceId: invoice.id,
      percentage: 5,
      amount: 1200000 * 0.05,
    },
  });

  console.log("✅ Seeding finished successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
