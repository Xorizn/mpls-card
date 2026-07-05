import type { Metadata } from "next";
import { Unbounded, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Panduan MPLS Smanichi 2026",
  description:
    "Buku Panduan kegiatan MPLS SMA Negeri 1 Bangli Tahun Ajaran 2026-2027 — Welcome soon to Ozone Smanichi.",
  openGraph: {
    title: "Panduan MPLS Smanichi 2026",
    description:
      "Buku Panduan kegiatan MPLS SMA Negeri 1 Bangli Tahun Ajaran 2026-2027.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${unbounded.variable} ${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
