// types/index.ts

export interface Category {
    id: string;
    name: string;
    slug: string;
    subtitle: string;
    description: string;
    details: string[];
    order: number;
}

export interface Subcategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    categoryId: string; 
}

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
    slug: string;
    title: string;
    bio: string;
    photo: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
}

// Keep Tag for flexible tagging (less structured than subcategories)
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
    category: Category;
    subcategories: Subcategory[];
    tags?: Tag[];
    author: Author;
    featuredImage: string;
    publishDate: string;
    readTime: number;
    isFeatured?: boolean;
    seo?: SEOMetadata;
}

export interface NewsletterSubscription {
    id?: string;
    email: string;
    subscribedAt: string;
    status?: 'active' | 'inactive' | 'unsubscribed';
    source?: string;
}