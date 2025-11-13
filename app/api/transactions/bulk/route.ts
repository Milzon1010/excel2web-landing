// TODO: terima file XLSX/CSV; parse lalu insertMany
import { NextResponse } from 'next/server';
export async function POST() {
  return NextResponse.json({ todo: 'implement bulk import' }, { status: 501 });
}
