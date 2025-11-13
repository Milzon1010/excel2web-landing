import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.createMany({
    data: [
      { date: new Date(), description: 'Kopi meeting klien', category: 'Lainnya',     amountCents: -45000 },
      { date: new Date(), description: 'Pendapatan Excel→Web', category: 'Pendapatan', amountCents: 3500000 },
      { date: new Date(), description: 'Hosting Vercel',       category: 'Operasional', amountCents: -250000 },
    ],
  });
}
main().finally(() => prisma.$disconnect());
