import { PillarConfig } from '@/config/pillars';

// Generate Pillar type from config
export type Pillar = PillarConfig;

export interface SEOMetadata {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    ogImage?: string;
    noIndex?: boolean;
    canonicalURL?: string;
}

export interface Author {
    id: string;
    name: string;
    title: string;
    bio: string;
    photo: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
}

export interface Article {
    id: string;
    title: string;
    subtitle?: string;
    slug: string;
    content: string;
    excerpt: string;
    pillar: Pillar;
    tags: Tag[];
    author: Author;
    featuredImage: string;
    publishDate: string;
    readTime: number;
    isFeatured?: boolean;
    seo?: SEOMetadata;
}

export interface NewsletterSubscription {
    email: string;
    subscribedAt: string;
}