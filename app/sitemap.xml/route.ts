import { NextResponse } from 'next/server';
import { generateSitemap } from '@/lib/sitemap';
import { mockArticles, mockAuthors, mockTags } from '@/lib/mock-data';
import { PILLARS } from '@/config/pillars';

export async function GET() {
    try {
        // TODO: Replace with Strapi fetch when connected
        // const articles = await fetch('your-strapi-url/api/articles?populate=*').then(r => r.json());
        // const authors = await fetch('your-strapi-url/api/authors').then(r => r.json());
        // const tags = await fetch('your-strapi-url/api/tags').then(r => r.json());

        const articles = mockArticles;
        const authors = mockAuthors;
        const tags = mockTags;
        const pillars = PILLARS;

        const sitemap = generateSitemap(articles, authors, pillars, tags);

        return new NextResponse(sitemap, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400', // Cache for 1 hour
            },
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return new NextResponse('Error generating sitemap', { status: 500 });
    }
}