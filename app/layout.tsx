import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchProvider } from "@/contexts/SearchContext";
import { getBaseUrl } from "@/config/site";
import { fetchCategories, fetchSubcategories, fetchArticles, fetchAuthors, fetchTags } from "@/lib/api";
import "./globals.css";

const GTM_ID = "GTM-T299PG45";

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
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body className="antialiased font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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