import { Container } from '@/components/ui/Container';
import { BlogContent } from '@/components/blog/BlogContent';
import { fetchCategories, fetchArticles } from '@/lib/api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog - Latest Insights | RegulateThis',
    description: 'Sharp analysis on practice management, software, and compliance. Published when we have something worth saying.',
};

export default async function BlogPage() {
    // Fetch all categories and articles from Strapi
    const categories = await fetchCategories();
    const allArticles = await fetchArticles();

    return <BlogContent categories={categories} articles={allArticles} />;
}