'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/article/ArticleCard';
import { useSearch } from '@/hooks/usesearch';
import { Article, Author, Tag, Category, Subcategory } from '@/types';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const results = useSearch(query);

    // Group results by type
    const articles = results.filter(r => r.type === 'article');
    const authors = results.filter(r => r.type === 'author');
    const tags = results.filter(r => r.type === 'tag');
    const categories = results.filter(r => r.type === 'category');
    const subcategories = results.filter(r => r.type === 'subcategory');

    if (!query) {
        return (
            <section className="bg-white min-h-[60vh] flex items-center">
                <Container>
                    <div className="text-center py-20">
                        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h2 className="text-2xl font-light text-[#0B1F3B] mb-2">
                            Start Searching
                        </h2>
                        <p className="text-gray-600">
                            Enter a search term to find articles, authors, categories, and topics
                        </p>
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <>
            {/* Search Header */}
            <section className="bg-white border-b border-gray-100">
                <Container>
                    <div className="py-12 md:py-16">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="h-px w-12 bg-[#49648C]"></div>
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                Search Results
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#0B1F3B] mb-4">
                            Results for "{query}"
                        </h1>
                        <p className="text-lg text-gray-600">
                            Found {results.length} {results.length === 1 ? 'result' : 'results'}
                        </p>
                    </div>
                </Container>
            </section>

            {results.length === 0 ? (
                <section className="bg-white">
                    <Container>
                        <div className="py-16 text-center">
                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h2 className="text-2xl font-light text-[#0B1F3B] mb-2">
                                No results found
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Try different keywords or browse our topics
                            </p>
                            <Link
                                href="/blog"
                                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#0B1F3B] text-white hover:bg-[#49648C] transition-colors text-sm font-medium tracking-wide uppercase"
                                style={{ borderRadius: '2px' }}
                            >
                                <span>Browse All Articles</span>
                            </Link>
                        </div>
                    </Container>
                </section>
            ) : (
                <>
                    {/* Articles */}
                    {articles.length > 0 && (
                        <section className="bg-white">
                            <Container>
                                <div className="py-16 md:py-20">
                                    <div className="flex items-center space-x-3 mb-8">
                                        <div className="h-px w-12 bg-[#49648C]"></div>
                                        <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B]">
                                            Articles ({articles.length})
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {articles.map((result, index) => (
                                            <ArticleCard key={index} article={result.item as Article} />
                                        ))}
                                    </div>
                                </div>
                            </Container>
                        </section>
                    )}

                    {/* Authors */}
                    {authors.length > 0 && (
                        <section className="bg-[#F5F2EA]">
                            <Container>
                                <div className="py-16 md:py-20">
                                    <div className="flex items-center space-x-3 mb-8">
                                        <div className="h-px w-12 bg-[#49648C]"></div>
                                        <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B]">
                                            Authors ({authors.length})
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {authors.map((result, index) => {
                                            const author = result.item as Author;
                                            return (
                                                <Link
                                                    key={index}
                                                    href={`/authors/${author.slug}`}
                                                    className="group"
                                                >
                                                    <div className="bg-white border border-gray-200 hover:border-[#49648C] transition-all duration-300 p-8">
                                                        <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-[#49648C]">
                                                            <Image
                                                                src={author.photo}
                                                                alt={author.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div className="text-center">
                                                            <h3 className="text-xl font-medium text-[#0B1F3B] group-hover:text-[#49648C] transition-colors mb-2">
                                                                {author.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 mb-4">
                                                                {author.title}
                                                            </p>
                                                            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                                                                {author.bio}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Container>
                        </section>
                    )}

                    {/* Categories */}
                    {categories.length > 0 && (
                        <section className="bg-white">
                            <Container>
                                <div className="py-16 md:py-20">
                                    <div className="flex items-center space-x-3 mb-8">
                                        <div className="h-px w-12 bg-[#49648C]"></div>
                                        <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B]">
                                            Categories ({categories.length})
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {categories.map((result, index) => {
                                            const category = result.item as Category;
                                            return (
                                                <Link
                                                    key={index}
                                                    href={`/categories/${category.slug}`}
                                                    className="group"
                                                >
                                                    <div className="bg-white border border-gray-200 hover:border-[#49648C] transition-all duration-300 p-8">
                                                        <h3 className="text-xl font-medium text-[#0B1F3B] group-hover:text-[#49648C] transition-colors mb-2">
                                                            {category.name}
                                                        </h3>
                                                        <p className="text-sm text-[#49648C] font-medium mb-4">
                                                            {category.subtitle}
                                                        </p>
                                                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                                                            {category.description}
                                                        </p>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Container>
                        </section>
                    )}

                    {/* Subcategories */}
                    {subcategories.length > 0 && (
                        <section className="bg-[#F5F2EA]">
                            <Container>
                                <div className="py-16 md:py-20">
                                    <div className="flex items-center space-x-3 mb-8">
                                        <div className="h-px w-12 bg-[#49648C]"></div>
                                        <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B]">
                                            Topics ({subcategories.length})
                                        </h2>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {subcategories.map((result, index) => {
                                            const subcategory = result.item as Subcategory;
                                            return (
                                                <Link
                                                    key={index}
                                                    href={`/subcategories/${subcategory.slug}`}
                                                    className="px-4 py-2 text-sm font-medium text-[#0B1F3B] bg-white border border-gray-200 hover:border-[#49648C] hover:text-[#49648C] transition-colors"
                                                    style={{ borderRadius: '2px' }}
                                                >
                                                    {subcategory.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Container>
                        </section>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <section className="bg-white">
                            <Container>
                                <div className="py-16 md:py-20">
                                    <div className="flex items-center space-x-3 mb-8">
                                        <div className="h-px w-12 bg-[#49648C]"></div>
                                        <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B]">
                                            Tags ({tags.length})
                                        </h2>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {tags.map((result, index) => {
                                            const tag = result.item as Tag;
                                            return (
                                                <Link
                                                    key={index}
                                                    href={`/tags/${tag.slug}`}
                                                    className="px-4 py-2 text-sm font-medium text-[#0B1F3B] border border-gray-200 hover:border-[#49648C] hover:text-[#49648C] transition-colors"
                                                    style={{ borderRadius: '2px' }}
                                                >
                                                    {tag.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Container>
                        </section>
                    )}
                </>
            )}
        </>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500">Loading search results...</p>
                </div>
            </div>
        }>
            <SearchResults />
        </Suspense>
    );
}