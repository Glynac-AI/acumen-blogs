import { Article, Author, Tag, Pillar } from '@/types';

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Helper to convert relative URLs to absolute
function getFullImageUrl(url: string | null | undefined): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${STRAPI_URL}${url}`;
}

// Helper to extract data from Strapi response
function extractData(item: any): any {
    if (!item) return null;
    return item.data !== undefined ? item.data : item;
}

// Base fetch with retry and better error handling
async function fetchFromStrapi(endpoint: string, retries = 3): Promise<any> {
    const url = `${STRAPI_URL}${endpoint}`;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`🔍 [Attempt ${attempt}/${retries}] Fetching: ${url}`);

            const res = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                next: {
                    revalidate: 60,
                    tags: ['strapi-content']
                },
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error(`❌ API Error (${res.status}):`, errorText);

                if (res.status >= 400 && res.status < 500) {
                    throw new Error(`Strapi API error: ${res.status} - ${errorText}`);
                }

                if (attempt === retries) {
                    throw new Error(`Strapi API error after ${retries} attempts: ${res.status}`);
                }

                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
                continue;
            }

            const data = await res.json();
            console.log(`✅ Success: Received ${data.data?.length || 1} item(s)`);
            return data;

        } catch (error) {
            if (attempt === retries) {
                console.error('❌ All fetch attempts failed:', error);
                throw error;
            }

            console.warn(`⚠️ Attempt ${attempt} failed, retrying...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}

// Transform Strapi pillar to our Pillar type
function transformPillar(strapiPillar: any): Pillar {
    try {
        if (!strapiPillar) {
            throw new Error('Pillar data is null or undefined');
        }

        const data = extractData(strapiPillar);
        const attrs = data.attributes || data;

        return {
            id: (data.id || data.documentId || strapiPillar.id).toString(),
            name: attrs.name || 'Untitled Pillar',
            slug: attrs.slug || '',
            subtitle: attrs.subtitle || '',
            description: attrs.description || '',
            details: Array.isArray(attrs.details)
                ? attrs.details.map((d: any) => d.detail || d).filter(Boolean)
                : [],
            order: attrs.order || 0,
        };
    } catch (error) {
        console.error('Error transforming pillar:', error, strapiPillar);
        throw new Error(`Failed to transform pillar: ${error}`);
    }
}

// Transform Strapi article to our Article type
function transformArticle(strapiArticle: any): Article {
    try {
        if (!strapiArticle) {
            throw new Error('Article data is null or undefined');
        }

        const attrs = strapiArticle.attributes || strapiArticle;

        // Extract pillar
        const pillarData = extractData(attrs.pillar);
        if (!pillarData) {
            throw new Error(`Article "${attrs.title}" is missing pillar data`);
        }
        const pillar = transformPillar(pillarData);

        // Extract tags
        const tagsData = extractData(attrs.tags);
        const tags = (Array.isArray(tagsData) ? tagsData : [])
            .filter(Boolean)
            .map((tag: any) => {
                const tagAttrs = tag.attributes || tag;
                return {
                    id: (tag.id || tag.documentId).toString(),
                    name: tagAttrs.name || 'Unnamed Tag',
                    slug: tagAttrs.slug || '',
                };
            });

        // Extract author
        const authorData = extractData(attrs.author);
        const authorAttrs = authorData?.attributes || authorData || {};
        const authorPhotoData = extractData(authorAttrs.photo);
        const authorPhotoAttrs = authorPhotoData?.attributes || authorPhotoData;

        // Extract featured image
        const featuredImageData = extractData(attrs.featuredImage);
        const featuredImageAttrs = featuredImageData?.attributes || featuredImageData;

        // Extract SEO
        const seoData = attrs.seo;
        const seoOgImageData = extractData(seoData?.ogImage);
        const seoOgImageAttrs = seoOgImageData?.attributes || seoOgImageData;

        return {
            id: (strapiArticle.id || strapiArticle.documentId).toString(),
            title: attrs.title || 'Untitled Article',
            subtitle: attrs.subtitle || undefined,
            slug: attrs.slug || '',
            content: attrs.content || '',
            excerpt: attrs.excerpt || '',
            pillar,
            tags,
            author: {
                id: (authorData?.id || authorData?.documentId || 'unknown').toString(),
                name: authorAttrs.name || 'Unknown Author',
                title: authorAttrs.title || '',
                bio: authorAttrs.bio || '',
                photo: getFullImageUrl(authorPhotoAttrs?.url),
                linkedin: authorAttrs.linkedin,
                twitter: authorAttrs.twitter,
                email: authorAttrs.email,
            },
            featuredImage: getFullImageUrl(featuredImageAttrs?.url),
            publishDate: attrs.publishDate || new Date().toISOString(),
            readTime: attrs.readTime || 5,
            isFeatured: attrs.isFeatured || false,
            seo: seoData ? {
                metaTitle: seoData.metaTitle,
                metaDescription: seoData.metaDescription,
                keywords: seoData.keywords,
                ogImage: getFullImageUrl(seoOgImageAttrs?.url),
                canonicalURL: seoData.canonicalURL,
                noIndex: seoData.noIndex || false,
            } : undefined,
        };
    } catch (error) {
        console.error('Error transforming article:', error, strapiArticle);
        throw new Error(`Failed to transform article: ${error}`);
    }
}

// Fetch all pillars
export async function getPillars(): Promise<Pillar[]> {
    try {
        const data = await fetchFromStrapi('/api/pillars?sort=order:asc&populate=*');
        if (!data.data || !Array.isArray(data.data)) {
            console.warn('No pillars found in response');
            return [];
        }
        return data.data.map(transformPillar);
    } catch (error) {
        console.error('❌ Error fetching pillars:', error);
        throw new Error('Unable to load content pillars. Please check your connection.');
    }
}

// Fetch all articles
export async function getArticles(): Promise<Article[]> {
    try {
        const data = await fetchFromStrapi('/api/articles?populate=*');
        if (!data.data || !Array.isArray(data.data)) {
            console.warn('No articles found in response');
            return [];
        }
        return data.data.map(transformArticle);
    } catch (error) {
        console.error('❌ Error fetching articles:', error);
        throw new Error('Unable to load articles. Please try again later.');
    }
}

// Fetch single article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        const data = await fetchFromStrapi(
            `/api/articles?filters[slug][$eq]=${slug}&populate=*`
        );

        if (!data.data || data.data.length === 0) {
            console.warn(`Article with slug "${slug}" not found`);
            return null;
        }

        return transformArticle(data.data[0]);
    } catch (error) {
        console.error(`❌ Error fetching article "${slug}":`, error);
        return null;
    }
}

// Fetch articles by pillar slug
export async function getArticlesByPillar(pillarSlug: string): Promise<Article[]> {
    try {
        const data = await fetchFromStrapi(
            `/api/articles?filters[pillar][slug][$eq]=${pillarSlug}&populate=*`
        );

        if (!data.data || !Array.isArray(data.data)) {
            console.warn(`No articles found for pillar "${pillarSlug}"`);
            return [];
        }

        return data.data.map(transformArticle);
    } catch (error) {
        console.error(`❌ Error fetching articles for pillar "${pillarSlug}":`, error);
        return [];
    }
}