import { Article, Author, Category, Subcategory, Tag, SEOMetadata, NewsletterSubscription } from '@/types';

// ============================================
// STRAPI V5 TYPES & INTERFACES
// ============================================

interface StrapiMedia {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string | null;
    caption?: string | null;
    url: string;
    formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
    };
}

interface StrapiSEO {
    id: number;
    metaTitle?: string | null;
    metaDescription?: string | null;
    keywords?: string | null;
    canonicalURL?: string | null;
    noIndex?: boolean | null;
    ogImage?: StrapiMedia | null;
}

interface StrapiCategoryDetail {
    id: number;
    detail: string;
}

interface StrapiArticle {
    id: number;
    documentId: string;
    title: string;
    subtitle?: string | null;
    slug: string;
    excerpt: string;
    content: string;
    publishDate: string;
    readTime: number;
    isFeatured?: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string | null;
    featuredImage?: StrapiMedia | null;
    author?: StrapiAuthor | null;
    category?: StrapiCategory | null;
    subcategories?: StrapiSubcategory[];
    tags?: StrapiTag[];
    seo?: StrapiSEO | null;
}

interface StrapiAuthor {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    title: string;
    bio: string;
    email?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string | null;
    photo?: StrapiMedia | null;
}

interface StrapiCategory {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    subtitle: string;
    description: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string | null;
    details?: StrapiCategoryDetail[];
}

interface StrapiSubcategory {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string | null;
    category?: StrapiCategory | null;
}

interface StrapiTag {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string | null;
}

interface StrapiSubscriber {
    id: number;
    documentId: string;
    email: string;
    subscriptionStatus: 'subscribed' | 'unsubscribed';
    source?: string | null;
    subscribedAt: string;
    unsubscribeAt?: string | null;
    unsubscribeReason?: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string | null;
}

interface StrapiResponse<T> {
    data: T;
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

// ============================================
// CONFIGURATION
// ============================================

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

function getStrapiURL(path: string = ''): string {
    return `${STRAPI_URL}${path}`;
}

function getMediaURL(media: StrapiMedia | null | undefined): string {
    if (!media) return '/images/placeholder.jpg';

    const url = media.url;

    if (url.startsWith('http')) {
        return url;
    }

    return getStrapiURL(url);
}

// ============================================
// FETCH UTILITY
// ============================================

async function fetchAPI<T>(
    path: string,
    options: RequestInit = {},
    retries: number = 3
): Promise<T> {
    const url = getStrapiURL(`/api${path}`);

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
        ...options.headers,
    };

    const config: RequestInit = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Strapi API error (${response.status}): ${errorText}`
            );
        }

        const data = await response.json();
        return data as T;
    } catch (error) {
        if (retries > 0) {
            console.warn(`Retrying API call to ${path}... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return fetchAPI<T>(path, options, retries - 1);
        }

        console.error(`Failed to fetch from Strapi: ${path}`, error);
        throw error;
    }
}

// ============================================
// TRANSFORM FUNCTIONS
// ============================================

function transformSEO(seo?: StrapiSEO | null): SEOMetadata | undefined {
    if (!seo) return undefined;

    return {
        metaTitle: seo.metaTitle || undefined,
        metaDescription: seo.metaDescription || undefined,
        keywords: seo.keywords || undefined,
        canonicalURL: seo.canonicalURL || undefined,
        noIndex: seo.noIndex || undefined,
        ogImage: seo.ogImage ? getMediaURL(seo.ogImage) : undefined,
    };
}

function transformTag(strapiTag: StrapiTag): Tag {
    return {
        id: strapiTag.id.toString(),
        name: strapiTag.name,
        slug: strapiTag.slug,
    };
}

function transformSubcategory(strapiSubcategory: StrapiSubcategory): Subcategory {
    return {
        id: strapiSubcategory.id.toString(),
        name: strapiSubcategory.name,
        slug: strapiSubcategory.slug,
        description: strapiSubcategory.description || undefined,
        categoryId: strapiSubcategory.category?.id.toString() || '',
    };
}

function transformCategory(strapiCategory: StrapiCategory): Category {
    return {
        id: strapiCategory.id.toString(),
        name: strapiCategory.name,
        slug: strapiCategory.slug,
        subtitle: strapiCategory.subtitle,
        description: strapiCategory.description,
        details: strapiCategory.details?.map(d => d.detail) || [],
        order: strapiCategory.order,
    };
}

function transformAuthor(strapiAuthor: StrapiAuthor): Author {
    return {
        id: strapiAuthor.id.toString(),
        name: strapiAuthor.name,
        slug: strapiAuthor.slug,
        title: strapiAuthor.title,
        bio: strapiAuthor.bio,
        photo: getMediaURL(strapiAuthor.photo),
        linkedin: strapiAuthor.linkedin || undefined,
        twitter: strapiAuthor.twitter || undefined,
        email: strapiAuthor.email || undefined,
    };
}

function transformArticle(strapiArticle: StrapiArticle): Article | null {
    const author = strapiArticle.author;
    const category = strapiArticle.category;
    const subcategories = strapiArticle.subcategories || [];
    const tags = strapiArticle.tags || [];

    if (!author) {
        console.warn(`Article ${strapiArticle.id} (${strapiArticle.title}) missing required relation: author - skipping`);
        return null;
    }

    if (!category) {
        console.warn(`Article ${strapiArticle.id} (${strapiArticle.title}) missing required relation: category - skipping`);
        return null;
    }

    return {
        id: strapiArticle.id.toString(),
        title: strapiArticle.title,
        subtitle: strapiArticle.subtitle || undefined,
        slug: strapiArticle.slug,
        content: strapiArticle.content,
        excerpt: strapiArticle.excerpt,
        category: transformCategory(category),
        subcategories: subcategories.map(transformSubcategory),
        tags: tags.length > 0 ? tags.map(transformTag) : undefined,
        author: transformAuthor(author),
        featuredImage: getMediaURL(strapiArticle.featuredImage),
        publishDate: strapiArticle.publishDate,
        readTime: strapiArticle.readTime,
        isFeatured: strapiArticle.isFeatured || false,
        seo: transformSEO(strapiArticle.seo),
    };
}

// ============================================
// API FUNCTIONS - ARTICLES
// ============================================

export async function fetchArticles(options: {
    limit?: number;
    page?: number;
    featured?: boolean;
    categorySlug?: string;
    subcategorySlug?: string;
    tagSlug?: string;
    authorId?: string;
} = {}): Promise<Article[]> {
    const { limit = 100, page = 1, featured, categorySlug, subcategorySlug, tagSlug, authorId } = options;

    const params = new URLSearchParams({
        'pagination[page]': page.toString(),
        'pagination[pageSize]': limit.toString(),
        'sort[0]': 'publishDate:desc',
        'populate[0]': 'author',
        'populate[1]': 'author.photo',
        'populate[2]': 'category',
        'populate[3]': 'category.details',
        'populate[4]': 'subcategories',
        'populate[5]': 'subcategories.category',
        'populate[6]': 'tags',
        'populate[7]': 'featuredImage',
        'populate[8]': 'seo',
        'populate[9]': 'seo.ogImage',
    });

    if (featured !== undefined) {
        params.append('filters[isFeatured][$eq]', featured.toString());
    }
    if (categorySlug) {
        params.append('filters[category][slug][$eq]', categorySlug);
    }
    if (subcategorySlug) {
        params.append('filters[subcategories][slug][$eq]', subcategorySlug);
    }
    if (tagSlug) {
        params.append('filters[tags][slug][$eq]', tagSlug);
    }
    if (authorId) {
        params.append('filters[author][id][$eq]', authorId);
    }

    params.append('filters[publishedAt][$notNull]', 'true');

    const response = await fetchAPI<StrapiResponse<StrapiArticle[]>>(
        `/articles?${params.toString()}`
    );

    return response.data
        .map(transformArticle)
        .filter((article): article is Article => article !== null);
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
    const params = new URLSearchParams({
        'filters[slug][$eq]': slug,
        'populate[0]': 'author',
        'populate[1]': 'author.photo',
        'populate[2]': 'category',
        'populate[3]': 'category.details',
        'populate[4]': 'subcategories',
        'populate[5]': 'subcategories.category',
        'populate[6]': 'tags',
        'populate[7]': 'featuredImage',
        'populate[8]': 'seo',
        'populate[9]': 'seo.ogImage',
    });

    try {
        const response = await fetchAPI<StrapiResponse<StrapiArticle[]>>(
            `/articles?${params.toString()}`
        );

        if (!response.data || response.data.length === 0) {
            return null;
        }

        return transformArticle(response.data[0]);
    } catch (error) {
        console.error(`Error fetching article by slug: ${slug}`, error);
        return null;
    }
}

export async function fetchFeaturedArticle(): Promise<Article | null> {
    const articles = await fetchArticles({ featured: true, limit: 1 });
    return articles.length > 0 ? articles[0] : null;
}

export async function fetchRecentArticles(limit: number = 9): Promise<Article[]> {
    return fetchArticles({ limit });
}

export async function fetchArticlesByCategory(categorySlug: string): Promise<Article[]> {
    return fetchArticles({ categorySlug });
}

export async function fetchArticlesBySubcategory(subcategorySlug: string): Promise<Article[]> {
    return fetchArticles({ subcategorySlug });
}

export async function fetchArticlesByTag(tagSlug: string): Promise<Article[]> {
    return fetchArticles({ tagSlug });
}

// ============================================
// API FUNCTIONS - AUTHORS
// ============================================

export async function fetchAuthors(): Promise<Author[]> {
    const params = new URLSearchParams({
        'populate[0]': 'photo',
        'filters[isActive][$eq]': 'true',
        'sort[0]': 'name:asc',
    });

    const response = await fetchAPI<StrapiResponse<StrapiAuthor[]>>(
        `/authors?${params.toString()}`
    );

    return response.data.map(transformAuthor);
}

export async function fetchAuthorById(id: string): Promise<Author | null> {
    const params = new URLSearchParams({
        'populate[0]': 'photo',
    });

    try {
        const response = await fetchAPI<StrapiResponse<StrapiAuthor>>(
            `/authors/${id}?${params.toString()}`
        );

        return transformAuthor(response.data);
    } catch (error) {
        console.error(`Error fetching author by id: ${id}`, error);
        return null;
    }
}

export async function fetchAuthorBySlug(slug: string): Promise<Author | null> {
    const params = new URLSearchParams({
        'filters[slug][$eq]': slug,
        'populate[0]': 'photo',
    });

    try {
        const response = await fetchAPI<StrapiResponse<StrapiAuthor[]>>(
            `/authors?${params.toString()}`
        );

        if (!response.data || response.data.length === 0) {
            return null;
        }

        return transformAuthor(response.data[0]);
    } catch (error) {
        console.error(`Error fetching author by slug: ${slug}`, error);
        return null;
    }
}

// ============================================
// API FUNCTIONS - CATEGORIES
// ============================================

export async function fetchCategories(): Promise<Category[]> {
    const params = new URLSearchParams({
        'populate[0]': 'details',
        'sort[0]': 'order:asc',
    });

    const response = await fetchAPI<StrapiResponse<StrapiCategory[]>>(
        `/categories?${params.toString()}`
    );

    return response.data.map(transformCategory);
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
    const params = new URLSearchParams({
        'filters[slug][$eq]': slug,
        'populate[0]': 'details',
    });

    try {
        const response = await fetchAPI<StrapiResponse<StrapiCategory[]>>(
            `/categories?${params.toString()}`
        );

        if (!response.data || response.data.length === 0) {
            return null;
        }

        return transformCategory(response.data[0]);
    } catch (error) {
        console.error(`Error fetching category by slug: ${slug}`, error);
        return null;
    }
}

// ============================================
// API FUNCTIONS - SUBCATEGORIES
// ============================================

export async function fetchSubcategories(): Promise<Subcategory[]> {
    const params = new URLSearchParams({
        'populate[0]': 'category',
        'sort[0]': 'name:asc',
    });

    const response = await fetchAPI<StrapiResponse<StrapiSubcategory[]>>(
        `/subcategories?${params.toString()}`
    );

    return response.data.map(transformSubcategory);
}

export async function fetchSubcategoryBySlug(slug: string): Promise<Subcategory | null> {
    const params = new URLSearchParams({
        'filters[slug][$eq]': slug,
        'populate[0]': 'category',
    });

    try {
        const response = await fetchAPI<StrapiResponse<StrapiSubcategory[]>>(
            `/subcategories?${params.toString()}`
        );

        if (!response.data || response.data.length === 0) {
            return null;
        }

        return transformSubcategory(response.data[0]);
    } catch (error) {
        console.error(`Error fetching subcategory by slug: ${slug}`, error);
        return null;
    }
}

export async function fetchSubcategoriesByCategoryId(categoryId: string): Promise<Subcategory[]> {
    const params = new URLSearchParams({
        'filters[category][id][$eq]': categoryId,
        'populate[0]': 'category',
        'sort[0]': 'name:asc',
    });

    const response = await fetchAPI<StrapiResponse<StrapiSubcategory[]>>(
        `/subcategories?${params.toString()}`
    );

    return response.data.map(transformSubcategory);
}

export async function fetchSubcategoriesByCategorySlug(categorySlug: string): Promise<Subcategory[]> {
    const params = new URLSearchParams({
        'filters[category][slug][$eq]': categorySlug,
        'populate[0]': 'category',
        'sort[0]': 'name:asc',
    });

    const response = await fetchAPI<StrapiResponse<StrapiSubcategory[]>>(
        `/subcategories?${params.toString()}`
    );

    return response.data.map(transformSubcategory);
}

// ============================================
// API FUNCTIONS - TAGS
// ============================================

export async function fetchTags(): Promise<Tag[]> {
    const params = new URLSearchParams({
        'sort[0]': 'name:asc',
    });

    const response = await fetchAPI<StrapiResponse<StrapiTag[]>>(
        `/tags?${params.toString()}`
    );

    return response.data.map(transformTag);
}

export async function fetchTagBySlug(slug: string): Promise<Tag | null> {
    const params = new URLSearchParams({
        'filters[slug][$eq]': slug,
    });

    try {
        const response = await fetchAPI<StrapiResponse<StrapiTag[]>>(
            `/tags?${params.toString()}`
        );

        if (!response.data || response.data.length === 0) {
            return null;
        }

        return transformTag(response.data[0]);
    } catch (error) {
        console.error(`Error fetching tag by slug: ${slug}`, error);
        return null;
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get featured article from each category (for homepage)
 */
export async function fetchFeaturedArticlesByCategory(): Promise<Article[]> {
    const categories = await fetchCategories();
    const featuredArticles: Article[] = [];

    for (const category of categories) {
        const articles = await fetchArticles({
            categorySlug: category.slug,
            limit: 1,
        });

        if (articles.length > 0) {
            featuredArticles.push(articles[0]);
        }
    }

    return featuredArticles;
}

/**
 * Get article count for a specific author
 */
export async function getArticleCountByAuthor(authorId: string): Promise<number> {
    const params = new URLSearchParams({
        'filters[author][id][$eq]': authorId,
        'filters[publishedAt][$notNull]': 'true',
        'pagination[pageSize]': '1',
    });

    const response = await fetchAPI<StrapiResponse<StrapiArticle[]>>(
        `/articles?${params.toString()}`
    );

    return response.meta.pagination?.total || 0;
}

/**
 * Get article count for a specific category
 */
export async function getArticleCountByCategory(categorySlug: string): Promise<number> {
    const params = new URLSearchParams({
        'filters[category][slug][$eq]': categorySlug,
        'filters[publishedAt][$notNull]': 'true',
        'pagination[pageSize]': '1',
    });

    const response = await fetchAPI<StrapiResponse<StrapiArticle[]>>(
        `/articles?${params.toString()}`
    );

    return response.meta.pagination?.total || 0;
}

// ============================================
// NEWSLETTER SUBSCRIBERS
// ============================================

/**
 * Transform Strapi subscriber to app format
 */
function transformSubscriber(strapiSubscriber: StrapiSubscriber): NewsletterSubscription {
    return {
        id: strapiSubscriber.documentId,
        email: strapiSubscriber.email,
        subscribedAt: strapiSubscriber.subscribedAt,
        subscriptionStatus: strapiSubscriber.subscriptionStatus,
        source: strapiSubscriber.source || undefined,
    };
}

/**
 * Fetch all active newsletter subscribers
 */
export async function fetchActiveSubscribers(): Promise<NewsletterSubscription[]> {
    try {
        const params = new URLSearchParams({
            'filters[subscriptionStatus][$eq]': 'subscribed',
            'pagination[pageSize]': '1000',
            'sort[0]': 'subscribedAt:desc',
        });

        const response = await fetchAPI<StrapiResponse<StrapiSubscriber[]>>(
            `/regulatethis-subscribers?${params.toString()}`
        );

        if (!response.data || !Array.isArray(response.data)) {
            console.warn('No subscribers found or invalid response format');
            return [];
        }

        return response.data.map(transformSubscriber);
    } catch (error) {
        console.error('Error fetching active subscribers:', error);
        return [];
    }
}

/**
 * Get total count of active subscribers
 */
export async function getActiveSubscriberCount(): Promise<number> {
    try {
        const params = new URLSearchParams({
            'filters[subscriptionStatus][$eq]': 'subscribed',
            'pagination[pageSize]': '1',
        });

        const response = await fetchAPI<StrapiResponse<StrapiSubscriber[]>>(
            `/regulatethis-subscribers?${params.toString()}`
        );

        return response.meta.pagination?.total || 0;
    } catch (error) {
        console.error('Error getting subscriber count:', error);
        return 0;
    }
}

// ============================================
// NEWSLETTER SUBSCRIPTION API (CLIENT-SIDE)
// ============================================

export interface SubscribeResponse {
    success: boolean;
    message: string;
    data?: NewsletterSubscription;
    error?: string;
}

export interface UnsubscribeResponse {
    success: boolean;
    message: string;
    error?: string;
}

/**
 * Subscribe to newsletter (client-side)
 */
export async function subscribeToNewsletter(
    email: string,
    source?: string
): Promise<SubscribeResponse> {
    try {
        const response = await fetch('/api/regulatethis-subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, source }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.error || 'Failed to subscribe',
                error: data.error,
            };
        }

        return {
            success: true,
            message: data.message || 'Thank you for subscribing!',
            data: data.data,
        };
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return {
            success: false,
            message: 'Failed to subscribe. Please try again later.',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Unsubscribe from newsletter (client-side)
 */
export async function unsubscribeFromNewsletter(
    email: string,
    reason?: string
): Promise<UnsubscribeResponse> {
    try {
        const response = await fetch('/api/regulatethis-subscribers/unsubscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, reason }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.error || 'Failed to unsubscribe',
                error: data.error,
            };
        }

        return {
            success: true,
            message: data.message || 'You have been successfully unsubscribed',
        };
    } catch (error) {
        console.error('Newsletter unsubscribe error:', error);
        return {
            success: false,
            message: 'Failed to unsubscribe. Please try again later.',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}
