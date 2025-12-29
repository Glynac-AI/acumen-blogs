import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { WhoThisIsForSection } from '@/components/home/WhoThisIsForSection';
import { FeaturedContentSection } from '@/components/home/FeaturedContentSection';
import { RecentArticlesSection } from '@/components/home/RecentArticlesSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

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