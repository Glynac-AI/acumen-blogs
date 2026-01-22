import { NextResponse } from 'next/server';
import { generateRSS } from '@/lib/rss';
import { fetchArticlesByCategory, fetchCategoryBySlug } from '@/lib/api';
import { getBaseUrl } from '@/config/site';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug: rawSlug } = await params;

        // Remove .xml extension if present
        const slug = rawSlug.replace(/\.xml$/, '');

        // Fetch the category to get its name
        const category = await fetchCategoryBySlug(slug);

        if (!category) {
            return new NextResponse('Category not found', { status: 404 });
        }

        // Fetch articles for this category
        const articles = await fetchArticlesByCategory(slug);

        const baseUrl = getBaseUrl();
        const rss = generateRSS(articles, {
            title: `${category.name} - RegulateThis`,
            description: category.description,
            feedUrl: `${baseUrl}/feed/categories/${slug}.xml`,
        });

        return new NextResponse(rss, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('Error generating category RSS feed:', error);
        return new NextResponse('Error generating RSS feed', { status: 500 });
    }
}
