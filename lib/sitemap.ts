import { Article, Author, Tag, Category, Subcategory } from '@/types';
import { getBaseUrl } from '@/config/site';

const SITE_URL = getBaseUrl();

interface SitemapURL {
    loc: string;
    lastmod?: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
}

function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
}

export function generateSitemap(
    articles: Article[],
    authors: Author[],
    categories: Category[],
    subcategories: Subcategory[],
    tags: Tag[]
): string {
    const urls: SitemapURL[] = [];

    // Static pages
    urls.push({
        loc: `${SITE_URL}/`,
        lastmod: formatDate(new Date().toISOString()),
        changefreq: 'daily',
        priority: 1.0,
    });

    urls.push({
        loc: `${SITE_URL}/about`,
        changefreq: 'monthly',
        priority: 0.8,
    });

    urls.push({
        loc: `${SITE_URL}/blog`,
        lastmod: articles.length > 0 ? formatDate(articles[0].publishDate) : undefined,
        changefreq: 'daily',
        priority: 0.9,
    });

    urls.push({
        loc: `${SITE_URL}/authors`,
        changefreq: 'weekly',
        priority: 0.7,
    });

    // Article pages
    const sortedArticles = [...articles].sort(
        (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );

    sortedArticles.forEach((article) => {
        urls.push({
            loc: `${SITE_URL}/blog/${escapeXml(article.slug)}`,
            lastmod: formatDate(article.publishDate),
            changefreq: 'monthly',
            priority: 0.8,
        });
    });

    // Author pages
    authors.forEach((author) => {
        urls.push({
            loc: `${SITE_URL}/authors/${escapeXml(author.id)}`,
            changefreq: 'monthly',
            priority: 0.6,
        });
    });

    // Category pages
    categories.forEach((category) => {
        urls.push({
            loc: `${SITE_URL}/categories/${escapeXml(category.slug)}`,
            changefreq: 'weekly',
            priority: 0.8,
        });
    });

    // Subcategory pages
    subcategories.forEach((subcategory) => {
        urls.push({
            loc: `${SITE_URL}/subcategories/${escapeXml(subcategory.slug)}`,
            changefreq: 'weekly',
            priority: 0.7,
        });
    });

    // Tag pages
    tags.forEach((tag) => {
        urls.push({
            loc: `${SITE_URL}/tags/${escapeXml(tag.slug)}`,
            changefreq: 'weekly',
            priority: 0.5,
        });
    });

    // Generate XML
    const urlsXml = urls
        .map((url) => {
            let urlXml = `  <url>
    <loc>${url.loc}</loc>`;

            if (url.lastmod) {
                urlXml += `
    <lastmod>${url.lastmod}</lastmod>`;
            }

            if (url.changefreq) {
                urlXml += `
    <changefreq>${url.changefreq}</changefreq>`;
            }

            if (url.priority !== undefined) {
                urlXml += `
    <priority>${url.priority.toFixed(1)}</priority>`;
            }

            urlXml += `
  </url>`;

            return urlXml;
        })
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}