import { Metadata } from 'next';
import { Article, Author } from '@/types';
import { PillarConfig } from '@/config/pillars';
import { siteConfig, getBaseUrl, getFullUrl } from '@/config/site';

const SITE_NAME = siteConfig.name;
const SITE_URL = getBaseUrl();
const SITE_DESCRIPTION = siteConfig.description;
const DEFAULT_OG_IMAGE = getFullUrl(siteConfig.ogImage);

export function generateArticleMetadata(article: Article): Metadata {
    const title = article.seo?.metaTitle || `${article.title} | ${SITE_NAME}`;
    const description = article.seo?.metaDescription || article.excerpt;
    const url = article.seo?.canonicalURL || getFullUrl(`/blog/${article.slug}`);
    const ogImage = article.seo?.ogImage || article.featuredImage || DEFAULT_OG_IMAGE;
    const keywords = article.seo?.keywords || article.tags.map(t => t.name).join(', ');

    return {
        title,
        description,
        keywords,

        alternates: {
            canonical: url,
        },

        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            locale: 'en_US',
            type: 'article',
            publishedTime: article.publishDate,
            authors: [article.author.name],
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
        },

        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
            creator: article.author.twitter || '@regulatethis',
        },

        robots: {
            index: !article.seo?.noIndex,
            follow: !article.seo?.noIndex,
            googleBot: {
                index: !article.seo?.noIndex,
                follow: !article.seo?.noIndex,
            },
        },
    };
}

export function generateAuthorMetadata(author: Author, articleCount: number): Metadata {
    const title = `${author.name} | ${SITE_NAME}`;
    const description = `${author.bio} - ${articleCount} ${articleCount === 1 ? 'article' : 'articles'} published.`;
    const url = getFullUrl(`/authors/${author.id}`);

    return {
        title,
        description,

        alternates: {
            canonical: url,
        },

        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            locale: 'en_US',
            type: 'profile',
            images: [
                {
                    url: author.photo,
                    width: 400,
                    height: 400,
                    alt: author.name,
                },
            ],
        },

        twitter: {
            card: 'summary',
            title,
            description,
            images: [author.photo],
        },
    };
}

export function generatePillarMetadata(pillar: PillarConfig, articleCount: number): Metadata {
    const title = `${pillar.name}: ${pillar.subtitle} | ${SITE_NAME}`;
    const description = `${pillar.description} - ${articleCount} ${articleCount === 1 ? 'article' : 'articles'} on ${pillar.name}.`;
    const url = getFullUrl(`/topics/${pillar.slug}`);

    return {
        title,
        description,

        alternates: {
            canonical: url,
        },

        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: DEFAULT_OG_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: pillar.name,
                },
            ],
        },

        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [DEFAULT_OG_IMAGE],
        },
    };
}

export function generateDefaultMetadata(
    title: string,
    description?: string,
    path?: string
): Metadata {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const finalDescription = description || SITE_DESCRIPTION;
    const url = path ? getFullUrl(path) : SITE_URL;

    return {
        title: fullTitle,
        description: finalDescription,

        alternates: {
            canonical: url,
        },

        openGraph: {
            title: fullTitle,
            description: finalDescription,
            url,
            siteName: SITE_NAME,
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: DEFAULT_OG_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: SITE_NAME,
                },
            ],
        },

        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: finalDescription,
            images: [DEFAULT_OG_IMAGE],
        },
    };
}