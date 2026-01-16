'use client';

import { useEffect } from 'react';
import { ErrorFallback } from '@/components/ui/ErrorFallback';

export default function CategoriesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Categories page error:', error);
  }, [error]);

  return (
    <ErrorFallback
      title="Unable to Load Category"
      message="We're having trouble loading this category. Please try again or browse our other content."
      showRetry={true}
      onRetry={reset}
      showHomeLink={true}
    />
  );
}
