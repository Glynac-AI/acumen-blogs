'use client';

import { useEffect } from 'react';
import { ErrorFallback } from '@/components/ui/ErrorFallback';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console in development
    console.error('Application error:', error);
  }, [error]);

  // Check if it's a connection/network error
  const isConnectionError =
    error.message?.toLowerCase().includes('fetch') ||
    error.message?.toLowerCase().includes('network') ||
    error.message?.toLowerCase().includes('econnrefused') ||
    error.message?.toLowerCase().includes('failed to fetch');

  return (
    <ErrorFallback
      title={isConnectionError ? "Connection Error" : "Something went wrong"}
      message={
        isConnectionError
          ? "We&apos;re unable to connect to our servers right now. Please check your internet connection and try again."
          : "We encountered an unexpected error. Please try again or return to the homepage."
      }
      showRetry={true}
      onRetry={reset}
      showHomeLink={true}
    />
  );
}
