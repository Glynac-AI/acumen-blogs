import { NextResponse } from 'next/server';

export async function GET() {
    const robotsTxt = `# Robot Rules for RegulateThis
# Block all search engines from indexing (temporary)

User-agent: *
Disallow: /
`;

    return new NextResponse(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
        },
    });
}