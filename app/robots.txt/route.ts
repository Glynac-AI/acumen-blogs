import { NextResponse } from 'next/server';
import { getBaseUrl } from '@/config/site';

export async function GET() {
    const baseUrl = getBaseUrl();
    const robotsTxt = `# Robot Rules for RegulateThis
# Allow all search engines to index the site

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/feed.xml
`;

    return new NextResponse(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
        },
    });
}