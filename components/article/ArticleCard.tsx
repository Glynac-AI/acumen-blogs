import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';

interface ArticleCardProps {
    article: Article;
    featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
    const formattedDate = new Date(article.publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    if (featured) {
        return (
            <article className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Image */}
                    <Link href={`/blog/${article.slug}`} className="block">
                        <div className="relative h-64 md:h-full">
                            <Image
                                src={article.featuredImage}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </Link>

                    {/* Content */}
                    <div className="p-8 flex flex-col justify-center">
                        {/* Category Badge */}
                        <Link
                            href={`/categories/${article.category.slug}`}
                            className="inline-block w-fit px-3 py-1 bg-[#49648C] text-white text-xs font-semibold uppercase tracking-wider rounded mb-4 hover:bg-[#5A7AA0] transition-colors"
                        >
                            {article.category.name}
                        </Link>

                        {/* Title & Subtitle */}
                        <Link href={`/blog/${article.slug}`}>
                            <h2 className="text-3xl font-light text-[#0B1F3B] mb-3 group-hover:text-[#49648C] transition-colors">
                                {article.title}
                            </h2>
                        </Link>
                        {article.subtitle && (
                            <p className="text-lg text-gray-600 mb-4">{article.subtitle}</p>
                        )}

                        {/* Excerpt */}
                        <p className="text-gray-700 mb-4 line-clamp-3">{article.excerpt}</p>

                        {/* Subcategories */}
                        {article.subcategories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {article.subcategories.map((subcategory) => (
                                    <Link
                                        key={subcategory.id}
                                        href={`/subcategories/${subcategory.slug}`}
                                        className="text-xs text-[#49648C] hover:underline"
                                    >
                                        {subcategory.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Meta */}
                        <div className="flex items-center text-sm text-gray-500">
                            <span>{article.author.name}</span>
                            <span className="mx-2">•</span>
                            <span>{formattedDate}</span>
                            <span className="mx-2">•</span>
                            <span>{article.readTime} min read</span>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Image */}
            <Link href={`/blog/${article.slug}`} className="block">
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </Link>

            {/* Content */}
            <div className="p-6">
                {/* Category Badge */}
                <Link
                    href={`/categories/${article.category.slug}`}
                    className="inline-block w-fit px-3 py-1 bg-[#49648C] text-white text-xs font-semibold uppercase tracking-wider rounded mb-3 hover:bg-[#5A7AA0] transition-colors"
                >
                    {article.category.name}
                </Link>

                {/* Title */}
                <Link href={`/blog/${article.slug}`}>
                    <h3 className="text-xl font-light text-[#0B1F3B] mb-2 group-hover:text-[#49648C] transition-colors line-clamp-2">
                        {article.title}
                    </h3>
                </Link>

                {/* Subtitle */}
                {article.subtitle && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.subtitle}</p>
                )}

                {/* Excerpt */}
                <p className="text-gray-700 mb-4 line-clamp-3 text-sm">{article.excerpt}</p>

                {/* Subcategories */}
                {article.subcategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {article.subcategories.slice(0, 2).map((subcategory) => (
                            <Link
                                key={subcategory.id}
                                href={`/subcategories/${subcategory.slug}`}
                                className="text-xs text-[#49648C] hover:underline"
                            >
                                {subcategory.name}
                            </Link>
                        ))}
                        {article.subcategories.length > 2 && (
                            <span className="text-xs text-gray-400">
                                +{article.subcategories.length - 2} more
                            </span>
                        )}
                    </div>
                )}

                {/* Meta */}
                <div className="flex items-center text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span>{formattedDate}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime} min read</span>
                </div>
            </div>
        </article>
    );
};