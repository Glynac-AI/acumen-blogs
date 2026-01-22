import { NextResponse } from 'next/server';
import { generateRSS } from '@/lib/rss';
import { fetchArticlesByTag, fetchTagBySlug } from '@/lib/api';
import { getBaseUrl } from '@/config/site';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug: rawSlug } = await params;

        // Remove .xml extension if present
        const slug = rawSlug.replace(/\.xml$/, '');

        // Fetch the tag to get its name
        const tag = await fetchTagBySlug(slug);

        if (!tag) {
            return new NextResponse('Tag not found', { status: 404 });
        }

        // Fetch articles for this tag
        const articles = await fetchArticlesByTag(slug);

        const baseUrl = getBaseUrl();
        const rss = generateRSS(articles, {
            title: `${tag.name} Articles - RegulateThis`,
            description: `Articles tagged with ${tag.name}`,
            feedUrl: `${baseUrl}/feed/tags/${slug}.xml`,
        });

        return new NextResponse(rss, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('Error generating tag RSS feed:', error);
        return new NextResponse('Error generating RSS feed', { status: 500 });
    }
}
