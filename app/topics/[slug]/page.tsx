import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/article/ArticleCard';
import { mockArticles } from '@/lib/mock-data';
import { getPillarBySlug } from '@/config/pillars';
import { notFound } from 'next/navigation';

interface PillarPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PillarPage({ params }: PillarPageProps) {
    const { slug } = await params;
    const pillarConfig = getPillarBySlug(slug);

    if (!pillarConfig) {
        notFound();
    }

    // Get all articles for this pillar
    const pillarArticles = mockArticles
        .filter(article => article.pillar === pillarConfig.name)
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    // Featured article (most recent)
    const featuredArticle = pillarArticles[0];
    const otherArticles = pillarArticles.slice(1);

    // Get unique tags from this pillar
    const tagsSet = new Set<string>();
    pillarArticles.forEach(article => {
        article.tags.forEach(tag => tagsSet.add(tag.name));
    });
    const pillarTags = Array.from(tagsSet).slice(0, 8);

    return (
        <>
            {/* Hero Section */}
            <section className="bg-[#0B1F3B] text-white">
                <Container>
                    <div className="py-20 md:py-28">
                        {/* Breadcrumb */}
                        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href="/blog" className="hover:text-white transition-colors">
                                Topics
                            </Link>
                            <span>/</span>
                            <span className="text-white">{pillarConfig.name}</span>
                        </div>

                        <div className="max-w-4xl">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                    {pillarConfig.name}
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-8">
                                {pillarConfig.subtitle}
                            </h1>

                            <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
                                {pillarConfig.description}
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* What We Cover in This Topic */}
            <section className="bg-white">
                <Container>
                    <div className="py-16 md:py-20">
                        <div className="max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B] mb-8">
                                What We Cover
                            </h2>
                            <div className="space-y-4">
                                {pillarConfig.details.map((detail, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-4 text-gray-700"
                                    >
                                        <span className="text-[#49648C] text-xl mt-1">→</span>
                                        <p className="text-lg leading-relaxed">{detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Featured Article */}
            {featuredArticle && (
                <section className="bg-[#F5F2EA]">
                    <Container>
                        <div className="py-16 md:py-20">
                            <div className="flex items-center space-x-3 mb-12">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B]">
                                    Featured Article
                                </h2>
                            </div>

                            <Link href={`/blog/${featuredArticle.slug}`} className="group">
                                <div className="bg-white border border-gray-200 hover:border-[#49648C] transition-all duration-300 overflow-hidden">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                        {/* Image */}
                                        <div className="relative w-full h-64 lg:h-full bg-gray-100">
                                            <Image
                                                src={featuredArticle.featuredImage}
                                                alt={featuredArticle.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 md:p-12 flex flex-col justify-center">
                                            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                                                <span>{featuredArticle.author.name}</span>
                                                <span>•</span>
                                                <span>{featuredArticle.readTime} min read</span>
                                            </div>

                                            <h3 className="text-3xl md:text-4xl font-light text-[#0B1F3B] leading-tight mb-4 group-hover:text-[#49648C] transition-colors">
                                                {featuredArticle.title}
                                            </h3>

                                            {featuredArticle.subtitle && (
                                                <p className="text-lg text-gray-600 font-light mb-6">
                                                    {featuredArticle.subtitle}
                                                </p>
                                            )}

                                            <p className="text-base text-gray-600 leading-relaxed mb-6">
                                                {featuredArticle.excerpt}
                                            </p>

                                            <div className="flex items-center space-x-2 text-sm font-medium text-[#49648C] group-hover:text-[#0B1F3B] transition-colors">
                                                <span>Read Article</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Container>
                </section>
            )}

            {/* All Articles */}
            <section className="bg-white">
                <Container>
                    <div className="py-16 md:py-20">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center space-x-3">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B]">
                                    All Articles
                                </h2>
                            </div>
                            <span className="text-sm text-gray-500">
                                {pillarArticles.length} {pillarArticles.length === 1 ? 'Article' : 'Articles'}
                            </span>
                        </div>

                        {otherArticles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {otherArticles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">More articles coming soon.</p>
                            </div>
                        )}
                    </div>
                </Container>
            </section>

            {/* Popular Topics */}
            {pillarTags.length > 0 && (
                <section className="bg-[#F5F2EA]">
                    <Container>
                        <div className="py-16 md:py-20">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B]">
                                    Popular Topics
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {pillarTags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 text-sm font-medium text-[#0B1F3B] bg-white border border-gray-200"
                                        style={{ borderRadius: '2px' }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            )}

            {/* Newsletter CTA */}
            <section className="bg-white border-t border-gray-200">
                <Container>
                    <div className="py-16 md:py-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B] mb-6">
                            Get {pillarConfig.name} insights delivered to your inbox
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Sharp analysis on {pillarConfig.name.toLowerCase()} when we have something worth saying
                        </p>
                        <Link
                            href="/#newsletter"
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#0B1F3B] text-white hover:bg-[#49648C] transition-colors text-sm font-medium tracking-wide uppercase"
                            style={{ borderRadius: '2px' }}
                        >
                            <span>Subscribe</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </Container>
            </section>
        </>
    );
}