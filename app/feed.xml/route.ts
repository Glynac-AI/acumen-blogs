import { NextResponse } from 'next/server';
import { generateRSS } from '@/lib/rss';
import { fetchArticles } from '@/lib/api';

export async function GET() {
    try {
        const articles = await fetchArticles();

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
