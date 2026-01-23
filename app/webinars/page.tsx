// app/webinars/page.tsx

import React from 'react';
import { Container } from '@/components/ui/Container';

export default function WebinarsPage() {
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
                                    Learning
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0B1F3B] leading-tight mb-6">
                                Webinars
                            </h1>
                            <p className="text-xl text-gray-600 font-light leading-relaxed">
                                Deep-dive sessions on compliance, technology, and practice management for wealth management professionals.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Coming Soon */}
            <section className="bg-white min-h-[50vh] flex items-center">
                <Container>
                    <div className="text-center py-20">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B] mb-6">
                                Coming Soon
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                We&apos;re working on bringing you expert-led webinars covering the latest in SEC regulations,
                                technology implementations, and practice growth strategies.
                            </p>
                            <div className="inline-block px-8 py-3 bg-[#F5F2EA] text-[#0B1F3B] font-medium rounded">
                                Stay Tuned
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}