'use client';

import { useEffect } from 'react';
import { ErrorFallback } from '@/components/ui/ErrorFallback';

export default function TagsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Tags page error:', error);
  }, [error]);

  return (
    <ErrorFallback
      title="Unable to Load Tag"
      message="We&apos;re having trouble loading articles with this tag. Please try again."
      showRetry={true}
      onRetry={reset}
      showHomeLink={true}
    />
  );
}
