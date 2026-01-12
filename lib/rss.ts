import { Article } from '@/types';
import { siteConfig, getBaseUrl } from '@/config/site';

interface RSSConfig {
    title: string;
    description: string;
    siteUrl: string;
    language: string;
    email: string;
}

const config: RSSConfig = {
    title: siteConfig.name,
    description: siteConfig.description,
    siteUrl: getBaseUrl(),
    language: 'en-us',
    email: siteConfig.email,
};

function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export function generateRSS(articles: Article[]): string {
    const latestArticles = articles
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        .slice(0, 50);

    const rssItems = latestArticles
        .map((article) => {
            const articleUrl = `${config.siteUrl}/blog/${article.slug}`;
            const pubDate = new Date(article.publishDate).toUTCString();
            const authorEmail = article.author.email || config.email;
            const authorName = escapeXml(article.author.name);

            return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description>${escapeXml(article.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(authorEmail)} (${authorName})</author>
      <category>${escapeXml(article.category.name)}</category>
      ${article.tags ? article.tags.map(tag => `<category>${escapeXml(tag.name)}</category>`).join('\n      ') : ''}
      ${article.featuredImage ? `<enclosure url="${article.featuredImage}" type="image/jpeg" />` : ''}
    </item>`;
        })
        .join('\n');

    const lastBuildDate = latestArticles.length > 0
        ? new Date(latestArticles[0].publishDate).toUTCString()
        : new Date().toUTCString();

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(config.title)}</title>
    <description>${escapeXml(config.description)}</description>
    <link>${config.siteUrl}</link>
    <language>${config.language}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${config.siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;
}