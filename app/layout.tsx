import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Excel → Web-App | Allanray TechSight',
  description:
    'Ubah file Excel jadi aplikasi web rapi dalam 48 jam — form, filter, validasi, izin user, export.',
  openGraph: {
    title: 'Excel → Web-App | Allanray TechSight',
    description: 'Ubah Excel jadi aplikasi web rapi dalam 48 jam.',
    images: ['/og.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      {/* latar soft-light: abu kebiruan lembut */}
      <body className="antialiased bg-[#F6F8FB] text-slate-900">
        {children}
      </body>
    </html>
  );
}
