import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { CATEGORIES } from '@/config/categories';

export const WhoThisIsForSection: React.FC = () => {
    return (
        <section className="relative bg-white overflow-hidden">
            <Container>
                <div className="py-20 md:py-28">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        {/* Main Headline */}
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0B1F3B] leading-tight">
                                Read what the top advisors are reading
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                                The advisory industry has enough noise. We publish sharp, actionable insights on practice management, wealth management software, and regulatory compliance.
                            </p>
                        </div>

                        {/* Three Categories Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                            {CATEGORIES.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/categories/${category.slug}`}
                                    className="group relative p-8 bg-white border border-gray-200 hover:border-[#49648C] transition-all duration-300"
                                >
                                    <div className="absolute top-0 left-0 w-full h-0.5 bg-[#49648C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                                    <div className="space-y-3">
                                        <h3 className="text-xl font-medium text-[#0B1F3B] group-hover:text-[#49648C] transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {category.subtitle}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Bottom Statement */}
                        <div className="pt-8 space-y-4">
                            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                                Most wealth management content is forgettable by design — safe, surface-level, and written for everyone, which means it's useful to no one.
                            </p>
                            <p className="text-lg text-[#0B1F3B] font-medium">
                                We built this for advisors who want sharper thinking.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};