'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { mockArticles } from '@/lib/mock-data';

export const MostPopularSection: React.FC = () => {
    // Get recent articles (simulating "most popular")
    const popularArticles = mockArticles
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        .slice(0, 5);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <section className="relative bg-[#F5F2EA] overflow-hidden">
            <Container>
                <div className="py-20 md:py-28">
                    <div className="max-w-4xl mx-auto">
                        {/* Section Header */}
                        <div className="mb-12">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                    Trending Now
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B] mb-3">
                                Most Read This Week
                            </h2>
                            <p className="text-gray-600">
                                The insights our community is reading right now
                            </p>
                        </div>

                        {/* Popular Articles - Clean List */}
                        <div className="space-y-0">
                            {popularArticles.map((article, index) => (
                                <article
                                    key={article.id}
                                    className="group border-b border-gray-100 last:border-0"
                                >
                                    <Link href={`/blog/${article.slug}`} className="block py-8 hover:bg-[#F5F2EA]/30 transition-colors -mx-6 px-6">
                                        <div className="flex items-center gap-8">
                                            {/* Thumbnail */}
                                            <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden bg-gray-100 hidden md:block">
                                                <Image
                                                    src={article.featuredImage}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0 space-y-3">
                                                {/* Category & Read Time */}
                                                <div className="flex items-center gap-3 text-xs">
                                                    <span className="font-medium text-[#49648C] uppercase tracking-wider">
                                                        {article.category.name}
                                                    </span>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-gray-500">{article.readTime} min read</span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-2xl font-light text-[#0B1F3B] leading-tight group-hover:text-[#49648C] transition-colors">
                                                    {article.title}
                                                </h3>

                                                {/* Subtitle or Excerpt */}
                                                {article.subtitle ? (
                                                    <p className="text-base text-gray-600 leading-relaxed line-clamp-1">
                                                        {article.subtitle}
                                                    </p>
                                                ) : (
                                                    <p className="text-base text-gray-600 leading-relaxed line-clamp-2">
                                                        {article.excerpt}
                                                    </p>
                                                )}

                                                {/* Author & Date */}
                                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                                    <span className="font-medium text-gray-700">{article.author.name}</span>
                                                    <span className="text-gray-300">|</span>
                                                    <span>{formatDate(article.publishDate)}</span>
                                                </div>
                                            </div>

                                            {/* Arrow - Visible on Hover */}
                                            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
                                                <svg
                                                    className="w-6 h-6 text-[#49648C] group-hover:translate-x-1 transition-transform"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>

                        {/* View All Link */}
                        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                            <Link
                                href="/blog"
                                className="inline-flex items-center space-x-2 text-sm font-medium text-[#0B1F3B] hover:text-[#49648C] transition-colors group"
                            >
                                <span className="tracking-wide">Explore All Articles</span>
                                <svg
                                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};