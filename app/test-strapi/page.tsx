import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    fetchArticles,
    fetchAuthors,
    fetchCategories,
    fetchSubcategories,
    fetchTags,
} from '@/lib/api';
import { Container } from '@/components/ui/Container';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TestStrapiPage() {
    // Fetch all data
    let articles, authors, categories, subcategories, tags;
    let errors: string[] = [];

    try {
        articles = await fetchArticles({ limit: 10 });
    } catch (error) {
        errors.push(`Articles: ${error instanceof Error ? error.message : 'Unknown error'}`);
        articles = [];
    }

    try {
        authors = await fetchAuthors();
    } catch (error) {
        errors.push(`Authors: ${error instanceof Error ? error.message : 'Unknown error'}`);
        authors = [];
    }

    try {
        categories = await fetchCategories();
    } catch (error) {
        errors.push(`Categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
        categories = [];
    }

    try {
        subcategories = await fetchSubcategories();
    } catch (error) {
        errors.push(`Subcategories: ${error instanceof Error ? error.message : 'Unknown error'}`);
        subcategories = [];
    }

    try {
        tags = await fetchTags();
    } catch (error) {
        errors.push(`Tags: ${error instanceof Error ? error.message : 'Unknown error'}`);
        tags = [];
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Container>
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-[#0B1F3B] mb-4">
                        Strapi API Test Page
                    </h1>
                    <p className="text-lg text-gray-600">
                        Testing connection to Strapi CMS and data fetching
                    </p>
                    <div className="mt-4 flex gap-4 text-sm">
                        <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded">
                            <strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'Not configured'}
                        </div>
                        <div className="px-4 py-2 bg-green-100 text-green-800 rounded">
                            <strong>API Token:</strong> {process.env.STRAPI_API_TOKEN ? '✓ Configured' : '✗ Missing'}
                        </div>
                    </div>
                </div>

                {/* Errors */}
                {errors.length > 0 && (
                    <div className="mb-8 p-6 bg-red-50 border-l-4 border-red-500">
                        <h2 className="text-xl font-bold text-red-800 mb-4">⚠️ Errors Encountered</h2>
                        <ul className="list-disc list-inside space-y-2 text-red-700">
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
                    <StatCard title="Articles" count={articles.length} color="blue" />
                    <StatCard title="Authors" count={authors.length} color="green" />
                    <StatCard title="Categories" count={categories.length} color="purple" />
                    <StatCard title="Subcategories" count={subcategories.length} color="orange" />
                    <StatCard title="Tags" count={tags.length} color="pink" />
                </div>

                {/* Articles Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-[#0B1F3B] mb-6">
                        Articles ({articles.length})
                    </h2>
                    {articles.length === 0 ? (
                        <p className="text-gray-500 italic">No articles found</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article) => (
                                <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                                    {/* Featured Image */}
                                    <div className="relative h-48 w-full bg-gray-200">
                                        <Image
                                            src={article.featuredImage}
                                            alt={article.title}
                                            fill
                                            className="object-cover"
                                        />
                                        {article.isFeatured && (
                                            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 text-xs font-bold rounded">
                                                FEATURED
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Category Badge */}
                                        <div className="mb-3">
                                            <span className="inline-block px-3 py-1 bg-[#0B1F3B] text-white text-xs font-semibold rounded">
                                                {article.category.name}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-[#0B1F3B] mb-2 line-clamp-2">
                                            {article.title}
                                        </h3>

                                        {/* Subtitle */}
                                        {article.subtitle && (
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                                                {article.subtitle}
                                            </p>
                                        )}

                                        {/* Excerpt */}
                                        <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                                            {article.excerpt}
                                        </p>

                                        {/* Metadata */}
                                        <div className="border-t pt-3 space-y-2 text-xs text-gray-600">
                                            <div><strong>Author:</strong> {article.author.name}</div>
                                            <div><strong>Published:</strong> {article.publishDate}</div>
                                            <div><strong>Read Time:</strong> {article.readTime} min</div>
                                            <div><strong>Slug:</strong> {article.slug}</div>
                                            <div>
                                                <strong>Subcategories:</strong>{' '}
                                                {article.subcategories.map(s => s.name).join(', ')}
                                            </div>
                                            {article.tags && article.tags.length > 0 && (
                                                <div>
                                                    <strong>Tags:</strong>{' '}
                                                    {article.tags.map(t => t.name).join(', ')}
                                                </div>
                                            )}
                                        </div>

                                        {/* SEO Data */}
                                        {article.seo && (
                                            <details className="mt-3 border-t pt-3">
                                                <summary className="text-xs font-semibold text-gray-700 cursor-pointer">
                                                    SEO Data
                                                </summary>
                                                <div className="mt-2 text-xs text-gray-600 space-y-1">
                                                    {article.seo.metaTitle && (
                                                        <div><strong>Meta Title:</strong> {article.seo.metaTitle}</div>
                                                    )}
                                                    {article.seo.metaDescription && (
                                                        <div><strong>Meta Desc:</strong> {article.seo.metaDescription}</div>
                                                    )}
                                                    {article.seo.keywords && (
                                                        <div><strong>Keywords:</strong> {article.seo.keywords}</div>
                                                    )}
                                                    {article.seo.canonicalURL && (
                                                        <div><strong>Canonical:</strong> {article.seo.canonicalURL}</div>
                                                    )}
                                                </div>
                                            </details>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Authors Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-[#0B1F3B] mb-6">
                        Authors ({authors.length})
                    </h2>
                    {authors.length === 0 ? (
                        <p className="text-gray-500 italic">No authors found</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {authors.map((author) => (
                                <div key={author.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                                    {/* Author Photo */}
                                    <div className="flex items-center mb-4">
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden mr-4 border-2 border-[#49648C]">
                                            <Image
                                                src={author.photo}
                                                alt={author.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[#0B1F3B]">
                                                {author.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">{author.title}</p>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                                        {author.bio}
                                    </p>

                                    {/* Metadata */}
                                    <div className="border-t pt-3 space-y-1 text-xs text-gray-600">
                                        <div><strong>ID:</strong> {author.id}</div>
                                        {author.email && <div><strong>Email:</strong> {author.email}</div>}
                                        {author.linkedin && (
                                            <div>
                                                <strong>LinkedIn:</strong>{' '}
                                                <Link href={author.linkedin} className="text-blue-600 hover:underline" target="_blank">
                                                    View Profile
                                                </Link>
                                            </div>
                                        )}
                                        {author.twitter && (
                                            <div>
                                                <strong>Twitter:</strong>{' '}
                                                <Link href={author.twitter} className="text-blue-600 hover:underline" target="_blank">
                                                    View Profile
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Categories Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-[#0B1F3B] mb-6">
                        Categories ({categories.length})
                    </h2>
                    {categories.length === 0 ? (
                        <p className="text-gray-500 italic">No categories found</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {categories.map((category) => (
                                <div key={category.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                                    <div className="mb-3">
                                        <span className="text-xs font-semibold text-[#49648C]">
                                            Order: {category.order}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm font-medium text-[#49648C] mb-3">
                                        {category.subtitle}
                                    </p>
                                    <p className="text-sm text-gray-700 mb-4">
                                        {category.description}
                                    </p>
                                    {category.details && category.details.length > 0 && (
                                        <div className="border-t pt-3">
                                            <h4 className="text-xs font-semibold text-gray-700 mb-2">Details:</h4>
                                            <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                                                {category.details.map((detail, index) => (
                                                    <li key={index}>{detail}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="border-t mt-3 pt-3 text-xs text-gray-600">
                                        <div><strong>ID:</strong> {category.id}</div>
                                        <div><strong>Slug:</strong> {category.slug}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Subcategories Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-[#0B1F3B] mb-6">
                        Subcategories ({subcategories.length})
                    </h2>
                    {subcategories.length === 0 ? (
                        <p className="text-gray-500 italic">No subcategories found</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {subcategories.map((subcategory) => (
                                <div key={subcategory.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                                    <h3 className="text-sm font-bold text-[#0B1F3B] mb-2">
                                        {subcategory.name}
                                    </h3>
                                    {subcategory.description && (
                                        <p className="text-xs text-gray-600 mb-2">
                                            {subcategory.description}
                                        </p>
                                    )}
                                    <div className="text-xs text-gray-500 space-y-1">
                                        <div><strong>Slug:</strong> {subcategory.slug}</div>
                                        <div><strong>Category ID:</strong> {subcategory.categoryId}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Tags Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-[#0B1F3B] mb-6">
                        Tags ({tags.length})
                    </h2>
                    {tags.length === 0 ? (
                        <p className="text-gray-500 italic">No tags found</p>
                    ) : (
                        <div className="flex flex-wrap gap-3">
                            {tags.map((tag) => (
                                <div
                                    key={tag.id}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm"
                                >
                                    <span className="text-sm font-medium text-[#0B1F3B]">
                                        {tag.name}
                                    </span>
                                    <span className="text-xs text-gray-500 ml-2">
                                        ({tag.slug})
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Raw JSON Data (expandable) */}
                <section className="mb-12">
                    <details className="bg-gray-800 text-white p-6 rounded-lg">
                        <summary className="text-lg font-bold cursor-pointer mb-4">
                            📄 View Raw JSON Data (for debugging)
                        </summary>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-yellow-400 mb-2">Articles:</h3>
                                <pre className="text-xs overflow-auto bg-gray-900 p-4 rounded">
                                    {JSON.stringify(articles, null, 2)}
                                </pre>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-yellow-400 mb-2">Authors:</h3>
                                <pre className="text-xs overflow-auto bg-gray-900 p-4 rounded">
                                    {JSON.stringify(authors, null, 2)}
                                </pre>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-yellow-400 mb-2">Categories:</h3>
                                <pre className="text-xs overflow-auto bg-gray-900 p-4 rounded">
                                    {JSON.stringify(categories, null, 2)}
                                </pre>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-yellow-400 mb-2">Subcategories:</h3>
                                <pre className="text-xs overflow-auto bg-gray-900 p-4 rounded">
                                    {JSON.stringify(subcategories, null, 2)}
                                </pre>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-yellow-400 mb-2">Tags:</h3>
                                <pre className="text-xs overflow-auto bg-gray-900 p-4 rounded">
                                    {JSON.stringify(tags, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </details>
                </section>
            </Container>
        </div>
    );
}

// Stat Card Component
function StatCard({ title, count, color }: { title: string; count: number; color: string }) {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-800 border-blue-300',
        green: 'bg-green-100 text-green-800 border-green-300',
        purple: 'bg-purple-100 text-purple-800 border-purple-300',
        orange: 'bg-orange-100 text-orange-800 border-orange-300',
        pink: 'bg-pink-100 text-pink-800 border-pink-300',
    };

    return (
        <div className={`rounded-lg p-6 border-2 ${colorClasses[color as keyof typeof colorClasses]}`}>
            <div className="text-3xl font-bold mb-1">{count}</div>
            <div className="text-sm font-semibold">{title}</div>
        </div>
    );
}
