import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPillars, getArticles } from '@/lib/api/strapi';
import { Container } from '@/components/ui/Container';
import { Pillar, Article } from '@/types';

export default async function TestStrapiPage() {
    let pillars: Pillar[] = [];
    let articles: Article[] = [];
    let error: string | null = null;
    let debugInfo: any = null;

    // Try to fetch data
    try {
        console.log('🔄 Attempting to fetch from Strapi...');
        console.log('📍 API URL:', process.env.NEXT_PUBLIC_API_URL);

        pillars = await getPillars();
        articles = await getArticles();

        console.log('✅ Success! Pillars:', pillars.length, 'Articles:', articles.length);
    } catch (e: any) {
        console.error('❌ Fetch error:', e);
        error = e.message;
        debugInfo = {
            errorName: e.name,
            errorMessage: e.message,
            errorStack: e.stack?.split('\n').slice(0, 3).join('\n')
        };
    }

    // Group articles by pillar - with safety check
    const articlesByPillar = pillars.map(pillar => ({
        pillar,
        articles: articles.filter(article => article?.pillar?.id === pillar.id)
    }));

    return (
        <div className="min-h-screen bg-white py-12">
            <Container>
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-[#0B1F3B] mb-4">
                        Strapi Integration Test
                    </h1>
                    <p className="text-gray-600">
                        Testing connection to Strapi CMS
                    </p>
                </div>

                {/* Environment Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h2 className="text-blue-800 font-semibold mb-2">🔧 Configuration</h2>
                    <div className="space-y-1 text-sm">
                        <p><strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL || '❌ NOT SET'}</p>
                        <p><strong>Has Token:</strong> {process.env.STRAPI_API_TOKEN ? '✅ Yes' : '❌ No'}</p>
                        <p><strong>Token Length:</strong> {process.env.STRAPI_API_TOKEN?.length || 0} characters</p>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                        <h2 className="text-red-800 font-semibold mb-2">❌ Connection Error</h2>
                        <p className="text-red-600 text-sm mb-4">{error}</p>

                        {debugInfo && (
                            <details className="mt-4">
                                <summary className="cursor-pointer text-sm font-medium text-red-700">
                                    View Debug Info
                                </summary>
                                <pre className="mt-2 p-3 bg-red-100 rounded text-xs overflow-x-auto">
                                    {JSON.stringify(debugInfo, null, 2)}
                                </pre>
                            </details>
                        )}

                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                            <p className="text-sm font-semibold text-yellow-800 mb-2">Troubleshooting Steps:</p>
                            <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                                <li>Check if Strapi is running at: <code className="bg-yellow-100 px-1">{process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}</code></li>
                                <li>Verify STRAPI_API_TOKEN is set in .env.local</li>
                                <li>Restart Next.js dev server (Ctrl+C, then npm run dev)</li>
                                <li>Check Strapi admin: Content-Type Builder has Articles, Pillars, etc.</li>
                                <li>Check terminal for detailed error logs</li>
                            </ol>
                        </div>
                    </div>
                )}

                {/* Success State */}
                {!error && (
                    <>
                        {/* Summary */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                            <h2 className="text-green-800 font-semibold mb-2">✅ Connected Successfully</h2>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div>
                                    <p className="text-sm text-gray-600">Pillars</p>
                                    <p className="text-2xl font-bold text-[#0B1F3B]">{pillars.length}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Articles</p>
                                    <p className="text-2xl font-bold text-[#0B1F3B]">{articles.length}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">API URL</p>
                                    <p className="text-xs text-gray-700 break-all">
                                        {process.env.NEXT_PUBLIC_API_URL || 'localhost:1337'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Articles by Pillar */}
                        {articlesByPillar.map(({ pillar, articles }) => (
                            <div key={pillar.id} className="mb-12">
                                {/* Pillar Header */}
                                <div className="border-b-2 border-[#49648C] pb-4 mb-6">
                                    <h2 className="text-3xl font-light text-[#0B1F3B] mb-2">
                                        {pillar?.name || 'Unknown Pillar'}
                                    </h2>
                                    <p className="text-gray-600">{pillar?.subtitle || ''}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {articles.length} {articles.length === 1 ? 'article' : 'articles'}
                                    </p>
                                </div>

                                {/* Articles Grid */}
                                {articles.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {articles.map((article) => (
                                            <div
                                                key={article.id}
                                                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                                            >
                                                {/* Image */}
                                                {article?.featuredImage && (
                                                    <div className="relative w-full h-48 bg-gray-100">
                                                        <Image
                                                            src={article.featuredImage}
                                                            alt={article?.title || 'Article'}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}

                                                {/* Content */}
                                                <div className="p-4">
                                                    <h3 className="font-semibold text-[#0B1F3B] mb-2 line-clamp-2">
                                                        {article?.title || 'Untitled'}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                        {article?.excerpt || 'No excerpt'}
                                                    </p>
                                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                                        <span>{article?.author?.name || 'Unknown'}</span>
                                                        <span>{article?.readTime || 0} min read</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">No articles yet for this pillar</p>
                                )}
                            </div>
                        ))}

                        {/* No Articles */}
                        {articles.length === 0 && (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <p className="text-gray-500 mb-2">No articles found in Strapi</p>
                                <p className="text-sm text-gray-400">
                                    Add some articles in Strapi admin panel
                                </p>
                            </div>
                        )}
                    </>
                )}

                {/* Back Link */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <Link
                        href="/"
                        className="text-[#49648C] hover:text-[#0B1F3B] font-medium"
                    >
                        ← Back to Homepage
                    </Link>
                </div>
            </Container>
        </div>
    );
} 