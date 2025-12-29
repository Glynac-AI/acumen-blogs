import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/article/ArticleCard';
import { mockAuthors, mockArticles } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

interface AuthorPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
    const { id } = await params;
    const author = mockAuthors.find(a => a.id === id);

    if (!author) {
        notFound();
    }

    // Get all articles by this author
    const authorArticles = mockArticles
        .filter(article => article.author.id === author.id)
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    return (
        <>
            {/* Author Header */}
            <section className="bg-[#F5F2EA]">
                <Container>
                    <div className="py-16 md:py-20">
                        {/* Breadcrumb */}
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                            <Link href="/" className="hover:text-[#49648C] transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href="/authors" className="hover:text-[#49648C] transition-colors">
                                Authors
                            </Link>
                            <span>/</span>
                            <span className="text-[#0B1F3B]">{author.name}</span>
                        </div>

                        {/* Author Info */}
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Photo */}
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#49648C] flex-shrink-0">
                                <Image
                                    src={author.photo}
                                    alt={author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-grow">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="h-px w-12 bg-[#49648C]"></div>
                                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                        Contributor
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-light text-[#0B1F3B] mb-3">
                                    {author.name}
                                </h1>
                                <p className="text-lg text-gray-600 mb-6">
                                    {author.title}
                                </p>
                                <p className="text-base text-gray-700 leading-relaxed mb-6 max-w-3xl">
                                    {author.bio}
                                </p>

                                {/* Social Links */}
                                <div className="flex items-center space-x-4">
                                    {author.linkedin && (
                                        <a
                                            href={author.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center space-x-2 text-sm font-medium text-[#49648C] hover:text-[#0B1F3B] transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            <span>LinkedIn</span>
                                        </a>
                                    )}

                                    {author.email && (
                                        <a
                                            href={`mailto:${author.email}`}
                                            className="inline-flex items-center space-x-2 text-sm font-medium text-[#49648C] hover:text-[#0B1F3B] transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span>Email</span>
                                        </a>
                                    )}
                                </div>

                                {/* Stats */}
                                <div className="mt-8 pt-6 border-t border-gray-300">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold text-[#0B1F3B]">{authorArticles.length}</span> {authorArticles.length === 1 ? 'Article' : 'Articles'} Published
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Author's Articles */}
            <section className="bg-white">
                <Container>
                    <div className="py-16 md:py-20">
                        <div className="flex items-center space-x-3 mb-12">
                            <div className="h-px w-12 bg-[#49648C]"></div>
                            <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B]">
                                Articles by {author.name.split(' ')[0]}
                            </h2>
                        </div>

                        {authorArticles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {authorArticles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No articles yet.</p>
                            </div>
                        )}
                    </div>
                </Container>
            </section>
        </>
    );
}