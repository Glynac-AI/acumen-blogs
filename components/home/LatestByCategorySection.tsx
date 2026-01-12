'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { mockArticles } from '@/lib/mock-data';
import { CATEGORIES } from '@/config/categories';

export const LatestByCategorySection: React.FC = () => {
    // Get latest articles for each category (3 per category)
    const articlesByCategory = CATEGORIES.map(category => ({
        category,
        articles: mockArticles
            .filter(article => article.category.id === category.id)
            .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
            .slice(0, 3)
    })).filter(group => group.articles.length > 0);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <section className="relative bg-white overflow-hidden">
            <Container>
                <div className="py-20 md:py-28">
                    {/* Section Header */}
                    <div className="mb-12 text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="h-px w-12 bg-[#49648C]"></div>
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                Latest Content
                            </span>
                            <div className="h-px w-12 bg-[#49648C]"></div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B]">
                            Recent Articles by Category
                        </h2>
                    </div>

                    {/* Categories */}
                    <div className="space-y-16">
                        {articlesByCategory.map(({ category, articles }) => (
                            <div key={category.id}>
                                {/* Category Header */}
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                                    <div>
                                        <h3 className="text-2xl font-light text-[#0B1F3B] mb-1">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {category.subtitle}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/categories/${category.slug}`}
                                        className="inline-flex items-center space-x-2 text-sm font-medium text-[#49648C] hover:text-[#0B1F3B] transition-colors"
                                    >
                                        <span>View All</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>

                                {/* Articles Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {articles.map((article) => (
                                        <article key={article.id} className="group">
                                            <Link href={`/blog/${article.slug}`} className="block">
                                                {/* Image */}
                                                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm mb-4 bg-gray-100">
                                                    <Image
                                                        src={article.featuredImage}
                                                        alt={article.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className="space-y-2">
                                                    {/* Subcategories */}
                                                    {article.subcategories.length > 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {article.subcategories.slice(0, 2).map((sub) => (
                                                                <span
                                                                    key={sub.id}
                                                                    className="text-xs font-medium text-[#49648C] uppercase tracking-wider"
                                                                >
                                                                    {sub.name}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Title */}
                                                    <h4 className="text-lg font-medium text-[#0B1F3B] leading-snug group-hover:text-[#49648C] transition-colors line-clamp-2">
                                                        {article.title}
                                                    </h4>

                                                    {/* Excerpt */}
                                                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                                        {article.excerpt}
                                                    </p>

                                                    {/* Meta */}
                                                    <div className="flex items-center space-x-3 text-xs text-gray-500 pt-2">
                                                        <span className="font-medium text-gray-700">{article.author.name}</span>
                                                        <span>•</span>
                                                        <span>{formatDate(article.publishDate)}</span>
                                                        <span>•</span>
                                                        <span>{article.readTime} min</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};