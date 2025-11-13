// app/api/transactions/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/transactions
// Opsi:
//   ?summary=1         → ringkasan bulan berjalan (income/out/balance)
//   ?from=YYYY-MM-DD&to=YYYY-MM-DD&category=... → filter daftar
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams;

    // summary bulan berjalan
    if (search.get('summary') === '1') {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

      const rows = await prisma.transaction.findMany({
        where: { date: { gte: start, lte: end } },
      });

      const sum = (arr: typeof rows, pred: (v: number) => boolean) =>
        Math.round(
          arr
            .map((r) => r.amountCents / 100)
            .filter((v) => pred(v))
            .reduce((a, b) => a + Math.abs(b), 0),
        );

      const income = sum(rows, (v) => v > 0);
      const expense = sum(rows, (v) => v < 0);

      return NextResponse.json({
        in: income,
        out: expense,
        balance: Math.round(income - expense),
      });
    }

    // daftar transaksi (optional filter)
    const where: any = {};
    const from = search.get('from');
    const to = search.get('to');
    const category = search.get('category');

    if (from || to) {
      where.date = {};
      if (from) where.date.gte = new Date(from);
      if (to) where.date.lte = new Date(to);
    }
    if (category) where.category = category;

    const rows = await prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(rows);
  } catch (err) {
    console.error('GET /api/transactions error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/transactions
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      date: string;
      description: string;
      category: 'Pendapatan' | 'Operasional' | 'Lainnya';
      amount: number; // rupiah; negatif = pengeluaran
    };

    if (!body?.date || !body?.description || !body?.category || typeof body.amount !== 'number') {
      return NextResponse.json({ error: 'Payload tidak valid' }, { status: 400 });
    }

    const created = await prisma.transaction.create({
      data: {
        date: new Date(body.date),
        description: body.description,
        category: body.category,
        amountCents: Math.round(body.amount * 100),
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error('POST /api/transactions error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
