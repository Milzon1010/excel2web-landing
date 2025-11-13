'use client';

import { useEffect, useMemo, useState } from 'react';
import CircleStat from '@/components/CircleStat';

type Tx = {
  id: number;
  date: string;
  description: string;
  category: 'Pendapatan' | 'Operasional' | 'Lainnya';
  amountCents: number;
  createdAt: string;
  updatedAt: string;
};

const CATEGORIES = ['Pendapatan', 'Operasional', 'Lainnya'] as const;

export default function FinancePage() {
  const [items, setItems] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({ in: 0, out: 0, balance: 0 });

  // form
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('Operasional');
  const [amount, setAmount] = useState<string>('0');

  // filters
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [catFilter, setCatFilter] = useState<string>('');

  const fmtIDR = (n: number) => `Rp ${n.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`;

  async function fetchList() {
    setLoading(true);
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
    setLoading(false);
  }

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canSubmit = useMemo(
    () => !!date && !!description && Number.isFinite(Number(amount)),
    [date, description, amount]
  );

  async function addTx(payload?: {
    date: string;
    description: string;
    category: Tx['category'];
    amount: number;
  }) {
    const body = payload ?? {
      date,
      description,
      category,
      amount: Number(amount),
    };
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err?.error ?? 'Gagal menambah data');
      return;
    }
    if (!payload) {
      setDescription('');
      setAmount('0');
    }
    await fetchList();
  }

  async function add3Samples() {
    const d = new Date().toISOString().slice(0, 10);
    const samples = [
      { date: d, description: 'Kopi meeting klien', category: 'Lainnya' as const, amount: -45000 },
      { date: d, description: 'Pendapatan Excel→Web', category: 'Pendapatan' as const, amount: 3500000 },
      { date: d, description: 'Hosting Vercel', category: 'Operasional' as const, amount: -250000 },
    ];
    for (const s of samples) await addTx(s);
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

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Laporan Keuangan (demo)</h1>

      {/* Donut summary */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-3">
        <div className="p-3 border border-green-200 rounded-2xl bg-green-50">
          <CircleStat
            label="Pendapatan"
            valueText={fmtIDR(summary.in)}
            percent={summary.in === 0 ? 0 : 100}
            accent="green"
            subtext="Bulan berjalan"
          />
        </div>
        <div className="p-3 border rounded-2xl border-rose-200 bg-rose-50">
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
        </div>
        <div className="p-3 border rounded-2xl border-sky-200 bg-sky-50">
          <CircleStat
            label="Saldo bulan ini"
            valueText={fmtIDR(summary.balance)}
            percent={
              summary.in > 0
                ? Math.max(0, Math.min(100, Math.round(((summary.in - summary.out) / summary.in) * 100)))
                : summary.balance > 0
                ? 100
                : 0
            }
            accent="sky"
            subtext="Pendapatan - Pengeluaran"
          />
        </div>
      </div>

      {/* Form input */}
      <div className="p-4 mb-6 bg-white border rounded-2xl border-slate-200">
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
            <div className="flex flex-wrap gap-2 mt-2">
              {/* quick-add nominal */}
              {[-45000, -100000, 3500000, -250000].map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(String(v))}
                  className="px-3 py-1 text-xs border rounded-full border-slate-300 hover:bg-slate-50"
                >
                  {v < 0 ? `-${fmtIDR(Math.abs(v)).slice(3)}` : `+${fmtIDR(v).slice(3)}`}
                </button>
              ))}
              {/* quick category */}
              <div className="flex items-center gap-2 ml-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`rounded-full px-3 py-1 text-xs border ${
                      category === c ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => canSubmit && addTx()}
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
      <div className="p-3 mb-4 bg-white border rounded-xl border-slate-200">
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

      {/* Table with sticky header */}
      <div className="overflow-hidden bg-white border rounded-2xl border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3 text-left">Tanggal</th>
                <th className="p-3 text-left">Deskripsi</th>
                <th className="p-3 text-left">Kategori</th>
                <th className="p-3 text-left">Nominal</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((r) => (
                <tr key={r.id}>
                  <td className="p-3">{new Date(r.date).toLocaleDateString('id-ID')}</td>
                  <td className="p-3">{r.description}</td>
                  <td className="p-3">{r.category}</td>
                  <td className={`p-3 ${r.amountCents < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {fmtIDR(Math.round(Math.abs(r.amountCents) / 100))}
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => remove(r.id)} className="text-rose-600 hover:underline">
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
      </div>

      {loading && <p className="mt-3 text-xs text-slate-400">Memuat…</p>}
    </div>
  );
}
