{/* HERO */}
<section className="px-4 sm:px-6 md:px-10 pt-16 pb-8">
  <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
    <div>
      <p className="text-sm font-medium text-sky-600 mb-2">Allanray TechSight</p>
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900">
        Ubah <span className="text-sky-600">Excel</span> ? <span className="text-slate-800">Web-App</span> dalam <span className="text-sky-600">48 jam</span>.
      </h1>
      <p className="mt-4 text-slate-600">
        Satu file jadi aplikasi web rapi: form, validasi, filter, role user, dan ekspor balik ke Excel.
        Jual putus — tanpa biaya langganan.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href="https://forms.gle/YSiFmLfwuPGaMuKB7" target="_blank" rel="noreferrer"
           className="inline-flex items-center justify-center rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 shadow-sm">
          Kirim Excel via Google Form
        </a>
        <a href="LINK_DEMO" target="_blank" rel="noreferrer"
           className="inline-flex items-center justify-center rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-3">
          Lihat Contoh
        </a>
      </div>
      <p className="mt-2 text-xs text-slate-500">Data Anda aman — contoh dihapus 7 hari setelah serah terima.</p>
    </div>

    {/* MOCKUP MINI-UI */}
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
      <div className="text-xs text-slate-500 mb-2">excel-web-app.local</div>
      <div className="flex gap-2 mb-3">
        <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Cari data..." />
        <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">Filter</button>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr><th className="p-3 text-left">ID</th><th className="p-3 text-left">Nama</th><th className="p-3 text-left">Kategori</th><th className="p-3 text-left">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-3">001</td><td className="p-3">Contoh A</td><td className="p-3">Sales</td><td className="p-3">Aktif</td></tr>
            <tr><td className="p-3">002</td><td className="p-3">Contoh B</td><td className="p-3">Ops</td><td className="p-3">Pending</td></tr>
            <tr><td className="p-3">003</td><td className="p-3">Contoh C</td><td className="p-3">Finance</td><td className="p-3">Aktif</td></tr>
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex gap-2">
        <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">Export CSV</button>
        <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">Export XLSX</button>
      </div>
      <p className="mt-2 text-[11px] text-slate-400">Demo UI statis untuk ilustrasi (bukan data asli).</p>
    </div>
  </div>
</section>

{/* PAIN ? HASIL */}
<section className="px-4 sm:px-6 md:px-10 py-8">
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
    {[
      {t:'Hemat 6 jam/minggu', d:'Hapus double-entry & salah ketik.'},
      {t:'Aman & Terkendali', d:'Role Viewer/Admin, jejak perubahan, ekspor terukur.'},
      {t:'Siap Integrasi', d:'Opsional: API/GeoJSON untuk QGIS / dashboard.'},
    ].map((i,idx)=>(
      <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="w-9 h-9 rounded-xl bg-sky-100 mb-3" />
        <h3 className="font-semibold text-slate-800">{i.t}</h3>
        <p className="text-sm text-slate-600 mt-1">{i.d}</p>
      </div>
    ))}
  </div>
</section>

{/* TIMELINE 48 JAM */}
<section className="px-4 sm:px-6 md:px-10 py-6">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-xl font-bold text-slate-900 mb-3">Cara kerja 48 jam</h2>
    <ol className="space-y-3">
      <li className="flex gap-3"><span className="h-7 w-7 rounded-full bg-sky-600 text-white grid place-content-center text-sm">1</span><p><b>Kirim file Excel</b> + deskripsi singkat lewat Google Form.</p></li>
      <li className="flex gap-3"><span className="h-7 w-7 rounded-full bg-sky-600 text-white grid place-content-center text-sm">2</span><p><b>Desain skema & role</b> (field, validasi, akses).</p></li>
      <li className="flex gap-3"><span className="h-7 w-7 rounded-full bg-sky-600 text-white grid place-content-center text-sm">3</span><p><b>Build & review</b> link staging. Anda cek, kami rapikan.</p></li>
      <li className="flex gap-3"><span className="h-7 w-7 rounded-full bg-sky-600 text-white grid place-content-center text-sm">4</span><p><b>Serah terima</b>: web-app + user admin + dokumentasi singkat.</p></li>
    </ol>
  </div>
</section>

{/* INPUT VS OUTPUT */}
<section className="px-4 sm:px-6 md:px-10 py-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="font-semibold text-slate-900">Yang Anda kirim</h3>
      <ul className="mt-2 text-slate-600 text-sm list-disc pl-5 space-y-1">
        <li>File Excel utama (sheet & contoh baris).</li>
        <li>Aturan validasi & role user (Viewer/Editor/Admin).</li>
        <li>Daftar kolom yang wajib tampil/di-filter.</li>
      </ul>
    </div>
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="font-semibold text-slate-900">Yang Anda terima</h3>
      <ul className="mt-2 text-slate-600 text-sm list-disc pl-5 space-y-1">
        <li>Web-app siap pakai (login, form, filter, ekspor).</li>
        <li>Role & izin user, audit singkat, dokumentasi PDF.</li>
        <li>File backup & opsi ekspor ulang ke Excel.</li>
      </ul>
    </div>
  </div>
</section>

{/* TARGET USER */}
<section className="px-4 sm:px-6 md:px-10 py-6">
  <div className="max-w-6xl mx-auto">
    <h3 className="font-semibold text-slate-900 mb-3">Cocok untuk</h3>
    <div className="flex flex-wrap gap-2">
      {['Tim Sales','Operasional Harian','Finance ringan','UMKM & komunitas','Project internal'].map(x=>(
        <span key={x} className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm border border-slate-200">{x}</span>
      ))}
    </div>
  </div>
</section>

{/* HARGA & CTA */}
<section className="px-4 sm:px-6 md:px-10 py-10">
  <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 text-center">
    <p className="text-sm text-slate-500">Paket dasar (= 1 file, = 5 form, 3 role)</p>
    <div className="text-4xl font-extrabold text-slate-900 my-2">Rp <span className="text-sky-600">—</span></div>
    <p className="text-sm text-slate-500">Harga promo/early-bird isi sesuai strategimu.</p>
    <div className="mt-5 flex flex-wrap justify-center gap-3">
      <a href="https://forms.gle/YSiFmLfwuPGaMuKB7" target="_blank" rel="noreferrer"
         className="inline-flex items-center justify-center rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-5 py-3">
        Order via Google Form
      </a>
      <a href="LINK_DEMO" target="_blank" rel="noreferrer"
         className="inline-flex items-center justify-center rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-3">
        Lihat Contoh
      </a>
    </div>
    <p className="mt-3 text-xs text-slate-500">Garansi rapi fungsional: kalau tidak sesuai scope disepakati, kami revisi tanpa biaya.</p>
  </div>
</section>

{/* FAQ */}
<section className="px-4 sm:px-6 md:px-10 pb-14">
  <div className="max-w-4xl mx-auto">
    <h3 className="font-semibold text-slate-900 mb-4">FAQ</h3>
    <div className="space-y-3">
      {[
        ['Apakah data saya aman?',
         'File contoh hanya untuk pengembangan. Setelah serah terima, kami hapus dalam 7 hari.'],
        ['Bisa multi-user & izin berbeda?',
         'Bisa: Viewer/Editor/Admin. Tambahan peran bisa didiskusikan.'],
        ['Bisa impor/update berkala?',
         'Bisa impor ulang dari Excel dengan template yang sama.'],
        ['Berapa lama pengerjaan?',
         'Target 48 jam kerja untuk paket dasar (1 file, 5 form). Scope lebih besar menyesuaikan.'],
        ['Bisa integrasi QGIS/GeoJSON?',
         'Bisa (opsional). Cocok untuk peta lokasi, wilayah, dsb.'],
        ['Apakah ada biaya bulanan?',
         'Tidak untuk paket jual putus. Hanya biaya hosting/domain jika ingin online.'],
      ].map((qa,i)=>(
        <details key={i} className="rounded-xl border border-slate-200 bg-white p-4">
          <summary className="font-medium cursor-pointer text-slate-800">{qa[0]}</summary>
          <p className="mt-2 text-sm text-slate-600">{qa[1]}</p>
        </details>
      ))}
    </div>
  </div>
</section>

{/* FOOTER CTA MINI */}
<section className="px-4 sm:px-6 md:px-10 pb-12">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5">
    <p className="text-slate-700">Siap ubah Excel jadi aplikasi rapi dalam 48 jam?</p>
    <a href="https://forms.gle/YSiFmLfwuPGaMuKB7" target="_blank" rel="noreferrer"
       className="inline-flex items-center justify-center rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-5 py-3">
      Kirim Excel via Google Form
    </a>
  </div>
  <p className="mt-3 text-center text-xs text-slate-500">© {new Date().getFullYear()} Allanray TechSight</p>
</section>
