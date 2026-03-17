import { NextResponse } from 'next/server';
import { generateRSS } from '@/lib/rss';
import { fetchArticles, fetchAuthorBySlug } from '@/lib/api';
import { getBaseUrl } from '@/config/site';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug: rawSlug } = await params;

        // Remove .xml extension if present
        const slug = rawSlug.replace(/\.xml$/, '');

        // Fetch the author to get their name and ID
        const author = await fetchAuthorBySlug(slug);

        if (!author) {
            return new NextResponse('Author not found', { status: 404 });
        }

        // Fetch articles for this author
        const articles = await fetchArticles({ authorId: author.id });

        const baseUrl = getBaseUrl();
        const rss = generateRSS(articles, {
            title: `Articles by ${author.name} - RegulateThis`,
            description: author.bio,
            feedUrl: `${baseUrl}/feed/authors/${slug}.xml`,
        });

        return new NextResponse(rss, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('Error generating author RSS feed:', error);
        return new NextResponse('Error generating RSS feed', { status: 500 });
    }
}
