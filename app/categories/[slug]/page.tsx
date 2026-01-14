import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/article/ArticleCard';
import { fetchCategoryBySlug, fetchArticles, fetchSubcategories } from '@/lib/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = await fetchCategoryBySlug(slug);

    if (!category) {
        return {
            title: 'Category Not Found | RegulateThis',
        };
    }

    return {
        title: `${category.name} | RegulateThis`,
        description: category.description,
        openGraph: {
            title: `${category.name} | RegulateThis`,
            description: category.description,
        },
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const category = await fetchCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    // Get all articles for this category (already sorted by publishDate desc from API)
    const categoryArticles = await fetchArticles({ categorySlug: slug });

    // Featured article (most recent)
    const featuredArticle = categoryArticles[0];
    const otherArticles = categoryArticles.slice(1);

    // Get all subcategories and filter by this category
    const allSubcategories = await fetchSubcategories();
    const subcategories = allSubcategories.filter(sub => sub.categoryId === category.id);

    return (
        <>
            {/* Hero Section */}
            <section className="bg-[#0B1F3B] text-white">
                <Container>
                    <div className="py-20 md:py-28">
                        {/* Breadcrumb */}
                        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href="/blog" className="hover:text-white transition-colors">
                                Categories
                            </Link>
                            <span>/</span>
                            <span className="text-white">{category.name}</span>
                        </div>

                        <div className="max-w-4xl">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                    {category.name}
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-8">
                                {category.subtitle}
                            </h1>

                            <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
                                {category.description}
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* What We Cover in This Category */}
            <section className="bg-white">
                <Container>
                    <div className="py-16 md:py-20">
                        <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B] mb-8">
                            What We Cover
                        </h2>
                        <div className="space-y-4 max-w-3xl">
                            {category.details.map((detail, index) => (
                                <div key={index} className="flex items-start">
                                    <span className="text-[#49648C] mr-3 mt-1">→</span>
                                    <p className="text-lg text-gray-700 leading-relaxed">{detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Subcategories Navigation */}
            {subcategories.length > 0 && (
                <section className="bg-[#F5F2EA]">
                    <Container>
                        <div className="py-12 md:py-16">
                            <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B] mb-6">
                                Browse by Topic
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {subcategories.map((subcategory) => (
                                    <Link
                                        key={subcategory.id}
                                        href={`/subcategories/${subcategory.slug}`}
                                        className="px-4 py-2 bg-white text-[#0B1F3B] text-sm font-medium rounded border border-gray-300 hover:border-[#49648C] hover:bg-[#49648C] hover:text-white transition-all"
                                    >
                                        {subcategory.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            )}

            {/* Featured Article */}
            {featuredArticle && (
                <section className="bg-white">
                    <Container>
                        <div className="py-12 md:py-16">
                            <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B] mb-8">
                                Featured Article
                            </h2>
                            <ArticleCard article={featuredArticle} featured />
                        </div>
                    </Container>
                </section>
            )}

            {/* All Articles */}
            {otherArticles.length > 0 && (
                <section className="bg-white border-t border-gray-100">
                    <Container>
                        <div className="py-12 md:py-16">
                            <h2 className="text-2xl md:text-3xl font-light text-[#0B1F3B] mb-8">
                                All {category.name} Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {otherArticles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            )}

            {/* Newsletter CTA */}
            <section className="bg-[#0B1F3B] text-white">
                <Container>
                    <div className="py-16 md:py-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-light mb-4">
                            Stay Updated on {category.name}
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            Get our latest insights delivered to your inbox. No fluff, just sharp analysis.
                        </p>
                        <Link
                            href="/newsletter"
                            className="inline-block px-8 py-3 bg-[#49648C] text-white font-medium rounded hover:bg-[#5A7AA0] transition-colors"
                        >
                            Subscribe to Newsletter
                        </Link>
                    </div>
                </Container>
            </section>
        </>
    );
}