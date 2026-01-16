'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/article/ArticleCard';
import { Article, Category } from '@/types';

interface RecentArticlesSectionProps {
    articles: Article[];
    categories: Category[];
}

export const RecentArticlesSection: React.FC<RecentArticlesSectionProps> = ({ articles, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

    const categoryOptions: Array<Category | 'All'> = ['All', ...categories];

    // Filter articles based on selected category
    const filteredArticles = selectedCategory === 'All'
        ? articles
        : articles.filter(article => article.category.id === selectedCategory.id);

    // Show only first 9 articles
    const displayedArticles = filteredArticles.slice(0, 9);

    return (
        <section className="relative bg-white overflow-hidden">
            <Container>
                <div className="py-20 md:py-28">
                    {/* Section Header */}
                    <div className="mb-12">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="h-px w-12 bg-[#49648C]"></div>
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                Latest Content
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-light text-[#0B1F3B] mb-8">
                            Recent Articles
                        </h2>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap gap-3">
                            {categoryOptions.map((category) => {
                                // Get unique key
                                const key = category === 'All' ? 'all' : category.id;
                                // Get display name
                                const displayName = category === 'All' ? 'All' : category.name;

                                // Check if this category is selected
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
                    </div>

                    {/* Articles Grid */}
                    {displayedArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayedArticles.map((article) => (
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

                    {/* View All Link */}
                    {filteredArticles.length > 9 && (
                        <div className="mt-12 text-center">
                            <a
                                href={selectedCategory === 'All' ? '/blog' : `/categories/${selectedCategory.slug}`}
                                className="inline-block px-8 py-3 bg-[#0B1F3B] text-white font-medium rounded hover:bg-[#49648C] transition-colors"
                            >
                                View All {selectedCategory === 'All' ? 'Articles' : `${selectedCategory.name} Articles`}
                            </a>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
};
