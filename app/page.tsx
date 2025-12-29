import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { WhoThisIsForSection } from '@/components/home/WhoThisIsForSection';
import { FeaturedContentSection } from '@/components/home/FeaturedContentSection';
import { RecentArticlesSection } from '@/components/home/RecentArticlesSection';
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
      <HeroSection />
      <WhoThisIsForSection />
      <FeaturedContentSection />
      <RecentArticlesSection />
      <NewsletterSection />
    </>
  );
}