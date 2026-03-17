import { NextResponse } from 'next/server';
import { generateRSS } from '@/lib/rss';
import { fetchArticlesBySubcategory, fetchSubcategoryBySlug } from '@/lib/api';
import { getBaseUrl } from '@/config/site';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug: rawSlug } = await params;

        // Remove .xml extension if present
        const slug = rawSlug.replace(/\.xml$/, '');

        // Fetch the subcategory to get its name
        const subcategory = await fetchSubcategoryBySlug(slug);

        if (!subcategory) {
            return new NextResponse('Subcategory not found', { status: 404 });
        }

        // Fetch articles for this subcategory
        const articles = await fetchArticlesBySubcategory(slug);

        const baseUrl = getBaseUrl();
        const rss = generateRSS(articles, {
            title: `${subcategory.name} - RegulateThis`,
            description: subcategory.description || `Articles about ${subcategory.name}`,
            feedUrl: `${baseUrl}/feed/subcategories/${slug}.xml`,
        });

        return new NextResponse(rss, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('Error generating subcategory RSS feed:', error);
        return new NextResponse('Error generating RSS feed', { status: 500 });
    }
}
