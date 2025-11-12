import Image from 'next/image';

const GFORM_URL =
  'https://forms.gle/GJYxU1KEgchFW4oU6?utm_source=landing&utm_medium=cta';

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* HEADER */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <Image src="/logo-allanray.svg" alt="Allanray" width={28} height={28} />
          <span className="text-sm font-medium text-slate-600">Allanray TechSight</span>
        </div>
        <a
          href={GFORM_URL}
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        >
          Order via Google Form
        </a>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-8 md:pb-16 md:pt-10">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Excel → Web-App <span className="text-brand-600">dalam 48 jam</span>.
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Satu file → satu aplikasi web rapi: form, filter, validasi, izin user,
              dan ekspor balik ke Excel. Jual putus — tanpa biaya langganan.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={GFORM_URL}
                className="rounded-lg bg-brand-600 px-5 py-3 text-white shadow-sm hover:bg-brand-700"
              >
                Kirim Excel via Google Form
              </a>
              <a
                href="#contoh"
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-slate-800 shadow-sm hover:bg-slate-50"
              >
                Lihat Contoh
              </a>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Data Anda aman — contoh dihapus 7 hari setelah serah terima.
            </p>
          </div>

          {/* MOCKUP CARD */}
          <div className="rounded-2xl border border-slate-300 bg-white/90 backdrop-blur-sm p-5 shadow-lg">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-2">
                <div className="size-2 rounded-full bg-rose-500" />
                <div className="size-2 rounded-full bg-amber-500" />
                <div className="size-2 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs text-slate-500">excel-web-app.local</span>
              </div>
              <div className="space-y-4 p-4">
                <div className="flex gap-2">
                  <input
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
                    placeholder="Cari data…"
                  />
                  <button className="rounded-lg border border-slate-300 bg-slate-50 px-3 text-sm text-slate-800 hover:bg-slate-100">
                    Filter
                  </button>
                </div>
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="px-3 py-2">ID</th>
                        <th className="px-3 py-2">Nama</th>
                        <th className="px-3 py-2">Kategori</th>
                        <th className="px-3 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['001', 'Contoh A', 'Sales', 'Aktif'],
                        ['002', 'Contoh B', 'Ops', 'Pending'],
                        ['003', 'Contoh C', 'Finance', 'Aktif'],
                      ].map((r) => (
                        <tr key={r[0]} className="odd:bg-white even:bg-slate-50">
                          {r.map((c) => (
                            <td key={c} className="px-3 py-2 text-slate-800">
                              {c}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end gap-2">
                  <button className="rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 hover:bg-slate-100">
                    Export CSV
                  </button>
                  <button className="rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 hover:bg-slate-100">
                    Export XLSX
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-slate-500">
              Demo UI statis untuk ilustrasi (bukan data asli).
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-6xl px-6 pb-20" id="contoh">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Hemat 6 jam/minggu', 'Hapus double-entry & salah ketik.'],
            ['Aman & Terkendali', 'Role Viewer/Admin, jejak perubahan, ekspor terukur.'],
            ['Siap Integrasi', 'Opsional: API/GeoJSON untuk QGIS / dashboard Anda.'],
          ].map(([t, s]) => (
            <div
              key={t}
              className="rounded-xl border border-slate-300 bg-white p-5 shadow-sm"
            >
              <div className="mb-2 h-8 w-8 rounded-lg bg-brand-600/15" />
              <h3 className="text-base font-semibold text-slate-900">{t}</h3>
              <p className="mt-1 text-sm text-slate-600">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-transparent">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-sm text-slate-600">
          <span>© {new Date().getFullYear()} Allanray TechSight</span>
          <a className="hover:text-slate-800" href={GFORM_URL}>
            Order via Google Form
          </a>
        </div>
      </footer>
    </main>
  );
}
