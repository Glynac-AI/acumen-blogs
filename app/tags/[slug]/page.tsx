import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/article/ArticleCard';
import { fetchTagBySlug, fetchArticles } from '@/lib/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Tag } from '@/types';

interface TagPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const { slug } = await params;
    const tag = await fetchTagBySlug(slug);

    if (!tag) {
        return {
            title: 'Tag Not Found | RegulateThis',
        };
    }

    return {
        title: `${tag.name} | RegulateThis`,
        description: `Articles tagged with ${tag.name}`,
        openGraph: {
            title: `${tag.name} | RegulateThis`,
            description: `Articles tagged with ${tag.name}`,
        },
    };
}

export default async function TagPage({ params }: TagPageProps) {
    const { slug } = await params;
    const tag = await fetchTagBySlug(slug);

    if (!tag) {
        notFound();
    }

    // Get articles with this tag (already sorted by publishDate desc from API)
    const tagArticles = await fetchArticles({ tagSlug: slug });

    // Get related tags (tags that appear in the same articles)
    const relatedTagsMap = new Map<string, Tag>();
    tagArticles.forEach(article => {
        article.tags?.forEach(t => {
            if (t.slug !== slug && !relatedTagsMap.has(t.id)) {
                relatedTagsMap.set(t.id, t);
            }
        });
    });

    const relatedTags = Array.from(relatedTagsMap.values()).slice(0, 6);

    return (
        <>
            {/* Page Header */}
            <section className="bg-white border-b border-gray-100">
                <Container>
                    <div className="py-16 md:py-20">
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
                            <span className="text-[#0B1F3B]">Tags</span>
                            <span>/</span>
                            <span className="text-[#0B1F3B]">{tag.name}</span>
                        </div>

                        <div className="max-w-3xl">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                    Topic
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0B1F3B] leading-tight mb-6">
                                {tag.name}
                            </h1>
                            <p className="text-xl text-gray-600 font-light leading-relaxed">
                                {tagArticles.length} {tagArticles.length === 1 ? 'article' : 'articles'} tagged with "{tag.name}"
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Articles */}
            <section className="bg-white">
                <Container>
                    <div className="py-16 md:py-20">
                        {tagArticles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {tagArticles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No articles found with this tag.</p>
                            </div>
                        )}
                    </div>
                </Container>
            </section>

            {/* Related Tags */}
            {relatedTags.length > 0 && (
                <section className="bg-[#F5F2EA]">
                    <Container>
                        <div className="py-16 md:py-20">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B]">
                                    Related Topics
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {relatedTags.map((relatedTag) => (
                                    <Link
                                        key={relatedTag.id}
                                        href={`/tags/${relatedTag.slug}`}
                                        className="px-4 py-2 text-sm font-medium text-[#0B1F3B] bg-white border border-gray-200 hover:border-[#49648C] hover:text-[#49648C] transition-colors"
                                        style={{ borderRadius: '2px' }}
                                    >
                                        {relatedTag.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            )}
        </>
    );
}