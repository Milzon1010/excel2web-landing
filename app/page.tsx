/* app/page.tsx */
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* container */}
      <div className="w-full max-w-6xl px-4 py-10 mx-auto lg:px-6 md:py-14">
        {/* Top brand */}
        <div className="text-sm font-medium text-sky-700">Allanray TechSight</div>

        {/* HERO */}
        <section className="grid grid-cols-1 gap-8 mt-4 md:mt-8 md:grid-cols-2">
          {/* Left copy */}
          <div>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              Ubah{" "}
              <span className="underline decoration-sky-400 underline-offset-4">
                Excel
              </span>{" "}
              → Web-App
              <br /> dalam <span className="text-sky-600">48 jam</span>.
            </h1>

            <p className="max-w-xl mt-4 text-slate-600">
              Satu file jadi aplikasi web rapi: form, validasi, filter, role user,
              dan ekspor balik ke Excel. Jual putus — tanpa biaya langganan.
            </p>

            {/* Hook strip: harga, jual putus, tanpa chat */}
            <div className="flex flex-wrap gap-2 mt-5">
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700">
                Mulai sekitar Rp 990.000 · jual putus
              </span>
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-sky-50 text-sky-700">
                Tanpa subscription bulanan
              </span>
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                Order lewat form · minim chat bolak-balik
              </span>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="https://forms.gle/B6TyZERjNVNfEi7o9"
                className="inline-flex items-center rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-sky-700"
              >
                Kirim Excel via Google Form
              </a>

              <Link
                href="/finance"
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Lihat Contoh
              </Link>
            </div>

            <p className="mt-3 text-sm text-slate-600">
              Sudah melakukan pembayaran?{" "}
              <a
                href="/excel2web/konfirmasi"
                className="font-semibold text-sky-700 hover:text-sky-800 underline-offset-2 hover:underline"
              >
                Konfirmasi pembayaran di sini
              </a>
              .
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Data Anda aman — contoh dihapus 7 hari setelah serah terima.
            </p>
          </div>

          {/* Right demo panel */}
          <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-medium text-slate-500">
                excel-web-app.local
              </div>
              <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-50">
                Filter
              </button>
            </div>

            <div className="mb-3">
              <input
                placeholder="Cari data…"
                className="w-full px-3 py-2 text-sm border rounded-lg border-slate-300 bg-slate-100"
              />
            </div>

            <div className="overflow-hidden border rounded-xl border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-3 py-2 text-left">ID</th>
                    <th className="px-3 py-2 text-left">Nama</th>
                    <th className="px-3 py-2 text-left">Kategori</th>
                    <th className="px-3 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { id: "001", nama: "Contoh A", kat: "Sales", st: "Aktif" },
                    { id: "002", nama: "Contoh B", kat: "Ops", st: "Pending" },
                    { id: "003", nama: "Contoh C", kat: "Finance", st: "Aktif" },
                  ].map((r) => (
                    <tr key={r.id}>
                      <td className="px-3 py-2">{r.id}</td>
                      <td className="px-3 py-2">{r.nama}</td>
                      <td className="px-3 py-2">{r.kat}</td>
                      <td className="px-3 py-2">{r.st}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-50">
                Export CSV
              </button>
              <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-50">
                Export XLSX
              </button>
              <span className="ml-auto text-[11px] text-slate-400">
                Demo UI statis untuk ilustrasi (bukan data asli).
              </span>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="grid grid-cols-1 gap-4 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Hemat 6 jam/minggu"
            desc="Hapus double-entry & salah ketik."
          />
          <FeatureCard
            title="Aman & Terkendali"
            desc="Role, jejak perubahan, ekspor terukur."
          />
          <FeatureCard
            title="Siap Integrasi"
            desc="Opsional: API/GeoJSON untuk QGIS / dashboard."
          />
        </section>

        {/* HOW IT WORKS */}
        <section className="p-5 bg-white border mt-14 rounded-2xl border-slate-200 md:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Cara kerja 48 jam</h2>
          <ol className="pl-6 mt-4 space-y-2 list-decimal text-slate-700">
            <li>
              <b>Kirim file Excel</b> + deskripsi singkat lewat Google Form.
            </li>
            <li>
              <b>Desain skema & role</b> (field, validasi, akses).
            </li>
            <li>
              <b>Build & review link</b> staging. Anda cek, kami rapikan.
            </li>
            <li>
              <b>Serah terima</b> + export balik ke Excel. Opsional: integrasi API.
            </li>
          </ol>
        </section>

        {/* FAQ (tetap seperti versi kamu) */}
        <section className="mt-14">
          <h2 className="text-lg font-semibold text-slate-900">FAQ ringkas</h2>

          {[
            {
              q: "Benarkah 48 jam?",
              a: "Untuk skenario standar (≤ 10 form/field kompleksitas sedang, 1 role admin + 1 role editor). Jika butuh workflow/rule kompleks, kami estimasi ulang tanpa biaya tersembunyi.",
            },
            {
              q: "Berapa biaya?",
              a: "Harga demo mulai ekonomis; jual putus. Add-on seperti auth SSO, custom domain, atau API dihitung terpisah sesuai kebutuhan.",
            },
            {
              q: "Bisa multi-user & role?",
              a: "Bisa. Viewer/Editor/Admin, akses per menu atau per kolom. Jejak perubahan (audit) opsional.",
            },
            {
              q: "Data aman?",
              a: "Ya. Proyek demo dibersihkan ≤ 7 hari pasca serah terima. Untuk produksi kami sediakan DB dedicated, enkripsi at-rest & in-transit.",
            },
            {
              q: "Export balik ke Excel?",
              a: "Bisa, CSV dan XLSX. Import dari Excel berkala juga bisa (scheduler).",
            },
            {
              q: "Bisa integrasi QGIS/dashboard?",
              a: "Bisa via API/GeoJSON. Cocok untuk peta, laporan BI, atau pipeline ETL.",
            },
            {
              q: "Batas ukuran file/record?",
              a: "Praktis hingga ~200k baris per tabel untuk use-case operasional ringan. Di atas itu kami sarankan arsitektur paginasi dan indexing khusus.",
            },
            {
              q: "Login & otentikasi?",
              a: "Email+password, magic link, atau SSO (Google/Microsoft). Password disimpan hashed, tidak plaintext.",
            },
            {
              q: "Hosting di mana?",
              a: "Staging kami di Vercel + DB managed. Produksi bisa di akun Anda (Vercel/AWS/GCP) atau di kami.",
            },
            {
              q: "Custom domain & SSL?",
              a: "Bisa. Kami bantu set A/CNAME, verifikasi, dan otomatis pakai SSL.",
            },
            {
              q: "Dukungan PWA/mobile?",
              a: "UI responsif. PWA (installable/offline-first) opsional jika dibutuhkan.",
            },
            {
              q: "Garansi & support?",
              a: "Bugfix 14 hari untuk ruang lingkup awal. Paket maintenance bulanan opsional tersedia.",
            },
            {
              q: "Apa yang perlu saya siapkan?",
              a: "File Excel contoh + deskripsi kolom, aturan validasi, dan peran user. Sisanya kami bantu rancang.",
            },
            {
              q: "Multi-sheet & relasi antar sheet?",
              a: "Bisa. Kami mapping ke tabel terpisah dengan relasi (lookup/foreign key).",
            },
            {
              q: "Multibahasa?",
              a: "Bisa. Default ID, opsional EN/JP dengan toggle bahasa.",
            },
          ].map((f, i) => (
            <details
              key={i}
              className="p-4 mt-3 bg-white border rounded-xl border-slate-200"
            >
              <summary className="text-sm font-medium cursor-pointer select-none text-slate-900">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-slate-600">{f.a}</p>
            </details>
          ))}
        </section>

        {/* FOOTER */}
        <footer className="py-6 mt-16 text-sm text-center border-t border-slate-200 text-slate-500">
          © {new Date().getFullYear()} Allanray TechSight — Excel → Web-App 48 jam.
        </footer>
      </div>
    </main>
  );
}

/* small components */
function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-5 bg-white border shadow-sm rounded-2xl border-slate-200">
      <div className="w-3 h-3 mb-2 rounded-full bg-sky-200" />
      <div className="font-medium text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </div>
  );
}
