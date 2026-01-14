'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import type { Category } from '@/types';

interface BrowseTopicsSectionProps {
    categories: (Category & { articleCount: number })[];
}

export const BrowseTopicsSection: React.FC<BrowseTopicsSectionProps> = ({ categories }) => {

    // Icons for each category (mapped by slug)
    const categoryIcons: Record<string, React.ReactNode> = {
        'practice-management': ( // Practice Management
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        'wealth-management-software': ( // Wealth Management Software
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        'compliance-regulation': ( // Compliance & Regulation
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
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
                                Explore Content
                            </span>
                            <div className="h-px w-12 bg-[#49648C]"></div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B] mb-4">
                            Browse by Topic
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Dive into specialized content areas tailored for wealth management professionals
                        </p>
                    </div>

                    {/* Category Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                className="group relative"
                            >
                                <article className="relative h-full bg-gradient-to-br from-[#F5F2EA] to-white border-2 border-gray-200 rounded-sm overflow-hidden hover:border-[#49648C] transition-all duration-300 hover:shadow-xl">
                                    {/* Top Accent Line */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#49648C] to-[#0B1F3B] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                                    <div className="p-8 md:p-10">
                                        {/* Icon */}
                                        <div className="mb-6 text-[#49648C] group-hover:text-[#0B1F3B] transition-colors">
                                            {categoryIcons[category.slug] || categoryIcons['practice-management']}
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-light text-[#0B1F3B] group-hover:text-[#49648C] transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm font-medium text-[#49648C] uppercase tracking-wider">
                                                {category.subtitle}
                                            </p>
                                            <p className="text-gray-700 leading-relaxed">
                                                {category.description.split('.')[0]}.
                                            </p>

                                            {/* Stats */}
                                            <div className="pt-4 flex items-center justify-between border-t border-gray-200">
                                                <span className="text-sm text-gray-600">
                                                    <span className="font-semibold text-[#0B1F3B]">{category.articleCount}</span> Articles
                                                </span>
                                                <svg
                                                    className="w-5 h-5 text-[#49648C] group-hover:translate-x-1 transition-transform"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Effect Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#49648C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </article>
                            </Link>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-16 text-center">
                        <p className="text-gray-600 mb-6">
                            Can't find what you're looking for?
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/blog"
                                className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-[#0B1F3B] text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-white transition-colors rounded-sm text-sm font-medium uppercase tracking-wider"
                            >
                                <span>View All Articles</span>
                            </Link>
                            <Link
                                href="/search"
                                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#49648C] text-white hover:bg-[#0B1F3B] transition-colors rounded-sm text-sm font-medium uppercase tracking-wider"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span>Search Content</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};