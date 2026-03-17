'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-6xl font-light text-gray-400 mb-4">Oops!</h1>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-8">
              We encountered an unexpected error. Our team has been notified.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-blue-900 text-white hover:bg-blue-800 transition-colors text-sm font-medium uppercase tracking-wide"
                style={{ borderRadius: '2px' }}
              >
                Try Again
              </button>
              <Link
                href="/"
                className="px-6 py-3 border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white transition-colors text-sm font-medium uppercase tracking-wide"
                style={{ borderRadius: '2px' }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
