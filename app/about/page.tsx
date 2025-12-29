import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { PILLARS } from '@/config/pillars';

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
                                    RegulateThis publishes sharp, actionable insights on practice management, wealth management technology, and regulatory compliance.
                                </p>
                                <p>
                                    No vendor spin. No compliance theater. No content written to appease everyone while helping no one.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* What Makes Us Different - Visual Grid */}
            <section className="bg-[#F5F2EA]">
                <Container>
                    <div className="py-20 md:py-28">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B] mb-4">
                                What Makes Us Different
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                                {
                                    title: 'Grounded in Reality',
                                    description: 'Practice insights from real advisory challenges, not theoretical frameworks'
                                },
                                {
                                    title: 'No Legalese',
                                    description: 'Compliance updates explained in plain language you can actually use'
                                },
                                {
                                    title: 'Vendor-Neutral',
                                    description: 'Tech coverage that skips the sales pitch and tells you what actually works'
                                },
                                {
                                    title: 'Immediately Actionable',
                                    description: 'Strategic thinking you can apply to your firm this week, not someday'
                                },
                                {
                                    title: 'Quality Over Quantity',
                                    description: 'Published consistently when we have something worth saying'
                                },
                                {
                                    title: 'For Practitioners',
                                    description: 'Written by people who understand the complexity of modern advisory work'
                                }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-8 border-t-2 border-[#49648C]"
                                >
                                    <h3 className="text-xl font-medium text-[#0B1F3B] mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Three Pillars - Visual Cards */}
            <section className="bg-white">
                <Container>
                    <div className="py-20 md:py-28">
                        <div className="text-center mb-16">
                            <div className="flex items-center justify-center space-x-3 mb-6">
                                <div className="h-px w-12 bg-[#49648C]"></div>
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
                            {PILLARS.map((pillar, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-white border border-gray-200 hover:border-[#49648C] transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-[#49648C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                                    <div className="p-8 md:p-10">
                                        <h3 className="text-2xl font-light text-[#0B1F3B] mb-3">
                                            {pillar.name}
                                        </h3>
                                        <p className="text-[#49648C] font-medium mb-6">
                                            {pillar.subtitle}
                                        </p>
                                        <p className="text-gray-700 leading-relaxed mb-6">
                                            {pillar.description.split('.')[0]}.
                                        </p>
                                        <div className="space-y-3 text-sm text-gray-600">
                                            {pillar.details.map((detail, detailIndex) => (
                                                <p key={detailIndex}>→ {detail}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Editorial Standards - Quote Style */}
            <section className="bg-[#0B1F3B] text-white">
                <Container>
                    <div className="py-20 md:py-28">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="mb-8">
                                <svg className="w-12 h-12 mx-auto text-[#49648C]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-light mb-8 leading-relaxed">
                                We publish when we have something worth reading. Quality matters more than frequency.
                            </h2>
                            <p className="text-lg text-gray-300">
                                Every article goes through rigorous editing because your time has value and our reputation depends on earning it.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="bg-white">
                <Container>
                    <div className="py-20 md:py-28 text-center">
                        <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B] mb-6">
                            Start Reading
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            New articles delivered to your inbox when we have something worth saying
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/blog"
                                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#0B1F3B] text-white hover:bg-[#49648C] transition-colors text-sm font-medium tracking-wide uppercase"
                                style={{ borderRadius: '2px' }}
                            >
                                <span>Browse Articles</span>
                            </Link>
                            <Link
                                href="/#newsletter"
                                className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-[#0B1F3B] text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-white transition-colors text-sm font-medium tracking-wide uppercase"
                                style={{ borderRadius: '2px' }}
                            >
                                <span>Subscribe</span>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}