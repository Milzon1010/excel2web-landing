const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const toCents = n => Math.round(n*100);

async function main(){
  const data = [
    { date:new Date(), description:'Pendapatan proyek A', category:'Pendapatan', amountCents: toCents(3500000) },
    { date:new Date(), description:'Hosting Vercel', category:'Operasional', amountCents: -toCents(250000) },
    { date:new Date(), description:'Kopi meeting', category:'Lainnya', amountCents: -toCents(45000) },
  ];
  for (const x of data) await prisma.transaction.create({ data:x });
}
main().finally(()=>prisma.$disconnect());
