// app/api/transactions/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE /api/transactions/:id
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const idNum = Number(params.id);
    if (!Number.isFinite(idNum)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    await prisma.transaction.delete({ where: { id: idNum } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err?.code === 'P2025') {
      return NextResponse.json({ error: 'Tidak ditemukan' }, { status: 404 });
    }
    console.error('DELETE /api/transactions/[id] error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
