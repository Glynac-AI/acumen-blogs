import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchProvider } from "@/contexts/SearchContext";
import { getBaseUrl } from "@/config/site";
import { fetchCategories, fetchSubcategories, fetchArticles, fetchAuthors, fetchTags } from "@/lib/api";
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
  metadataBase: new URL(getBaseUrl()),
  title: "RegulateThis - Insights for Wealth Management Professionals",
  description: "Educational content for RIA owners, compliance teams, and financial advisors.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "RegulateThis",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@regulatethis",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch all data from Strapi for header, footer, and search
  const [categories, subcategories, articles, authors, tags] = await Promise.all([
    fetchCategories(),
    fetchSubcategories(),
    fetchArticles(),
    fetchAuthors(),
    fetchTags(),
  ]);

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased font-sans">
        <SearchProvider
          articles={articles}
          authors={authors}
          categories={categories}
          subcategories={subcategories}
          tags={tags}
        >
          <Header categories={categories} subcategories={subcategories} />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer categories={categories} />
        </SearchProvider>
      </body>
    </html>
  );
}