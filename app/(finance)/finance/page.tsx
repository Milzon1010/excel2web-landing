'use client';

import { useEffect, useMemo, useState } from 'react';
import CircleStat from '@/components/CircleStat';

type Tx = {
  id: number;
  date: string; // ISO
  description: string;
  category: 'Pendapatan' | 'Operasional' | 'Lainnya';
  amountCents: number;
  createdAt: string;
  updatedAt: string;
};

const CATEGORIES = ['Pendapatan', 'Operasional', 'Lainnya'] as const;

export default function FinancePage() {
  // list + summary
  const [items, setItems] = useState<Tx[]>([]);
  const [summary, setSummary] = useState<{ in: number; out: number; balance: number }>({
    in: 0,
    out: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(false);

  // form
  const [date, setDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('Operasional');
  const [amount, setAmount] = useState<string>('0'); // rupiah, boleh negatif

  // filters
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [catFilter, setCatFilter] = useState<string>('');

  // utils
  const fmtIDR = (n: number) => `Rp ${n.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`;
  const toNumber = (s: string) => Number(s ?? '0');

  const canSubmit = useMemo(
    () => !!date && !!description && Number.isFinite(toNumber(amount)),
    [date, description, amount]
  );

  async function fetchList() {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (from) qs.set('from', from);
      if (to) qs.set('to', to);
      if (catFilter) qs.set('category', catFilter);

      const [listRes, sumRes] = await Promise.all([
        fetch(`/api/transactions?${qs.toString()}`, { cache: 'no-store' }),
        fetch(`/api/transactions?summary=1`, { cache: 'no-store' }),
      ]);

      const list = (await listRes.json()) as Tx[];
      const sum = (await sumRes.json()) as { in: number; out: number; balance: number };
      setItems(list);
      setSummary(sum);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addTx() {
    if (!canSubmit) return;
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date,
        description,
        category,
        amount: toNumber(amount), // negatif = pengeluaran
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
  }

  async function add3Samples() {
    const d = new Date().toISOString().slice(0, 10);
    const samples = [
      { date: d, description: 'Kopi meeting klien', category: 'Lainnya', amount: -45000 },
      { date: d, description: 'Pendapatan Excel→Web', category: 'Pendapatan', amount: 3500000 },
      { date: d, description: 'Hosting Vercel', category: 'Operasional', amount: -250000 },
    ] as const;

    for (const s of samples) {
      // eslint-disable-next-line no-await-in-loop
      await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(s),
      });
    }
    await fetchList();
  }

  async function remove(id: number) {
    if (!confirm('Hapus transaksi ini?')) return;
    const res = await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      alert('Gagal menghapus');
      return;
    }
    await fetchList();
  }

  // donut % helper
  const pctOut = summary.in > 0 ? Math.min(100, Math.round((summary.out / summary.in) * 100)) : (summary.out > 0 ? 100 : 0);
  const pctBal = summary.in > 0
    ? Math.max(0, Math.min(100, Math.round(((summary.in - summary.out) / summary.in) * 100)))
    : (summary.balance > 0 ? 100 : 0);

  return (
    <div className="max-w-6xl px-4 py-6 mx-auto sm:py-8">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Laporan Keuangan (demo)</h1>

      {/* Metrics */}
      <div className="grid gap-4 mb-6 sm:grid-cols-3">
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
          percent={pctOut}
          accent="rose"
          subtext="vs Pendapatan"
        />
        <CircleStat
          label="Saldo bulan ini"
          valueText={fmtIDR(summary.balance)}
          percent={pctBal}
          accent="sky"
          subtext="Pendapatan - Pengeluaran"
        />
      </div>

      {/* Form */}
      <div className="p-4 mb-6 border rounded-2xl border-slate-200">
        <div className="grid gap-3 sm:grid-cols-4">
          <div>
            <label className="block mb-1 text-xs text-slate-500">Tanggal</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg border-slate-300"
            />
          </div>

          <div className="sm:col-span-2">
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

            {/* quick add: kategori */}
            <div className="flex flex-wrap gap-2 mt-2">
              {CATEGORIES.map((c) => (
                <button
                  key={`chip-${c}`}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`px-2.5 py-1 rounded-full text-xs border transition ${
                    category === c
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-4">
            <label className="block mb-1 text-xs text-slate-500">Nominal (IDR)</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="contoh: 165000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg border-slate-300"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Gunakan minus (—) untuk pengeluaran. Contoh <b>-45000</b>
            </p>

            {/* quick add: nominal */}
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                { label: '-45k', val: -45000 },
                { label: '-100k', val: -100000 },
                { label: '+3,5jt', val: 3500000 },
                { label: '-250k', val: -250000 },
              ].map((p) => (
                <button
                  key={`p-${p.label}`}
                  type="button"
                  onClick={() => setAmount(String(p.val))}
                  className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100"
                >
                  {p.label}
                </button>
              ))}
            </div>
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
            className="inline-flex items-center px-4 py-2 text-sm border rounded-lg border-slate-300 hover:bg-slate-50"
          >
            + Tambah 3 contoh
          </button>
          <button
            onClick={fetchList}
            className="inline-flex items-center px-4 py-2 text-sm border rounded-lg border-slate-300 hover:bg-slate-50"
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="p-3 mb-4 border rounded-xl border-slate-200">
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
                <option key={`f-${c}`} value={c}>
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

      {/* Table */}
      <div className="overflow-x-auto bg-white border rounded-2xl border-slate-200">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
            <tr className="text-slate-600">
              <th className="p-3 text-left">Tanggal</th>
              <th className="p-3 text-left">Deskripsi</th>
              <th className="p-3 text-left">Kategori</th>
              <th className="p-3 text-left">Nominal</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((r) => (
              <tr key={r.id} className="whitespace-nowrap">
                <td className="p-3">{new Date(r.date).toLocaleDateString('id-ID')}</td>
                <td className="p-3 max-w-[28rem] truncate">{r.description}</td>
                <td className="p-3">{r.category}</td>
                <td className={`p-3 ${r.amountCents < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                  {fmtIDR(Math.round(Math.abs(r.amountCents) / 100))}
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => remove(r.id)}
                    className="px-2 py-1 text-xs border rounded text-rose-600 border-rose-200 hover:bg-rose-50"
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

      {loading && <p className="mt-3 text-xs text-slate-400">Memuat…</p>}
    </div>
  );
}
