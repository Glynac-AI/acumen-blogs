'use client';

import { useEffect } from 'react';
import { ErrorFallback } from '@/components/ui/ErrorFallback';

export default function SubcategoriesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Subcategories page error:', error);
  }, [error]);

  return (
    <ErrorFallback
      title="Unable to Load Subcategory"
      message="We're having trouble loading this subcategory. Please try again or browse our other content."
      showRetry={true}
      onRetry={reset}
      showHomeLink={true}
    />
  );
}
