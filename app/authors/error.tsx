'use client';

import { useEffect } from 'react';
import { ErrorFallback } from '@/components/ui/ErrorFallback';

export default function AuthorsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Authors page error:', error);
  }, [error]);

  return (
    <ErrorFallback
      title="Unable to Load Author"
      message="We&apos;re having trouble loading this author's profile. Please try again."
      showRetry={true}
      onRetry={reset}
      showHomeLink={true}
    />
  );
}
