import { Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { BlogContent } from '@/components/blog/BlogContent';
import { fetchCategories, fetchArticles } from '@/lib/api';
import type { Metadata } from 'next';

// Revalidate data every 60 seconds
export const revalidate = 60;

export const metadata: Metadata = {
    title: 'Blog - Latest Insights | RegulateThis',
    description: 'Sharp analysis on practice management, software, and compliance. Published when we have something worth saying.',
};

function BlogLoading() {
    return (
        <section className="bg-white">
            <Container>
                <div className="py-16 md:py-20">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default async function BlogPage() {
    // Fetch all categories and articles from Strapi
    const categories = await fetchCategories();
    const allArticles = await fetchArticles();

    return (
        <Suspense fallback={<BlogLoading />}>
            <BlogContent categories={categories} articles={allArticles} />
        </Suspense>
    );
}
