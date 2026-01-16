import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchProvider } from "@/contexts/SearchContext";
import { getBaseUrl } from "@/config/site";
import { fetchCategories, fetchSubcategories, fetchArticles, fetchAuthors, fetchTags } from "@/lib/api";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-2W427S0D28";

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

// Safe fetch wrapper that returns empty array on failure
async function safeFetch<T>(fetchFn: () => Promise<T[]>, fallback: T[] = []): Promise<T[]> {
  try {
    return await fetchFn();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return fallback;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch all data from Strapi for header, footer, and search
  // Using safeFetch to prevent app crash if backend is unavailable
  const [categories, subcategories, articles, authors, tags] = await Promise.all([
    safeFetch(fetchCategories),
    safeFetch(fetchSubcategories),
    safeFetch(fetchArticles),
    safeFetch(fetchAuthors),
    safeFetch(fetchTags),
  ]);

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Google Tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
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