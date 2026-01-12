import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { LatestByCategorySection } from '@/components/home/LatestByCategorySection';
import { MostPopularSection } from '@/components/home/MostPopularSection';
import { BrowseTopicsSection } from '@/components/home/BrowseTopicsSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { generateDefaultMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateDefaultMetadata(
  'Home',
  'Sharp, actionable insights on practice management, wealth management technology, and regulatory compliance for wealth management professionals.',
  '/'
);

export default function HomePage() {
  return (
    <>
      {/* Featured Stories - FiercePharma Style */}
      <HeroSection />

      {/* Latest Articles by Category */}
      <LatestByCategorySection />

      {/* Most Popular This Week */}
      <MostPopularSection />

      {/* Browse by Topic */}
      <BrowseTopicsSection />

      {/* Newsletter Subscription */}
      <NewsletterSection />
    </>
  );
}