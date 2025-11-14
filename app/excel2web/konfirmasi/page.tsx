// app/excel2web/konfirmasi/page.tsx

export default function KonfirmasiPembayaranPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-3xl px-4 py-10 mx-auto sm:py-14">
        {/* Breadcrumb kecil */}
        <p className="mb-3 text-xs font-medium tracking-wide uppercase text-slate-400">
          Excel → Web-App • Konfirmasi Pembayaran
        </p>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Konfirmasi Pembayaran – Excel → Web-App (48 jam)
          </h1>
          <p className="max-w-2xl mt-3 text-sm text-slate-600">
            Gunakan halaman ini setelah Anda melakukan pembayaran.
            Kami akan memverifikasi maksimal{" "}
            <span className="font-semibold">1×24 jam kerja</span>. Order mulai
            kami kerjakan setelah pembayaran terverifikasi.
          </p>

          <div className="inline-flex items-center px-3 py-1 mt-4 text-xs rounded-full bg-sky-50 text-sky-800">
            ℹ️{" "}
            <span className="ml-2">
              Data konfirmasi diisi lewat Google Form resmi Allanray TechSight.
            </span>
          </div>
        </header>

        {/* Card utama */}
        <section className="p-6 bg-white shadow-sm rounded-2xl ring-1 ring-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">
            Form Konfirmasi Pembayaran
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Klik tombol di bawah untuk membuka Google Form konfirmasi pembayaran
            di tab baru, lalu isi data sesuai instruksi.
          </p>

          <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="https://forms.gle/KoVn516diNKV8yww6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Buka Form Konfirmasi di Google Form
            </a>

            {/* Kembali ke landing utama (sekarang masih di /) */}
            <a
              href="/"
              className="text-xs font-medium text-slate-500 hover:text-slate-700"
            >
              ← Kembali ke halaman utama Excel → Web-App
            </a>
          </div>

          <div className="pt-5 mt-6 border-t border-slate-100">
            <p className="mb-2 text-xs font-semibold text-slate-700">
              Sebelum klik tombol di atas, siapkan:
            </p>
            <ul className="pl-4 space-y-1 text-xs list-disc text-slate-500">
              <li>Nama & email yang sama dengan Form Order.</li>
              <li>Nomor WhatsApp aktif.</li>
              <li>Informasi bank & nominal transfer.</li>
              <li>Screenshot / foto bukti pembayaran yang jelas.</li>
            </ul>
          </div>
        </section>

        {/* Footer kecil / logo perusahaan */}
        <footer className="flex items-center justify-between pt-4 mt-8 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Allanray TechSight — Excel → Web-App dalam 48 jam.
          </p>
          {/* Logo kecil bisa ditaruh di sini kalau mau */}
        </footer>
      </div>
    </main>
  );
}
