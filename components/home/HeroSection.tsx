'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { mockArticles } from '@/lib/mock-data';

export const HeroSection: React.FC = () => {
    const featuredArticles = mockArticles.filter(article => article.isFeatured).slice(0, 3);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const currentArticle = featuredArticles[currentIndex] || mockArticles[0];

    useEffect(() => {
        if (!isAutoPlaying || featuredArticles.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, featuredArticles.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
        setIsAutoPlaying(false);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
        setIsAutoPlaying(false);
    };

    return (
        <section className="relative bg-[#0B1F3B] text-white overflow-hidden min-h-[85vh]">
            <Container>
                <div className="relative py-8 md:py-12 flex flex-col justify-center h-full">
                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                        {/* Left Content - 7 columns */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Category Label */}
                            <div className="flex items-center space-x-3">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                    {currentArticle.category.name}
                                </span>
                            </div>

                            {/* Headline */}
                            <Link href={`/blog/${currentArticle.slug}`} className="block group">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-4 group-hover:text-[#49648C] transition-colors duration-300">
                                    {currentArticle.title}
                                </h1>
                            </Link>

                            {/* Subtitle */}
                            {currentArticle.subtitle && (
                                <p className="text-lg md:text-xl font-light text-gray-300 leading-relaxed">
                                    {currentArticle.subtitle}
                                </p>
                            )}

                            {/* Meta Info */}
                            <div className="flex items-center space-x-6 pt-2">
                                <div className="flex items-center space-x-3">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#49648C]">
                                        <Image
                                            src={currentArticle.author.photo}
                                            alt={currentArticle.author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{currentArticle.author.name}</p>
                                        <p className="text-xs text-gray-400">{currentArticle.author.title}</p>
                                    </div>
                                </div>
                                <div className="h-8 w-px bg-gray-700"></div>
                                <span className="text-sm text-gray-400">{currentArticle.readTime} min read</span>
                            </div>

                            {/* Read Article Button */}
                            <Link
                                href={`/blog/${currentArticle.slug}`}
                                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#49648C] text-white font-medium rounded hover:bg-[#5A7AA0] transition-colors"
                            >
                                <span>Read Article</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        {/* Right Image - 5 columns */}
                        <div className="lg:col-span-5">
                            <Link href={`/blog/${currentArticle.slug}`} className="block group">
                                <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl max-h-[70vh]">
                                    <Image
                                        src={currentArticle.featuredImage}
                                        alt={currentArticle.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    {featuredArticles.length > 1 && (
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
                            {/* Left: Article Pills */}
                            <div className="flex items-center space-x-2 flex-wrap">
                                {featuredArticles.map((article, index) => (
                                    <button
                                        key={article.id}
                                        onClick={() => goToSlide(index)}
                                        className={`px-3 py-1 text-xs font-medium tracking-wide uppercase transition-all duration-300 ${index === currentIndex
                                                ? 'bg-[#49648C] text-white'
                                                : 'bg-transparent text-gray-400 hover:text-white border border-gray-700'
                                            } rounded`}
                                    >
                                        {article.category.name}
                                    </button>
                                ))}
                            </div>

                            {/* Right: Arrow Controls */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={goToPrevious}
                                    className="p-2 text-gray-400 hover:text-white border border-gray-700 hover:border-[#49648C] rounded transition-colors"
                                    aria-label="Previous article"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={goToNext}
                                    className="p-2 text-gray-400 hover:text-white border border-gray-700 hover:border-[#49648C] rounded transition-colors"
                                    aria-label="Next article"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
};