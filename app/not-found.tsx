import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
    return (
        <section className="bg-white min-h-[70vh] flex items-center">
            <Container>
                <div className="text-center max-w-2xl mx-auto py-20">
                    {/* 404 */}
                    <h1 className="text-9xl font-light text-[#49648C] mb-6">
                        404
                    </h1>

                    {/* Message */}
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="h-px w-12 bg-[#49648C]"></div>
                        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                            Page Not Found
                        </span>
                        <div className="h-px w-12 bg-[#49648C]"></div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B] mb-6">
                        This page doesn't exist
                    </h2>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        The page you're looking for might have been moved, deleted, or never existed in the first place.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#0B1F3B] text-white hover:bg-[#49648C] transition-colors text-sm font-medium tracking-wide uppercase"
                            style={{ borderRadius: '2px' }}
                        >
                            <span>Back to Home</span>
                        </Link>

                        <Link
                            href="/blog"
                            className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-[#0B1F3B] text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-white transition-colors text-sm font-medium tracking-wide uppercase"
                            style={{ borderRadius: '2px' }}
                        >
                            <span>Browse Articles</span>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}