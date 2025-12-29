import { NextResponse } from 'next/server';

const SITE_URL = 'https://regulatethis.com'; // Update with your actual domain

export async function GET() {
    const robotsTxt = `# Robot Rules for RegulateThis
# Allow all search engines to crawl the site

User-agent: *
Allow: /

# Disallow admin and API routes (if any)
Disallow: /api/
Disallow: /admin/

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl-delay (optional, be nice to smaller crawlers)
# Uncomment if needed
# Crawl-delay: 10
`;

    return new NextResponse(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate', // Cache for 24 hours
        },
    });
}