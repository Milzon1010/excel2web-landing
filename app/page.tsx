'use client';

import Link from 'next/link';

export default function Landing() {
  return (
    <main className="px-4 py-10 mx-auto max-w-7xl sm:px-6">
      {/* HERO */}
      <section className="grid items-start gap-8 lg:grid-cols-2">
        {/* Left: copy */}
        <div>
          <p className="font-medium text-sky-700">Allanray TechSight</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Ubah <span className="underline text-sky-700 decoration-2">Excel</span> → Web-App
            <br />dalam <span className="text-sky-700">48 jam</span>.
          </h1>

          <p className="max-w-2xl mt-4 text-slate-600">
            Satu file jadi aplikasi web rapi: form, validasi, filter, role user, dan ekspor balik ke Excel.
            Jual putus — tanpa biaya langganan.
          </p>

          <div className="flex flex-col w-full gap-3 mt-6 sm:flex-row sm:w-auto">
            <a
              href="https://forms.gle/your-google-form"
              className="inline-flex justify-center px-5 py-3 text-white rounded-lg bg-sky-600 hover:bg-sky-700"
            >
              Kirim Excel via Google Form
            </a>

            <Link
              href="/finance"
              className="inline-flex justify-center px-5 py-3 border rounded-lg border-slate-300 hover:bg-slate-50"
            >
              Lihat Contoh
            </Link>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Data Anda aman — contoh dihapus 7 hari setelah serah terima.
          </p>
        </div>

        {/* Right: demo card */}
        <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="mb-2 text-xs text-slate-500">excel-web-app.local</div>

          {/* Search + Filter */}
          <div className="flex gap-2">
            <input
              placeholder="Cari data..."
              className="w-full px-3 py-2 text-sm border rounded-lg border-slate-300"
            />
            <button className="px-3 py-2 text-sm border rounded-lg border-slate-300 hover:bg-slate-50">
              Filter
            </button>
          </div>

          {/* Table demo (scrollable on mobile) */}
          <div className="px-2 mt-3 -mx-2 overflow-x-auto">
            <table className="min-w-[560px] w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Nama</th>
                  <th className="p-2 text-left">Kategori</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2">001</td>
                  <td className="p-2">Contoh A</td>
                  <td className="p-2">Sales</td>
                  <td className="p-2">Aktif</td>
                </tr>
                <tr>
                  <td className="p-2">002</td>
                  <td className="p-2">Contoh B</td>
                  <td className="p-2">Ops</td>
                  <td className="p-2">Pending</td>
                </tr>
                <tr>
                  <td className="p-2">003</td>
                  <td className="p-2">Contoh C</td>
                  <td className="p-2">Finance</td>
                  <td className="p-2">Aktif</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex gap-2 mt-3">
            <button className="px-3 py-2 text-sm border rounded-lg border-slate-300 hover:bg-slate-50">
              Export CSV
            </button>
            <button className="px-3 py-2 text-sm border rounded-lg border-slate-300 hover:bg-slate-50">
              Export XLSX
            </button>
          </div>

          <p className="mt-2 text-[11px] text-slate-400">
            Demo UI statis untuk ilustrasi (bukan data asli).
          </p>
        </div>
      </section>

      {/* 3 cards */}
      <section className="grid gap-4 mt-12 sm:grid-cols-3">
        <div className="p-4 bg-white border rounded-2xl border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-sky-100" />
          <h3 className="mt-3 font-semibold">Hemat 6 jam/minggu</h3>
          <p className="text-sm text-slate-600">Hapus double-entry & salah ketik.</p>
        </div>
        <div className="p-4 bg-white border rounded-2xl border-slate-200">
          <div className="w-8 h-8 bg-green-100 rounded-lg" />
          <h3 className="mt-3 font-semibold">Aman & Terkendali</h3>
          <p className="text-sm text-slate-600">Role, jejak perubahan, ekspor terukur.</p>
        </div>
        <div className="p-4 bg-white border rounded-2xl border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-amber-100" />
          <h3 className="mt-3 font-semibold">Siap Integrasi</h3>
          <p className="text-sm text-slate-600">Opsional: API/GeoJSON/QGIS/dashboard.</p>
        </div>
      </section>
    </main>
  );
}
