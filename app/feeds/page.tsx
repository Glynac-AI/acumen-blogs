import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { FeedLink } from '@/components/feeds/FeedLink';
import { FeedSection } from '@/components/feeds/FeedSection';
import { fetchCategories, fetchAuthors, fetchTags, fetchSubcategories } from '@/lib/api';
import { getBaseUrl } from '@/config/site';
import { Rss, Folder, User, Tag, List } from 'lucide-react';

export const metadata: Metadata = {
    title: 'RSS Feeds - RegulateThis',
    description: 'Subscribe to RegulateThis RSS feeds. Stay updated with articles on wealth management, compliance, and practice management for RIA firms.',
    openGraph: {
        title: 'RSS Feeds - RegulateThis',
        description: 'Subscribe to RegulateThis RSS feeds for wealth management and compliance updates.',
    },
};

export default async function FeedsPage() {
    const baseUrl = getBaseUrl();

    // Fetch all data in parallel
    const [categories, authors, tags, subcategories] = await Promise.all([
        fetchCategories(),
        fetchAuthors(),
        fetchTags(),
        fetchSubcategories(),
    ]);

    return (
        <Container>
            <div className="py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0B1F3B] text-white mb-6">
                        <Rss className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0B1F3B] mb-4">
                        RSS Feeds
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Subscribe to RegulateThis feeds and stay updated with the latest articles on wealth management, compliance, and practice management.
                    </p>
                </div>

                {/* Main Feed */}
                <FeedSection
                    title="Main Feed"
                    description="Get all articles from RegulateThis in one feed"
                >
                    <FeedLink
                        title="All Articles"
                        url={`${baseUrl}/feed.xml`}
                        description="Subscribe to receive all published articles"
                        icon={<Rss className="w-4 h-4 text-[#49648C] flex-shrink-0" />}
                    />
                </FeedSection>

                {/* Category Feeds */}
                <FeedSection
                    title="Feeds by Category"
                    description="Subscribe to specific topics that interest you"
                >
                    {categories.map((category) => (
                        <FeedLink
                            key={category.id}
                            title={category.name}
                            url={`${baseUrl}/feed/categories/${category.slug}`}
                            description={category.subtitle}
                            icon={<Folder className="w-4 h-4 text-[#49648C] flex-shrink-0" />}
                        />
                    ))}
                </FeedSection>

                {/* Subcategory Feeds */}
                <FeedSection
                    title="Feeds by Subcategory"
                    description="Get even more specific with subcategory feeds"
                >
                    {subcategories.map((subcategory) => (
                        <FeedLink
                            key={subcategory.id}
                            title={subcategory.name}
                            url={`${baseUrl}/feed/subcategories/${subcategory.slug}`}
                            description={subcategory.description}
                            icon={<List className="w-4 h-4 text-[#49648C] flex-shrink-0" />}
                        />
                    ))}
                </FeedSection>

                {/* Author Feeds */}
                <FeedSection
                    title="Feeds by Author"
                    description="Follow your favorite authors"
                >
                    {authors.map((author) => (
                        <FeedLink
                            key={author.id}
                            title={author.name}
                            url={`${baseUrl}/feed/authors/${author.slug}`}
                            description={author.title}
                            icon={<User className="w-4 h-4 text-[#49648C] flex-shrink-0" />}
                        />
                    ))}
                </FeedSection>

                {/* Tag Feeds */}
                <FeedSection
                    title="Feeds by Tag"
                    description="Subscribe to articles by specific tags"
                >
                    {tags.map((tag) => (
                        <FeedLink
                            key={tag.id}
                            title={tag.name}
                            url={`${baseUrl}/feed/tags/${tag.slug}`}
                            icon={<Tag className="w-4 h-4 text-[#49648C] flex-shrink-0" />}
                        />
                    ))}
                </FeedSection>

                {/* How to Use RSS */}
                <div className="mt-16 p-8 bg-gray-50 rounded-lg">
                    <h2 className="text-2xl font-bold text-[#0B1F3B] mb-4">How to Use RSS Feeds</h2>
                    <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 mb-4">
                            RSS feeds allow you to stay updated with new content without visiting the website. Here&apos;s how to get started:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-gray-600">
                            <li>Choose an RSS reader (Feedly, Inoreader, NewsBlur, or use your browser)</li>
                            <li>Copy the feed URL from above (click the copy button)</li>
                            <li>Paste the URL into your RSS reader</li>
                            <li>Enjoy automatic updates when new articles are published</li>
                        </ol>
                    </div>
                </div>
            </div>
        </Container>
    );
}
