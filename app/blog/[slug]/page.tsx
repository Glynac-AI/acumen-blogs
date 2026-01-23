import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SocialShareButtons } from '@/components/article/SocialShareButtons';
import { MarkdownContent } from '@/components/article/MarkdownContent';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { fetchArticleBySlug, fetchArticles } from '@/lib/api';
import { generateArticleMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Revalidate data every 60 seconds
export const revalidate = 60;

interface BlogPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await fetchArticleBySlug(slug);

    if (!article) {
        return {
            title: 'Article Not Found | RegulateThis',
        };
    }

    return generateArticleMetadata(article);
}

export default async function BlogArticlePage({ params }: BlogPageProps) {
    const { slug } = await params;
    const article = await fetchArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    // Get related articles from same category
    const allArticles = await fetchArticles({ categorySlug: article.category.slug });
    const relatedArticles = allArticles
        .filter(a => a.id !== article.id)
        .slice(0, 3);

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
                            <Link href={`/categories/${article.category.slug}`} className="hover:text-[#49648C] transition-colors">
                                {article.category.name}
                            </Link>
                        </div>

                        {/* Category Badge */}
                        <Link
                            href={`/categories/${article.category.slug}`}
                            className="inline-block px-4 py-1.5 bg-[#49648C] text-white text-xs font-semibold uppercase tracking-wider mb-6 hover:bg-[#5A7AA0] transition-colors"
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

                        {/* Meta Info */}
                        <div className="flex items-center justify-between border-t border-b border-gray-200 py-6">
                            <div className="flex items-center space-x-4">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#49648C]">
                                    <Image
                                        src={article.author.photo}
                                        alt={article.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#0B1F3B]">{article.author.name}</p>
                                    <p className="text-xs text-gray-500">{article.author.title}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                                <span>{new Date(article.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                <span>•</span>
                                <span>{article.readTime} min read</span>
                            </div>
                        </div>
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
                    <article className="py-16 md:py-20">
                        {/* Lead Paragraph */}
                        <div className="mb-12">
                            <p className="text-xl text-gray-800 leading-relaxed font-light">
                                {article.excerpt}
                            </p>
                        </div>

                        {/* Main Content - Rendered from Markdown */}
                        <MarkdownContent content={article.content} />

                        {/* Social Share */}
                        <div className="mt-16 pt-8 border-t border-gray-200">
                            <SocialShareButtons
                                title={article.title}
                                slug={article.slug}
                            />
                        </div>

                        {/* Topics Section */}
                        {(article.subcategories.length > 0 || (article.tags && article.tags.length > 0)) && (
                            <div className="mt-12 pt-12 border-t border-gray-200">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    {/* Subcategories */}
                                    {article.subcategories.length > 0 && (
                                        <div>
                                            <div className="flex items-center space-x-3 mb-5">
                                                <div className="h-px w-8 bg-[#49648C]"></div>
                                                <h3 className="text-sm font-semibold text-[#0B1F3B] uppercase tracking-wider">
                                                    Related Topics
                                                </h3>
                                            </div>
                                            <div className="flex flex-wrap gap-2.5">
                                                {article.subcategories.map((subcategory) => (
                                                    <Link
                                                        key={subcategory.id}
                                                        href={`/subcategories/${subcategory.slug}`}
                                                        className="group relative inline-flex items-center px-4 py-2.5 bg-[#F5F2EA] text-[#0B1F3B] text-sm font-medium hover:bg-[#49648C] hover:text-white transition-all duration-300 overflow-hidden"
                                                    >
                                                        <span className="relative z-10">{subcategory.name}</span>
                                                        <div className="absolute inset-0 bg-[#49648C] transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tags */}
                                    {article.tags && article.tags.length > 0 && (
                                        <div>
                                            <div className="flex items-center space-x-3 mb-5">
                                                <div className="h-px w-8 bg-[#49648C]"></div>
                                                <h3 className="text-sm font-semibold text-[#0B1F3B] uppercase tracking-wider">
                                                    Tags
                                                </h3>
                                            </div>
                                            <div className="flex flex-wrap gap-2.5">
                                                {article.tags.map((tag) => (
                                                    <Link
                                                        key={tag.id}
                                                        href={`/tags/${tag.slug}`}
                                                        className="inline-flex items-center px-3.5 py-2 bg-white text-gray-600 text-sm font-medium border border-gray-300 hover:border-[#49648C] hover:text-[#49648C] hover:bg-[#F5F2EA] transition-all duration-200"
                                                    >
                                                        <span className="text-[#49648C] mr-1.5">#</span>
                                                        {tag.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </article>
                </Container>
            </section>

            {/* Author Bio */}
            <section className="bg-[#F5F2EA]">
                <Container maxWidth="lg">
                    <div className="py-16 md:py-20">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <Link
                                href={`/authors/${article.author.slug}`}
                                className="flex-shrink-0 group"
                            >
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                    <Image
                                        src={article.author.photo}
                                        alt={article.author.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </Link>
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="h-px w-12 bg-[#49648C]"></div>
                                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                        About the Author
                                    </span>
                                </div>
                                <Link
                                    href={`/authors/${article.author.slug}`}
                                    className="group inline-block"
                                >
                                    <h3 className="text-2xl md:text-3xl font-light text-[#0B1F3B] mb-2 group-hover:text-[#49648C] transition-colors">
                                        {article.author.name}
                                    </h3>
                                </Link>
                                <p className="text-sm text-gray-600 mb-4">{article.author.title}</p>
                                <p className="text-gray-700 leading-relaxed mb-6">{article.author.bio}</p>
                                <div className="flex flex-wrap items-center gap-4">
                                    {article.author.linkedin && (
                                        <a
                                            href={article.author.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center space-x-2 text-sm font-medium text-[#49648C] hover:text-[#0B1F3B] transition-colors group"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            <span>LinkedIn</span>
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    )}

                                    {article.author.email && (
                                        <a
                                            href={`mailto:${article.author.email}`}
                                            className="inline-flex items-center space-x-2 text-sm font-medium text-[#49648C] hover:text-[#0B1F3B] transition-colors group"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span>Email</span>
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
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
                        <div className="py-16 md:py-20">
                            <div className="flex items-center space-x-3 mb-12">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B]">
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
                                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                {related.excerpt}
                                            </p>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <time dateTime={related.publishDate}>
                                                    {new Date(related.publishDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </time>
                                                <span className="mx-2">•</span>
                                                <span>{related.readTime} min read</span>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            )}

            {/* Newsletter CTA */}
            <Section background="gradient">
                <Container maxWidth="md">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-heading text-[#0B1F3B] mb-4">
                                Get More Insights Like This
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                Sharp analysis delivered when we have something worth saying. No fluff, just actionable insights for wealth management professionals.
                            </p>
                        </div>

                        <NewsletterForm variant="centered" source="Article_CTA" />
                    </div>
                </Container>
            </Section>
        </>
    );
}