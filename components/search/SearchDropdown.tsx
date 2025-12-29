'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearch, SearchResult } from '@/hooks/usesearch';
import { Article, Author, Tag } from '@/types';
import { PillarConfig } from '@/config/pillars';

export const SearchDropdown: React.FC = () => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const results = useSearch(query);

    // Group results by type
    const groupedResults = {
        articles: results.filter(r => r.type === 'article').slice(0, 5),
        authors: results.filter(r => r.type === 'author').slice(0, 3),
        tags: results.filter(r => r.type === 'tag').slice(0, 3),
        pillars: results.filter(r => r.type === 'pillar').slice(0, 3),
    };

    const totalResults = results.length;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
            inputRef.current?.blur();
        } else if (e.key === 'Enter' && query.trim()) {
            // Navigate to full search results page
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setIsOpen(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setIsOpen(e.target.value.trim().length >= 2);
    };

    const closeDropdown = () => {
        setIsOpen(false);
        setQuery('');
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-md">
            {/* Search Input */}
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
                    placeholder="Search articles, authors, tags..."
                    className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49648C] focus:border-transparent"
                />
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            {/* Dropdown Results */}
            {isOpen && query.trim().length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-[80vh] overflow-y-auto z-50">
                    {totalResults === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                            <p className="text-sm">No results found for "{query}"</p>
                            <p className="text-xs mt-1">Try different keywords</p>
                        </div>
                    ) : (
                        <>
                            {/* Articles */}
                            {groupedResults.articles.length > 0 && (
                                <div className="border-b border-gray-100">
                                    <div className="px-4 py-2 bg-gray-50">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Articles ({groupedResults.articles.length})
                                        </p>
                                    </div>
                                    <div className="py-2">
                                        {groupedResults.articles.map((result, index) => {
                                            const article = result.item as Article;
                                            return (
                                                <Link
                                                    key={index}
                                                    href={`/blog/${article.slug}`}
                                                    onClick={closeDropdown}
                                                    className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                                                >
                                                    <p className="text-sm font-medium text-[#0B1F3B] line-clamp-1">
                                                        {article.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                                        {article.excerpt}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs text-[#49648C]">{article.pillar}</span>
                                                        <span className="text-xs text-gray-400">•</span>
                                                        <span className="text-xs text-gray-500">{article.author.name}</span>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Authors */}
                            {groupedResults.authors.length > 0 && (
                                <div className="border-b border-gray-100">
                                    <div className="px-4 py-2 bg-gray-50">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Authors ({groupedResults.authors.length})
                                        </p>
                                    </div>
                                    <div className="py-2">
                                        {groupedResults.authors.map((result, index) => {
                                            const author = result.item as Author;
                                            return (
                                                <Link
                                                    key={index}
                                                    href={`/authors/${author.id}`}
                                                    onClick={closeDropdown}
                                                    className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                                                >
                                                    <p className="text-sm font-medium text-[#0B1F3B]">
                                                        {author.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {author.title}
                                                    </p>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            {groupedResults.tags.length > 0 && (
                                <div className="border-b border-gray-100">
                                    <div className="px-4 py-2 bg-gray-50">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Tags ({groupedResults.tags.length})
                                        </p>
                                    </div>
                                    <div className="py-2">
                                        <div className="px-4 py-2 flex flex-wrap gap-2">
                                            {groupedResults.tags.map((result, index) => {
                                                const tag = result.item as Tag;
                                                return (
                                                    <Link
                                                        key={index}
                                                        href={`/tags/${tag.slug}`}
                                                        onClick={closeDropdown}
                                                        className="px-3 py-1 text-xs font-medium text-[#0B1F3B] bg-gray-100 hover:bg-[#49648C] hover:text-white transition-colors rounded-sm"
                                                    >
                                                        {tag.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Pillars */}
                            {groupedResults.pillars.length > 0 && (
                                <div>
                                    <div className="px-4 py-2 bg-gray-50">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Topics ({groupedResults.pillars.length})
                                        </p>
                                    </div>
                                    <div className="py-2">
                                        {groupedResults.pillars.map((result, index) => {
                                            const pillar = result.item as PillarConfig;
                                            return (
                                                <Link
                                                    key={index}
                                                    href={`/topics/${pillar.slug}`}
                                                    onClick={closeDropdown}
                                                    className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                                                >
                                                    <p className="text-sm font-medium text-[#0B1F3B]">
                                                        {pillar.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {pillar.subtitle}
                                                    </p>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* View All Results Link */}
                            {totalResults > 10 && (
                                <div className="border-t border-gray-200 p-3 bg-gray-50">
                                    <Link
                                        href={`/search?q=${encodeURIComponent(query)}`}
                                        onClick={closeDropdown}
                                        className="block text-center text-sm font-medium text-[#49648C] hover:text-[#0B1F3B] transition-colors"
                                    >
                                        View all {totalResults} results →
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};