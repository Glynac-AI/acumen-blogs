import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { CATEGORIES } from '@/config/categories';
import { generateDefaultMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateDefaultMetadata(
    'About',
    'RegulateThis publishes sharp, actionable insights on practice management, wealth management software, and regulatory compliance. Learn about our mission and what makes us different.',
    '/about'
);

export default function AboutPage() {
    return (
        <>
            {/* Hero Section - Strong Opening */}
            <section className="bg-[#0B1F3B] text-white">
                <Container>
                    <div className="py-20 md:py-32">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-8">
                                Most wealth management content is forgettable by design
                            </h1>
                            <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed max-w-3xl mx-auto">
                                Safe, surface-level, and written for everyone — which means it's useful to no one.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Mission Statement */}
            <section className="bg-white">
                <Container>
                    <div className="py-20 md:py-28">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                    Our Mission
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#0B1F3B] leading-tight mb-8">
                                We built this for advisors who want sharper thinking
                            </h2>

                            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                                <p>
                                    RegulateThis publishes sharp, actionable insights on practice management, wealth management software, and regulatory compliance.
                                </p>
                                <p>
                                    No vendor spin. No compliance theater. No content written to appease everyone while helping no one.
                                </p>
                                <p>
                                    We write for RIA owners, compliance officers, operations leaders, and advisors who value depth over breadth and substance over noise.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* What We Cover */}
            <section className="bg-[#F5F2EA]">
                <Container>
                    <div className="py-20 md:py-28">
                        <div className="text-center mb-12">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                    What We Cover
                                </span>
                                <div className="h-px w-12 bg-[#49648C]"></div>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B]">
                                Three Areas That Matter
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {CATEGORIES.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/categories/${category.slug}`}
                                    className="group relative bg-white border border-gray-200 hover:border-[#49648C] transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-[#49648C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                                    <div className="p-8 md:p-10">
                                        <h3 className="text-2xl font-light text-[#0B1F3B] mb-3">
                                            {category.name}
                                        </h3>
                                        <p className="text-[#49648C] font-medium mb-6">
                                            {category.subtitle}
                                        </p>
                                        <p className="text-gray-700 leading-relaxed mb-6">
                                            {category.description.split('.')[0]}.
                                        </p>

                                        <div className="space-y-2">
                                            {category.details.slice(0, 2).map((detail, idx) => (
                                                <div key={idx} className="flex items-start text-sm text-gray-600">
                                                    <span className="text-[#49648C] mr-2">→</span>
                                                    <span>{detail.split('—')[0]}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 text-sm font-medium text-[#49648C] group-hover:text-[#0B1F3B] transition-colors">
                                            Explore {category.name} →
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Philosophy */}
            <section className="bg-white">
                <Container>
                    <div className="py-20 md:py-28">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                    Our Approach
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#0B1F3B] leading-tight mb-8">
                                What makes us different
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-medium text-[#0B1F3B] mb-3">
                                        We publish when we have something to say
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Not on a schedule. Not to hit SEO targets. When we've tested something worth sharing, conducted research that matters, or identified a trend before it becomes obvious.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-medium text-[#0B1F3B] mb-3">
                                        We name names
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        When a platform falls short, we say so. When a strategy works, we explain why. We test tools, call out gaps, and spotlight what actually delivers.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-medium text-[#0B1F3B] mb-3">
                                        We write for practitioners
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Not compliance committees. Not vendor audiences. People running firms, managing operations, and navigating regulations in the real world.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Contact CTA */}
            <section className="bg-[#0B1F3B] text-white">
                <Container>
                    <div className="py-16 md:py-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-light mb-4">
                            Have a story to share or a topic to suggest?
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            We're always looking for insights from the field and ideas worth exploring.
                        </p>
                        <a
                            href="mailto:hello@regulatethis.com"
                            className="inline-block px-8 py-3 bg-[#49648C] text-white font-medium rounded hover:bg-[#5A7AA0] transition-colors"
                        >
                            Get in Touch
                        </a>
                    </div>
                </Container>
            </section>
        </>
    );
}