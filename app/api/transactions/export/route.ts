// TODO: generate XLSX dari data transaksi
import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ todo: 'implement export xlsx' }, { status: 501 });
}
