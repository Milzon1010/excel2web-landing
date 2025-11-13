import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


// GET /api/transactions
// opsional: ?summary=1  => ringkasan bulan berjalan
//           ?from=YYYY-MM-DD&to=YYYY-MM-DD&category=...
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

      const income = rows
        .filter((r) => r.amountCents > 0)
        .reduce((a, b) => a + b.amountCents, 0);
      const expense = rows
        .filter((r) => r.amountCents < 0)
        .reduce((a, b) => a + Math.abs(b.amountCents), 0);

      return NextResponse.json({
        in: Math.round(income / 100),
        out: Math.round(expense / 100),
        balance: Math.round((income - expense) / 100),
      });
    }

    // daftar transaksi (dengan filter opsional)
    const where: any = {};
    const from = search.get('from');
    const to = search.get('to');
    const cat = search.get('category');

    if (from || to) {
      where.date = {};
      if (from) where.date.gte = new Date(from);
      if (to) where.date.lte = new Date(to);
    }
    if (cat) where.category = cat;

    const rows = await prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
  }
}

// POST /api/transactions
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      date: string;
      description: string;
      category: string;
      amount: number; // rupiah
    };

    if (!body?.date || !body?.description || !body?.category || typeof body?.amount !== 'number') {
      return NextResponse.json({ error: 'Input tidak valid' }, { status: 400 });
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
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
  }
}
