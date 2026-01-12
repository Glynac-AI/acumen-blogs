'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { getRecentArticles } from '@/lib/mock-data';

export const FeaturedContentSection: React.FC = () => {
    const featuredArticles = getRecentArticles(7); // Get 7 articles for asymmetric layout

    // Split articles: 1 featured + 6 regular
    const mainArticle = featuredArticles[0];
    const sideArticles = featuredArticles.slice(1);

    return (
        <section className="relative bg-[#F5F2EA] overflow-hidden">
            <Container>
                <div className="py-20 md:py-28">
                    {/* Section Header */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="h-px w-12 bg-[#49648C]"></div>
                                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                        Featured Content
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-light text-[#0B1F3B]">
                                    Worth Your Attention
                                </h2>
                            </div>

                            <Link
                                href="/blog"
                                className="hidden md:inline-flex items-center space-x-2 text-sm font-medium text-[#0B1F3B] hover:text-[#49648C] transition-colors"
                            >
                                <span>View All</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Magazine Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Featured Article - Large (spans 7 columns) */}
                        <div className="lg:col-span-7">
                            <article className="h-full group">
                                <Link href={`/blog/${mainArticle.slug}`} className="block">
                                    <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden mb-6">
                                        <Image
                                            src={mainArticle.featuredImage}
                                            alt={mainArticle.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </Link>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                        <Link
                                            href={`/categories/${mainArticle.category.slug}`}
                                            className="font-medium text-[#49648C] hover:underline"
                                        >
                                            {mainArticle.category.name}
                                        </Link>
                                        <span>•</span>
                                        <span>{mainArticle.author.name}</span>
                                        <span>•</span>
                                        <span>{mainArticle.readTime} min read</span>
                                    </div>

                                    <Link href={`/blog/${mainArticle.slug}`}>
                                        <h3 className="text-3xl md:text-4xl font-light text-[#0B1F3B] leading-tight group-hover:text-[#49648C] transition-colors">
                                            {mainArticle.title}
                                        </h3>
                                    </Link>

                                    {mainArticle.subtitle && (
                                        <p className="text-lg text-gray-600 leading-relaxed">
                                            {mainArticle.subtitle}
                                        </p>
                                    )}

                                    <p className="text-gray-700 leading-relaxed">
                                        {mainArticle.excerpt}
                                    </p>

                                    {/* Subcategories */}
                                    {mainArticle.subcategories.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {mainArticle.subcategories.slice(0, 3).map((subcategory) => (
                                                <Link
                                                    key={subcategory.id}
                                                    href={`/subcategories/${subcategory.slug}`}
                                                    className="text-xs text-[#49648C] hover:underline"
                                                >
                                                    {subcategory.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>
                        </div>

                        {/* Side Articles - Smaller (spans 5 columns) */}
                        <div className="lg:col-span-5 space-y-6">
                            {sideArticles.map((article) => (
                                <article
                                    key={article.id}
                                    className="group pb-6 border-b border-gray-300 last:border-0"
                                >
                                    <div className="flex gap-4">
                                        {/* Thumbnail */}
                                        <Link href={`/blog/${article.slug}`} className="flex-shrink-0">
                                            <div className="relative w-24 h-24 bg-gray-100 overflow-hidden">
                                                <Image
                                                    src={article.featuredImage}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        </Link>

                                        {/* Content */}
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                <Link
                                                    href={`/categories/${article.category.slug}`}
                                                    className="font-medium text-[#49648C] hover:underline"
                                                >
                                                    {article.category.name}
                                                </Link>
                                                <span>•</span>
                                                <span>{article.readTime} min</span>
                                            </div>

                                            <Link href={`/blog/${article.slug}`}>
                                                <h4 className="text-base font-medium text-[#0B1F3B] leading-snug group-hover:text-[#49648C] transition-colors line-clamp-2">
                                                    {article.title}
                                                </h4>
                                            </Link>

                                            {article.subtitle && (
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {article.subtitle}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Mobile View All Link */}
                    <div className="mt-8 text-center md:hidden">
                        <Link
                            href="/blog"
                            className="inline-flex items-center space-x-2 text-sm font-medium text-[#0B1F3B] hover:text-[#49648C] transition-colors"
                        >
                            <span>View All Articles</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
};