// app/(finance)/finance/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import CircleStat from '@/components/CircleStat';

type Tx = {
  id: number;
  date: string; // ISO
  description: string;
  category: string;
  amountCents: number;
  createdAt: string;
  updatedAt: string;
};

const CATEGORIES = ['Pendapatan', 'Operasional', 'Lainnya'] as const;

type Summary = { in: number; out: number; balance: number };

const fmtIDR = (n: number) =>
  `Rp ${n.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`;

// helper aman: cek status & content-type sebelum .json()
async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const ct = res.headers.get('content-type') ?? '';
    if (!ct.includes('application/json')) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export default function FinancePage() {
  const [items, setItems] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Summary>({ in: 0, out: 0, balance: 0 });

  // form
  const [date, setDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [description, setDescription] = useState('');
  const [category, setCategory] =
    useState<(typeof CATEGORIES)[number]>('Operasional');
  const [amount, setAmount] = useState<string>('0');

  // filter
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [catFilter, setCatFilter] = useState('');

  async function fetchList() {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (from) qs.set('from', from);
      if (to) qs.set('to', to);
      if (catFilter) qs.set('category', catFilter);

      const [list, sum] = await Promise.all([
        fetchJSON<Tx[]>(`/api/transactions?${qs.toString()}`),
        fetchJSON<Summary>(`/api/transactions?summary=1`),
      ]);

      setItems(Array.isArray(list) ? list : []);
      setSummary(sum ?? { in: 0, out: 0, balance: 0 });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canSubmit = useMemo(
    () => !!date && !!description && Number.isFinite(Number(amount)),
    [date, description, amount],
  );

  async function addTx() {
    if (!canSubmit) return;
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          description,
          category,
          amount: Number(amount), // negatif = pengeluaran
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err?.error ?? 'Gagal menambah data');
        return;
      }
      setDescription('');
      setAmount('0');
      await fetchList();
    } catch {
      alert('Jaringan bermasalah. Coba lagi.');
    }
  }

  async function add3Samples() {
    const today = new Date().toISOString().slice(0, 10);
    const samples = [
      { date: today, description: 'Kopi meeting klien', category: 'Lainnya', amount: -45000 },
      { date: today, description: 'Pendapatan Excel→Web', category: 'Pendapatan', amount: 3500000 },
      { date: today, description: 'Hosting Vercel', category: 'Operasional', amount: -250000 },
    ] as const;

    for (const s of samples) {
      // eslint-disable-next-line no-await-in-loop
      await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(s),
      }).catch(() => {});
    }
    await fetchList();
  }

  async function remove(id: number) {
    if (!confirm('Hapus transaksi ini?')) return;
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        alert('Gagal menghapus');
        return;
      }
      await fetchList();
    } catch {
      alert('Jaringan bermasalah. Coba lagi.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
      <div className="max-w-5xl px-4 py-8 mx-auto">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Laporan Keuangan (demo)</h1>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800"
          >
            ← Kembali ke Excel → Web-App
          </Link>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-3">
          <CircleStat
            label="Pendapatan"
            valueText={fmtIDR(summary.in)}
            percent={summary.in === 0 ? 0 : 100}
            accent="green"
            subtext="Bulan berjalan"
          />
          <CircleStat
            label="Pengeluaran"
            valueText={fmtIDR(summary.out)}
            percent={
              summary.in > 0
                ? Math.min(100, Math.round((summary.out / summary.in) * 100))
                : summary.out > 0
                ? 100
                : 0
            }
            accent="rose"
            subtext="vs Pendapatan"
          />
          <CircleStat
            label="Saldo bulan ini"
            valueText={fmtIDR(summary.balance)}
            percent={
              summary.in > 0
                ? Math.max(
                    0,
                    Math.min(
                      100,
                      Math.round(
                        ((summary.in - summary.out) / summary.in) * 100,
                      ),
                    ),
                  )
                : summary.balance > 0
                ? 100
                : 0
            }
            accent="sky"
            subtext="Pendapatan - Pengeluaran"
          />
        </div>

        {/* Form input */}
        <div className="p-4 mb-6 border rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm">
          <div className="grid gap-3 md:grid-cols-4">
            <div>
              <label className="block mb-1 text-xs text-slate-500">Tanggal</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg border-slate-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-xs text-slate-500">Deskripsi</label>
              <input
                placeholder="Contoh: Pembelian domain .co.id"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg border-slate-300"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs text-slate-500">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-sm border rounded-lg border-slate-300"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-4">
              <label className="block mb-1 text-xs text-slate-500">Nominal (IDR)</label>
              <input
                type="number"
                inputMode="numeric"
                placeholder="contoh: 165000 (pakai minus untuk pengeluaran)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg border-slate-300"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                Gunakan minus (—) untuk pengeluaran. Contoh <b>-45000</b>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={addTx}
              disabled={!canSubmit || loading}
              className="inline-flex items-center px-4 py-2 text-sm text-white rounded-lg bg-sky-600 hover:bg-sky-700 disabled:opacity-50"
            >
              + Tambah Transaksi
            </button>
            <button
              onClick={add3Samples}
              className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-50"
            >
              + 3 contoh
            </button>
            <button
              onClick={fetchList}
              className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-50"
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="p-3 mb-4 border rounded-2xl border-slate-200 bg-white/70 backdrop-blur-sm">
          <div className="flex flex-wrap items-end gap-3 text-sm">
            <div>
              <div className="mb-1 text-xs text-slate-500">Dari</div>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="px-3 py-2 border rounded-lg border-slate-300"
              />
            </div>
            <div>
              <div className="mb-1 text-xs text-slate-500">Sampai</div>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="px-3 py-2 border rounded-lg border-slate-300"
              />
            </div>
            <div>
              <div className="mb-1 text-xs text-slate-500">Kategori</div>
              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg border-slate-300"
              >
                <option value="">Semua</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={fetchList}
              className="h-10 px-4 border rounded-lg border-slate-300 hover:bg-slate-50"
            >
              Terapkan Filter
            </button>
          </div>
        </div>

        {/* Tabel (sticky header) */}
        <div className="overflow-hidden bg-white border rounded-2xl border-slate-200">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white/90 text-slate-600 backdrop-blur">
              <tr>
                <th className="p-3 text-left">Tanggal</th>
                <th className="p-3 text-left">Deskripsi</th>
                <th className="p-3 text-left">Kategori</th>
                <th className="p-3 text-left">Nominal</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((r) => (
                <tr key={r.id}>
                  <td className="p-3">
                    {new Date(r.date).toLocaleDateString('id-ID')}
                  </td>
                  <td className="p-3">{r.description}</td>
                  <td className="p-3">{r.category}</td>
                  <td
                    className={`p-3 ${
                      r.amountCents < 0 ? 'text-rose-600' : 'text-slate-800'
                    }`}
                  >
                    {fmtIDR(Math.round(Math.abs(r.amountCents) / 100))}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => remove(r.id)}
                      className="text-rose-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-5 text-center text-slate-500">
                    Belum ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {loading && (
          <p className="mt-3 text-xs text-slate-400">Memuat…</p>
        )}
      </div>
    </div>
  );
}
