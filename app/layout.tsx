// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getPillars } from "@/lib/api/strapi";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RegulateThis - Insights for Wealth Management Professionals",
  description: "Educational content for RIA owners, compliance teams, and financial advisors.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ Fetch pillars once at the layout level
  const pillars = await getPillars();

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased font-sans">
        <Header pillars={pillars} /> 
        <main className="min-h-screen">
          {children}
        </main>
        <Footer pillars={pillars} />
      </body>
    </html>
  );
}