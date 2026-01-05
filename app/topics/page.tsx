// app/topics/page.tsx (NEW FILE)
import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getPillars } from '@/lib/api/strapi';
import { generateDefaultMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateDefaultMetadata(
    'All Topics',
    'Browse all topics and categories on RegulateThis - practice management, technology, and compliance insights for wealth management professionals.',
    '/topics'
);

export default async function AllTopicsPage() {
    const pillars = await getPillars();

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
                                    Browse
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0B1F3B] leading-tight mb-6">
                                All Topics
                            </h1>
                            <p className="text-xl text-gray-600 font-light leading-relaxed">
                                Explore all {pillars.length} topic areas covering practice management, technology, and regulatory compliance.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Topics Grid */}
            <section className="bg-white">
                <Container>
                    <div className="py-16 md:py-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pillars.map((pillar) => (
                                <Link
                                    key={pillar.id}
                                    href={`/topics/${pillar.slug}`}
                                    className="group"
                                >
                                    <article className="h-full bg-white border border-gray-200 hover:border-[#49648C] transition-all duration-300 p-8">
                                        {/* Top accent line on hover */}
                                        <div className="h-0.5 bg-[#49648C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mb-6"></div>

                                        <h2 className="text-2xl font-light text-[#0B1F3B] mb-3 group-hover:text-[#49648C] transition-colors">
                                            {pillar.name}
                                        </h2>

                                        <p className="text-[#49648C] font-medium mb-4 text-sm uppercase tracking-wide">
                                            {pillar.subtitle}
                                        </p>

                                        <p className="text-gray-700 leading-relaxed mb-6">
                                            {pillar.description}
                                        </p>

                                        {/* Arrow indicator */}
                                        <div className="flex items-center text-sm font-medium text-[#49648C] group-hover:text-[#0B1F3B] transition-colors">
                                            <span>Explore Topic</span>
                                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}