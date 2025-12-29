'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/article/ArticleCard';
import { mockArticles } from '@/lib/mock-data';
import { Pillar } from '@/types';
import { PILLARS } from '@/config/pillars';

function BlogContent() {
    const searchParams = useSearchParams();
    const pillarParam = searchParams.get('pillar');
    const tagParam = searchParams.get('tag');

    const [selectedPillar, setSelectedPillar] = useState<Pillar | 'All'>(
        (pillarParam as Pillar) || 'All'
    );

    const pillars: Array<Pillar | 'All'> = ['All', ...PILLARS.map(p => p.name as Pillar)];

    // Filter articles
    let filteredArticles = mockArticles;

    if (selectedPillar !== 'All') {
        filteredArticles = filteredArticles.filter(
            article => article.pillar === selectedPillar
        );
    }

    if (tagParam) {
        filteredArticles = filteredArticles.filter(article =>
            article.tags.some(tag => tag.slug === tagParam)
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
                                {tagParam ? `Articles tagged with "${tagParam}"` : 'Latest Insights'}
                            </h1>
                            <p className="text-xl text-gray-600 font-light leading-relaxed">
                                Sharp analysis on practice management, technology, and compliance. Published when we have something worth saying.
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
                            {pillars.map((pillar) => (
                                <button
                                    key={pillar}
                                    onClick={() => setSelectedPillar(pillar)}
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${selectedPillar === pillar
                                            ? 'bg-[#0B1F3B] text-white'
                                            : 'bg-white text-[#0B1F3B] border border-gray-200 hover:border-[#49648C] hover:text-[#49648C]'
                                        }`}
                                    style={{ borderRadius: '2px' }}
                                >
                                    {pillar}
                                </button>
                            ))}
                        </div>

                        {/* Articles Grid */}
                        {filteredArticles.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredArticles.map((article) => (
                                        <ArticleCard key={article.id} article={article} />
                                    ))}
                                </div>

                                {/* Results Count */}
                                <div className="mt-12 text-center">
                                    <p className="text-sm text-gray-500">
                                        Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
                                        {selectedPillar !== 'All' && ` in ${selectedPillar}`}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-xl text-gray-500 mb-2">No articles found</p>
                                <p className="text-sm text-gray-400">Try adjusting your filters</p>
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
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500">Loading articles...</p>
                </div>
            </div>
        }>
            <BlogContent />
        </Suspense>
    );
}