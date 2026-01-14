import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { fetchAuthors, fetchArticles } from '@/lib/api';
import { generateDefaultMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateDefaultMetadata(
    'Authors',
    'Meet the industry professionals behind RegulateThis. Experienced advisors, compliance officers, and technology experts sharing their insights.',
    '/authors'
);

export default async function AuthorsPage() {
    // Fetch all authors and articles from Strapi
    const authors = await fetchAuthors();
    const allArticles = await fetchArticles();

    // Get article count for each author
    const authorsWithArticles = authors.map(author => ({
        ...author,
        articleCount: allArticles.filter(article => article.author.id === author.id).length
    }));

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
                                    Our Team
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0B1F3B] leading-tight mb-6">
                                Contributors
                            </h1>
                            <p className="text-xl text-gray-600 font-light leading-relaxed">
                                Industry professionals who've been there, done that, and have the insights to prove it.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Authors Grid */}
            <section className="bg-white">
                <Container>
                    <div className="py-16 md:py-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {authorsWithArticles.map((author) => (
                                <Link
                                    key={author.id}
                                    href={`/authors/${author.slug}`}
                                    className="group"
                                >
                                    <article className="bg-white border border-gray-200 hover:border-[#49648C] transition-all duration-300 overflow-hidden">
                                        {/* Top accent line on hover */}
                                        <div className="h-0.5 bg-[#49648C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                                        <div className="p-8">
                                            {/* Author Photo */}
                                            <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-[#49648C]">
                                                <Image
                                                    src={author.photo}
                                                    alt={author.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Author Info */}
                                            <div className="text-center">
                                                <h3 className="text-xl font-medium text-[#0B1F3B] group-hover:text-[#49648C] transition-colors mb-2">
                                                    {author.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    {author.title}
                                                </p>
                                                <p className="text-sm text-gray-700 leading-relaxed mb-6 line-clamp-3">
                                                    {author.bio}
                                                </p>

                                                {/* Article Count */}
                                                <div className="pt-4 border-t border-gray-200">
                                                    <p className="text-xs font-medium text-[#49648C] uppercase tracking-wider">
                                                        {author.articleCount} {author.articleCount === 1 ? 'Article' : 'Articles'}
                                                    </p>
                                                </div>
                                            </div>
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