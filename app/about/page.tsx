import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { fetchCategories } from '@/lib/api';
import { generateDefaultMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateDefaultMetadata(
    'About',
    'Actionable insights on RIA practice management, wealth management software, and regulatory compliance. Written for advisors who run firms.',
    '/about'
);

export default async function AboutPage() {
    const categories = await fetchCategories();

    return (
        <>
            {/* Hero Section */}
            <section className="bg-[#0B1F3B] text-white">
                <Container>
                    <div className="py-20 md:py-28">
                        <div className="max-w-4xl">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                    About Us
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-8">
                                Read What Top Advisors Are Reading
                            </h1>

                            <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed mb-4">
                                Actionable insights on RIA practice management, wealth management software, and regulatory compliance.
                            </p>
                            <p className="text-lg font-medium text-white">
                                Written for advisors who run firms.
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
                                Built for Advisors Who Value Their Time
                            </h2>

                            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                                <p>
                                    RegulateThis delivers focused insights on practice management, wealth management technology, and RIA compliance.
                                </p>
                                <p>
                                    Every article earns its place. If it doesn&apos;t help you make better decisions, we don&apos;t publish it.
                                </p>
                                <p>
                                    We write for RIA owners, compliance officers, operations leaders, and firm makers who want substance over noise.
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
                            {categories.map((category) => (
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

                                        {category.details && category.details.length > 0 && (
                                            <div className="space-y-2">
                                                {category.details.slice(0, 2).map((detail, idx) => (
                                                    <div key={idx} className="flex items-start text-sm text-gray-600">
                                                        <span className="text-[#49648C] mr-2">→</span>
                                                        <span>{detail.split('—')[0]}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

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

            {/* Our Approach */}
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
                                What Makes Us Different?
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-medium text-[#0B1F3B] mb-3">
                                        We publish when it matters
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Quality over quantity. Every piece goes live because it&apos;s useful, not because a content calendar said so.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-medium text-[#0B1F3B] mb-3">
                                        We get specific
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Vague advice helps no one. We break down what works, what doesn&apos;t, and why. Details you can apply this week.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-medium text-[#0B1F3B] mb-3">
                                        We write for the people doing the work
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Firm owners. Compliance leads. Operations managers. If you&apos;re building or running an advisory firm, this is for you.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Contact CTA */}
            <section className="bg-white">
                <Container>
                    <div className="py-16 md:py-20">
                        <div className="bg-[#0B1F3B] text-white rounded-lg px-8 py-12 md:px-16 md:py-16 text-center">
                            <h2 className="text-3xl md:text-4xl font-light mb-4">
                                Have a Story to Share or a Topic to Suggest?
                            </h2>
                            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                                We&apos;re always looking for insights from the field and ideas worth exploring.
                            </p>
                            <a
                                href="mailto:hello@regulatethis.com"
                                className="inline-block px-8 py-3 bg-[#49648C] text-white font-medium rounded hover:bg-[#5A7AA0] transition-colors"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
