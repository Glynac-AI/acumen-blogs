'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { mockArticles } from '@/lib/mock-data';

export const HeroSection: React.FC = () => {
    // Get featured articles
    const featuredArticles = mockArticles
        .filter(article => article.isFeatured)
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    // Main featured article (largest)
    const mainFeatured = featuredArticles[0] || mockArticles[0];

    // Side articles - Get more articles if not enough featured ones
    let sideArticles = featuredArticles.slice(1);

    if (sideArticles.length < 5) {
        const recentArticles = mockArticles
            .filter(article => !article.isFeatured && article.id !== mainFeatured.id)
            .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

        sideArticles = [...sideArticles, ...recentArticles].slice(0, 5);
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <section className="relative bg-[#0B1F3B] text-white overflow-hidden">
            <Container>
                <div className="py-12 md:py-16">
                
                    {/* Featured Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* MAIN FEATURED ARTICLE - Left Side (7 columns) */}
                        <div className="lg:col-span-7">
                            <article className="group relative h-full">
                                <Link href={`/blog/${mainFeatured.slug}`} className="block h-full">
                                    {/* Image Container */}
                                    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm mb-6">
                                        <Image
                                            src={mainFeatured.featuredImage}
                                            alt={mainFeatured.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            priority
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                        {/* Category Badge on Image */}
                                        <div className="absolute top-4 left-4">
                                            <span className="inline-block px-3 py-1 bg-[#49648C] text-white text-xs font-semibold uppercase tracking-wider">
                                                {mainFeatured.category.name}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-3">
                                        <h3 className="text-3xl md:text-4xl font-light leading-tight group-hover:text-[#49648C] transition-colors">
                                            {mainFeatured.title}
                                        </h3>

                                        {mainFeatured.subtitle && (
                                            <p className="text-lg text-gray-300 font-light leading-relaxed">
                                                {mainFeatured.subtitle}
                                            </p>
                                        )}

                                        <p className="text-gray-400 leading-relaxed line-clamp-2">
                                            {mainFeatured.excerpt}
                                        </p>

                                        {/* Meta */}
                                        <div className="flex items-center space-x-4 text-sm text-gray-400 pt-2">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#49648C]">
                                                <Image
                                                    src={mainFeatured.author.photo}
                                                    alt={mainFeatured.author.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <span className="font-medium text-white">{mainFeatured.author.name}</span>
                                            <span>•</span>
                                            <span>{formatDate(mainFeatured.publishDate)}</span>
                                            <span>•</span>
                                            <span>{mainFeatured.readTime} min read</span>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        </div>

                        {/* SIDE ARTICLES - Right Side (5 columns) */}
                        <div className="lg:col-span-5 space-y-6">
                            {sideArticles.map((article) => (
                                <article
                                    key={article.id}
                                    className="group pb-6 border-b border-gray-700 last:border-0 last:pb-0"
                                >
                                    <Link href={`/blog/${article.slug}`} className="block">
                                        <div className="flex gap-4">
                                            {/* Thumbnail */}
                                            <div className="relative w-40 h-24 flex-shrink-0 overflow-hidden rounded-sm">
                                                <Image
                                                    src={article.featuredImage}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 space-y-2">
                                                {/* Category */}
                                                <span className="text-xs font-medium text-[#49648C] uppercase tracking-wider">
                                                    {article.category.name}
                                                </span>

                                                {/* Title */}
                                                <h4 className="text-base font-medium leading-snug group-hover:text-[#49648C] transition-colors line-clamp-2">
                                                    {article.title}
                                                </h4>

                                                {/* Meta */}
                                                <div className="flex items-center space-x-2 text-xs text-gray-400">
                                                    <span>{formatDate(article.publishDate)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}

                            {/* View All Link */}
                            <div className="pt-4">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center space-x-2 text-sm font-medium text-[#49648C] hover:text-white transition-colors"
                                >
                                    <span>View All Articles</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                    </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};