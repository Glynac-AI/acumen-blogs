import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SocialShareButtons } from '@/components/article/SocialShareButtons';
import { mockArticles } from '@/lib/mock-data';
import { categoryToSlug } from '@/lib/utils';
import { generateArticleMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface BlogPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = mockArticles.find(a => a.slug === slug);

    if (!article) {
        return {
            title: 'Article Not Found | RegulateThis',
        };
    }

    return generateArticleMetadata(article);
}

export default async function BlogArticlePage({ params }: BlogPageProps) {
    const { slug } = await params;
    const article = mockArticles.find(a => a.slug === slug);

    if (!article) {
        notFound();
    }

    // Get related articles from same category
    const relatedArticles = mockArticles
        .filter(a => a.category.id === article.category.id && a.id !== article.id)
        .slice(0, 3);

    const categorySlug = categoryToSlug(article.category);

    return (
        <>
            {/* Article Header */}
            <section className="bg-white border-b border-gray-100">
                <Container maxWidth="lg">
                    <div className="py-12 md:py-16">
                        {/* Breadcrumb */}
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                            <Link href="/" className="hover:text-[#49648C] transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href="/blog" className="hover:text-[#49648C] transition-colors">
                                Blog
                            </Link>
                            <span>/</span>
                            <Link href={`/categories/${categorySlug}`} className="hover:text-[#49648C] transition-colors">
                                {article.category.name}
                            </Link>
                        </div>

                        {/* Category Badge */}
                        <Link
                            href={`/categories/${article.category.slug}`}
                            className="inline-block px-4 py-2 bg-[#49648C] text-white text-sm font-semibold uppercase tracking-wider rounded mb-6 hover:bg-[#5A7AA0] transition-colors"
                        >
                            {article.category.name}
                        </Link>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0B1F3B] leading-tight mb-6">
                            {article.title}
                        </h1>

                        {/* Subtitle */}
                        {article.subtitle && (
                            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed mb-8">
                                {article.subtitle}
                            </p>
                        )}

                        {/* Author & Meta */}
                        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-8">
                            <Link
                                href={`/authors/${article.author.id}`}
                                className="flex items-center space-x-3 hover:text-[#49648C] transition-colors"
                            >
                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                    <Image
                                        src={article.author.photo}
                                        alt={article.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-[#0B1F3B]">{article.author.name}</p>
                                    <p className="text-xs text-gray-500">{article.author.title}</p>
                                </div>
                            </Link>
                            <span>•</span>
                            <span>{new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span>•</span>
                            <span>{article.readTime} min read</span>
                        </div>

                        {/* Subcategories */}
                        {article.subcategories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {article.subcategories.map((subcategory) => (
                                    <Link
                                        key={subcategory.id}
                                        href={`/subcategories/${subcategory.slug}`}
                                        className="px-3 py-1 text-sm text-[#49648C] border border-[#49648C] rounded hover:bg-[#49648C] hover:text-white transition-colors"
                                    >
                                        {subcategory.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Social Share */}
                        <SocialShareButtons title={article.title} slug={article.slug} />
                    </div>
                </Container>
            </section>

            {/* Featured Image */}
            <section className="bg-white">
                <Container maxWidth="lg">
                    <div className="relative w-full aspect-video bg-gray-200 overflow-hidden">
                        <Image
                            src={article.featuredImage}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </Container>
            </section>

            {/* Article Content */}
            <section className="bg-white">
                <Container maxWidth="md">
                    <article className="py-12 md:py-16 prose prose-lg max-w-none">
                        <div
                            className="text-gray-800 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </article>
                </Container>
            </section>

            {/* Author Bio */}
            <section className="bg-[#F5F2EA]">
                <Container maxWidth="lg">
                    <div className="py-12 md:py-16">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <Link href={`/authors/${article.author.id}`} className="flex-shrink-0">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                                    <Image
                                        src={article.author.photo}
                                        alt={article.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </Link>
                            <div className="flex-1">
                                <Link href={`/authors/${article.author.id}`} className="hover:text-[#49648C] transition-colors">
                                    <h3 className="text-2xl font-light text-[#0B1F3B] mb-1">
                                        {article.author.name}
                                    </h3>
                                </Link>
                                <p className="text-sm text-gray-600 mb-4">{article.author.title}</p>
                                <p className="text-gray-700 leading-relaxed mb-6">{article.author.bio}</p>
                                <div className="flex items-center space-x-4">
                                    {article.author.linkedin && (
                                        <a
                                            href={article.author.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-[#49648C] hover:text-[#0B1F3B] transition-colors"
                                        >
                                            LinkedIn →
                                        </a>
                                    )}
                                    {article.author.email && (
                                        <a
                                            href={`mailto:${article.author.email}`}
                                            className="text-sm font-medium text-[#49648C] hover:text-[#0B1F3B] transition-colors"
                                        >
                                            Email →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
                <section className="bg-white">
                    <Container>
                        <div className="py-12 md:py-16">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B]">
                                    More in {article.category.name}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedArticles.map((related) => (
                                    <Link
                                        key={related.id}
                                        href={`/blog/${related.slug}`}
                                        className="group"
                                    >
                                        <article>
                                            <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden mb-4">
                                                <Image
                                                    src={related.featuredImage}
                                                    alt={related.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <h3 className="text-lg font-medium text-[#0B1F3B] group-hover:text-[#49648C] transition-colors mb-2 line-clamp-2">
                                                {related.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {related.excerpt}
                                            </p>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            )}

            {/* Newsletter CTA */}
            <section className="bg-[#0B1F3B] text-white">
                <Container maxWidth="md">
                    <div className="py-16 md:py-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-light mb-4">
                            Get More Insights Like This
                        </h2>
                        <p className="text-lg text-gray-300 mb-8">
                            Sharp analysis delivered when we have something worth saying.
                        </p>
                        <Link
                            href="/newsletter"
                            className="inline-block px-8 py-3 bg-[#49648C] text-white font-medium rounded hover:bg-[#5A7AA0] transition-colors"
                        >
                            Subscribe to Newsletter
                        </Link>
                    </div>
                </Container>
            </section>
        </>
    );
}