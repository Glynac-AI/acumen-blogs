import { NextResponse } from 'next/server';
import { generateRSS } from '@/lib/rss';
import { mockArticles } from '@/lib/mock-data';

export async function GET() {
    try {
        // TODO: Replace with Strapi fetch when connected
        // const articles = await fetch('your-strapi-url/api/articles').then(r => r.json());
        const articles = mockArticles;

        const rss = generateRSS(articles);

        return new NextResponse(rss, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400', // Cache for 1 hour
            },
        });
    } catch (error) {
        console.error('Error generating RSS feed:', error);
        return new NextResponse('Error generating RSS feed', { status: 500 });
    }
}