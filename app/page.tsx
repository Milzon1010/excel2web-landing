// app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F8FB] text-slate-900">
      {/* NAV */}
      <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo-allanray.svg" alt="Allanray" width={22} height={22} />
            <span className="text-sm font-semibold text-slate-700">
              Allanray TechSight
            </span>
          </div>

          <a
            href="https://forms.gle/YSiFmLfwuPGaMuKB7"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary inline-flex items-center justify-center rounded-lg bg-brand-500 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            Order via Google Form
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl py-16 md:py-24 px-4 sm:px-6 md:px-10">
        <div className="grid items-start gap-10 md:grid-cols-2">
          {/* Copy */}
          <div>
            <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Excel → Web-App <span className="text-brand-600">dalam 48 jam.</span>
            </h1>

            <p className="mt-4 max-w-xl text-slate-600">
              Satu file → satu aplikasi web rapi: form, filter, validasi, izin user, dan ekspor
              balik ke Excel. Jual putus — tanpa biaya langganan.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {/* === CTA GOOGLE FORM (sesuai permintaan) === */}
              <a
                href="https://forms.gle/xxxxx"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                Kirim Excel via Google Form
              </a>

              <a
                href="#contoh"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Lihat Contoh
              </a>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Data Anda aman — contoh dihapus 7 hari setelah serah terima.
            </p>
          </div>

          {/* Mock UI */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs text-slate-500">excel-web-app.local</span>
              </div>

              <div className="flex gap-2">
                <input
                  placeholder="Cari data..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  Filter
                </button>
              </div>

              <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-slate-600">
                      <th className="px-3 py-2 font-semibold">ID</th>
                      <th className="px-3 py-2 font-semibold">Nama</th>
                      <th className="px-3 py-2 font-semibold">Kategori</th>
                      <th className="px-3 py-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {[
                      ["001", "Contoh A", "Sales", "Aktif"],
                      ["002", "Contoh B", "Ops", "Pending"],
                      ["003", "Contoh C", "Finance", "Aktif"],
                    ].map(([id, nama, kat, sts]) => (
                      <tr key={id} className="text-slate-700">
                        <td className="px-3 py-2">{id}</td>
                        <td className="px-3 py-2">{nama}</td>
                        <td className="px-3 py-2">{kat}</td>
                        <td className="px-3 py-2">{sts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 flex gap-2">
                <button className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  Export CSV
                </button>
                <button className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  Export XLSX
                </button>
              </div>

              <p className="mt-3 text-center text-[11px] text-slate-400">
                Demo UI statis untuk ilustrasi (bukan data asli).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section
        id="contoh"
        className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 pb-16 md:pb-24"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 h-8 w-8 rounded-xl bg-slate-100" />
            <h3 className="font-semibold text-slate-800">Hemat 6 jam/minggu</h3>
            <p className="mt-1 text-sm text-slate-600">
              Hapus double-entry & salah ketik.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 h-8 w-8 rounded-xl bg-slate-100" />
            <h3 className="font-semibold text-slate-800">Aman & Terkendali</h3>
            <p className="mt-1 text-sm text-slate-600">
              Role Viewer/Admin, jejak perubahan, ekspor terukur.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 h-8 w-8 rounded-xl bg-slate-100" />
            <h3 className="font-semibold text-slate-800">Siap Integrasi</h3>
            <p className="mt-1 text-sm text-slate-600">
              Opsional: API/GeoJSON untuk QGIS / dashboard Anda.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl h-14 px-4 sm:px-6 md:px-10 flex items-center justify-between text-xs text-slate-500">
          <span>© 2025 Allanray TechSight</span>
          <a
            href="https://forms.gle/xxxxx"
            target="_blank"
            rel="noreferrer"
            className="text-brand-600 hover:text-brand-700"
          >
            Order via Google Form
          </a>
        </div>
      </footer>
    </main>
  );
}
