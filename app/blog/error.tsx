'use client';

import { useEffect } from 'react';
import { ErrorFallback } from '@/components/ui/ErrorFallback';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Blog page error:', error);
  }, [error]);

  const isConnectionError =
    error.message?.toLowerCase().includes('fetch') ||
    error.message?.toLowerCase().includes('network') ||
    error.message?.toLowerCase().includes('econnrefused');

  return (
    <ErrorFallback
      title={isConnectionError ? "Unable to Load Articles" : "Blog Error"}
      message={
        isConnectionError
          ? "We&apos;re having trouble connecting to load our articles. Please try again in a moment."
          : "We couldn't load the blog content. Please try again."
      }
      showRetry={true}
      onRetry={reset}
      showHomeLink={true}
    />
  );
}
