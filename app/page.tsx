import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { LatestByCategorySection } from '@/components/home/LatestByCategorySection';
import { MostPopularSection } from '@/components/home/MostPopularSection';
import { BrowseTopicsSection } from '@/components/home/BrowseTopicsSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { generateDefaultMetadata } from '@/lib/seo';
import { fetchCategories, fetchArticles } from '@/lib/api';
import type { Metadata } from 'next';

// Revalidate data every 60 seconds
export const revalidate = 60;

export const metadata: Metadata = generateDefaultMetadata(
  'Home',
  'Sharp, actionable insights on practice management, wealth management technology, and regulatory compliance for wealth management professionals.',
  '/'
);

export default async function HomePage() {
  // Fetch categories and articles from Strapi
  const categories = await fetchCategories();
  const allArticles = await fetchArticles({ limit: 50 });

  // Group articles by category (latest 3 per category)
  const articlesByCategory = categories.map(category => ({
    category,
    articles: allArticles
      .filter(article => article.category.id === category.id)
      .slice(0, 3)
  })).filter(group => group.articles.length > 0);

  // Calculate article counts for Browse Topics section
  const categoriesWithCounts = categories.map(category => ({
    ...category,
    articleCount: allArticles.filter(article => article.category.id === category.id).length
  }));

  return (
    <>
      {/* Featured Stories - Hero Section with Featured + Latest Hybrid */}
      <HeroSection articles={allArticles} />

      {/* Latest Articles by Category */}
      <LatestByCategorySection articlesByCategory={articlesByCategory} />

      {/* Most Popular This Week */}
      <MostPopularSection articles={allArticles} />

      {/* Browse by Topic */}
      <BrowseTopicsSection categories={categoriesWithCounts} />

      {/* Newsletter Subscription */}
      <NewsletterSection />
    </>
  );
}