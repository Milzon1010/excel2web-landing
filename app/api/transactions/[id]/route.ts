import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type Params = { params: { id: string } };

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const idNum = Number(params.id);
    if (!Number.isFinite(idNum)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }
    await prisma.transaction.delete({ where: { id: idNum } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
  }
}
