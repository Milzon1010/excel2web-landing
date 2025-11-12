// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Ganti ke domain final saat live
  metadataBase: new URL("https://allanraytechsight.co.id"),
  title: {
    default: "Excel → Web-App | Allanray TechSight",
    template: "%s | Allanray TechSight",
  },
  description:
    "Ubah file Excel jadi aplikasi web rapi dalam 48 jam — form, filter, validasi, izin user, export.",
  keywords: [
    "Excel to Web App",
    "Excel ke Web",
    "Web-App 48 Jam",
    "Allanray TechSight",
    "Automasi Excel",
  ],
  openGraph: {
    title: "Excel → Web-App | Allanray TechSight",
    description: "Ubah Excel jadi aplikasi web rapi dalam 48 jam.",
    url: "/",
    siteName: "Allanray TechSight",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Excel → Web-App dalam 48 jam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel → Web-App | Allanray TechSight",
    description: "Ubah Excel jadi aplikasi web rapi dalam 48 jam.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased bg-[#F6F8FB] text-slate-900">
        {children}
      </body>
    </html>
  );
}
