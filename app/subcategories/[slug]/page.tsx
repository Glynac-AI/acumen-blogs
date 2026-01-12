import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/article/ArticleCard';
import { mockArticles } from '@/lib/mock-data';
import { getSubcategoryBySlug } from '@/config/subcategories';
import { getCategoryById } from '@/config/categories';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface SubcategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const subcategory = getSubcategoryBySlug(slug);

    if (!subcategory) {
        return {
            title: 'Subcategory Not Found | RegulateThis',
        };
    }

    return {
        title: `${subcategory.name} | RegulateThis`,
        description: subcategory.description || `Articles about ${subcategory.name}`,
        openGraph: {
            title: `${subcategory.name} | RegulateThis`,
            description: subcategory.description || `Articles about ${subcategory.name}`,
        },
    };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
    const { slug } = await params;
    const subcategory = getSubcategoryBySlug(slug);

    if (!subcategory) {
        notFound();
    }

    // Get parent category
    const parentCategory = getCategoryById(subcategory.categoryId);

    // Get articles with this subcategory
    const subcategoryArticles = mockArticles
        .filter(article => article.subcategories.some(sub => sub.id === subcategory.id))
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    // Get related subcategories (from the same parent category)
    const relatedSubcategorySlugs = new Set<string>();
    subcategoryArticles.forEach(article => {
        article.subcategories.forEach(sub => {
            if (sub.id !== subcategory.id && sub.categoryId === subcategory.categoryId) {
                relatedSubcategorySlugs.add(sub.slug);
            }
        });
    });

    return (
        <>
            {/* Page Header */}
            <section className="bg-white border-b border-gray-100">
                <Container>
                    <div className="py-16 md:py-20">
                        {/* Breadcrumb */}
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                            <Link href="/" className="hover:text-[#49648C] transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href="/blog" className="hover:text-[#49648C] transition-colors">
                                Blog
                            </Link>
                            {parentCategory && (
                                <>
                                    <span>/</span>
                                    <Link
                                        href={`/categories/${parentCategory.slug}`}
                                        className="hover:text-[#49648C] transition-colors"
                                    >
                                        {parentCategory.name}
                                    </Link>
                                </>
                            )}
                            <span>/</span>
                            <span className="text-[#0B1F3B]">{subcategory.name}</span>
                        </div>

                        <div className="max-w-3xl">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                    {parentCategory?.name || 'Topic'}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0B1F3B] leading-tight mb-6">
                                {subcategory.name}
                            </h1>
                            {subcategory.description && (
                                <p className="text-xl text-gray-600 font-light leading-relaxed">
                                    {subcategory.description}
                                </p>
                            )}
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">
                                    {subcategoryArticles.length} {subcategoryArticles.length === 1 ? 'article' : 'articles'}
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Articles */}
            <section className="bg-white">
                <Container>
                    <div className="py-12 md:py-16">
                        {subcategoryArticles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {subcategoryArticles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-xl text-gray-500 mb-4">
                                    No articles yet in this subcategory.
                                </p>
                                {parentCategory && (
                                    <Link
                                        href={`/categories/${parentCategory.slug}`}
                                        className="text-[#49648C] hover:underline"
                                    >
                                        Browse all {parentCategory.name} articles →
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </Container>
            </section>

            {/* Related Subcategories */}
            {relatedSubcategorySlugs.size > 0 && parentCategory && (
                <section className="bg-[#F5F2EA]">
                    <Container>
                        <div className="py-12 md:py-16">
                            <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B] mb-6">
                                Related Topics in {parentCategory.name}
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {Array.from(relatedSubcategorySlugs).slice(0, 6).map((slug) => (
                                    <Link
                                        key={slug}
                                        href={`/subcategories/${slug}`}
                                        className="px-4 py-2 bg-white text-[#0B1F3B] text-sm font-medium rounded border border-gray-300 hover:border-[#49648C] hover:bg-[#49648C] hover:text-white transition-all"
                                    >
                                        {slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            )}

            {/* Newsletter CTA */}
            <section className="bg-[#0B1F3B] text-white">
                <Container>
                    <div className="py-16 md:py-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-light mb-4">
                            Stay Updated
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            Get our latest insights delivered to your inbox. No fluff, just sharp analysis.
                        </p>
                        <Link
                            href="/newsletter"
                            className="inline-block px-8 py-3 bg-[#49648C] text-white font-medium rounded hover:bg-[#5A7AA0] transition-colors"
                        >
                            Subscribe to Newsletter
                        </Link>
                    </div>
                </Container>
            </section>
        </>
    );
}