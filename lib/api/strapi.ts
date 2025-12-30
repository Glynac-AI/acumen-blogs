import { Article, Author, Tag, Pillar } from '@/types';

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Base fetch function with error handling
async function fetchFromStrapi(endpoint: string) {
    try {
        const res = await fetch(`${STRAPI_URL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // For testing - no caching
        });

        if (!res.ok) {
            throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Transform Strapi pillar to our Pillar type
function transformPillar(strapiPillar: any): Pillar {
    const attrs = strapiPillar.attributes;
    return {
        id: strapiPillar.id.toString(),
        name: attrs.name,
        slug: attrs.slug,
        subtitle: attrs.subtitle,
        description: attrs.description,
        details: attrs.details?.map((d: any) => d.detail) || [],
        color: attrs.color,
        order: attrs.order,
    };
}

// Transform Strapi article to our Article type
function transformArticle(strapiArticle: any): Article {
    const attrs = strapiArticle.attributes;

    return {
        id: strapiArticle.id.toString(),
        title: attrs.title,
        subtitle: attrs.subtitle || undefined,
        slug: attrs.slug,
        content: attrs.content,
        excerpt: attrs.excerpt,
        pillar: transformPillar(attrs.pillar.data),
        tags: attrs.tags?.data?.map((tag: any) => ({
            id: tag.id.toString(),
            name: tag.attributes.name,
            slug: tag.attributes.slug,
        })) || [],
        author: {
            id: attrs.author.data.id.toString(),
            name: attrs.author.data.attributes.name,
            title: attrs.author.data.attributes.title,
            bio: attrs.author.data.attributes.bio,
            photo: attrs.author.data.attributes.photo?.data?.attributes?.url || '',
            linkedin: attrs.author.data.attributes.linkedin,
            twitter: attrs.author.data.attributes.twitter,
            email: attrs.author.data.attributes.email,
        },
        featuredImage: attrs.featuredImage?.data?.attributes?.url || '',
        publishDate: attrs.publishDate,
        readTime: attrs.readTime,
        isFeatured: attrs.isFeatured || false,
        seo: attrs.seo ? {
            metaTitle: attrs.seo.metaTitle,
            metaDescription: attrs.seo.metaDescription,
            keywords: attrs.seo.keywords,
            ogImage: attrs.seo.ogImage?.data?.attributes?.url,
            canonicalURL: attrs.seo.canonicalURL,
            noIndex: attrs.seo.noIndex,
        } : undefined,
    };
}

// Fetch all pillars
export async function getPillars(): Promise<Pillar[]> {
    const data = await fetchFromStrapi('/api/pillars?sort=order:asc&populate=details');
    return data.data.map(transformPillar);
}

// Fetch all articles with all relations
export async function getArticles(): Promise<Article[]> {
    const data = await fetchFromStrapi(
        '/api/articles?populate[pillar][populate]=details&populate[author][populate]=photo&populate[tags]=*&populate[featuredImage]=*&populate[seo][populate]=ogImage'
    );
    return data.data.map(transformArticle);
}

// Fetch single article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const data = await fetchFromStrapi(
        `/api/articles?filters[slug][$eq]=${slug}&populate[pillar][populate]=details&populate[author][populate]=photo&populate[tags]=*&populate[featuredImage]=*&populate[seo][populate]=ogImage`
    );

    if (data.data.length === 0) return null;
    return transformArticle(data.data[0]);
}

// Fetch articles by pillar slug
export async function getArticlesByPillar(pillarSlug: string): Promise<Article[]> {
    const data = await fetchFromStrapi(
        `/api/articles?filters[pillar][slug][$eq]=${pillarSlug}&populate[pillar][populate]=details&populate[author][populate]=photo&populate[tags]=*&populate[featuredImage]=*`
    );
    return data.data.map(transformArticle);
}