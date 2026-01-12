'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/article/ArticleCard';
import { mockArticles } from '@/lib/mock-data';
import { Category } from '@/types';
import { CATEGORIES } from '@/config/categories';

function BlogContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    const subcategoryParam = searchParams.get('subcategory');

    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

    const categories: Array<Category | 'All'> = ['All', ...CATEGORIES];

    // Filter articles
    let filteredArticles = mockArticles;

    if (selectedCategory !== 'All') {
        filteredArticles = filteredArticles.filter(
            article => article.category.id === selectedCategory.id
        );
    }

    if (subcategoryParam) {
        filteredArticles = filteredArticles.filter(article =>
            article.subcategories.some(sub => sub.slug === subcategoryParam)
        );
    }

    // Sort by date
    filteredArticles = filteredArticles.sort(
        (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );

    return (
        <>
            {/* Page Header */}
            <section className="bg-white border-b border-gray-100">
                <Container>
                    <div className="py-16 md:py-20">
                        <div className="max-w-3xl">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                    All Articles
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0B1F3B] leading-tight mb-6">
                                {subcategoryParam ? `Articles in "${subcategoryParam}"` : 'Latest Insights'}
                            </h1>
                            <p className="text-xl text-gray-600 font-light leading-relaxed">
                                Sharp analysis on practice management, software, and compliance. Published when we have something worth saying.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Filters & Articles */}
            <section className="bg-white">
                <Container>
                    <div className="py-12 md:py-16">
                        {/* Filter Tabs */}
                        <div className="flex flex-wrap gap-3 mb-12">
                            {categories.map((category) => {
                                const key = category === 'All' ? 'all' : category.id;
                                const displayName = category === 'All' ? 'All' : category.name;

                                const isSelected =
                                    (selectedCategory === 'All' && category === 'All') ||
                                    (selectedCategory !== 'All' && category !== 'All' && selectedCategory.id === category.id);

                                return (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${isSelected
                                                ? 'bg-[#0B1F3B] text-white'
                                                : 'bg-white text-[#0B1F3B] border border-gray-300 hover:border-[#49648C]'
                                            } rounded`}
                                    >
                                        {displayName}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Articles Grid */}
                        {filteredArticles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredArticles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-xl text-gray-500">
                                    No articles found in this category.
                                </p>
                            </div>
                        )}
                    </div>
                </Container>
            </section>
        </>
    );
}

export default function BlogPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogContent />
        </Suspense>
    );
}