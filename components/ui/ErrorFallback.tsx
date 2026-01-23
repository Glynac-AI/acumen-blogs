'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  showHomeLink?: boolean;
  errorCode?: string;
}

export function ErrorFallback({
  title = "Something went wrong",
  message = "We&apos;re having trouble loading this content. Please try again later.",
  showRetry = true,
  onRetry,
  showHomeLink = true,
  errorCode,
}: ErrorFallbackProps) {
  return (
    <section className="bg-white min-h-[70vh] flex items-center">
      <Container>
        <div className="text-center max-w-2xl mx-auto py-20">
          {errorCode && (
            <h1 className="text-9xl font-light text-[#49648C] mb-6">
              {errorCode}
            </h1>
          )}

          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="h-px w-12 bg-[#49648C]"></div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
              Error
            </span>
            <div className="h-px w-12 bg-[#49648C]"></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B] mb-6">
            {title}
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {showRetry && onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#0B1F3B] text-white hover:bg-[#49648C] transition-colors text-sm font-medium tracking-wide uppercase"
                style={{ borderRadius: '2px' }}
              >
                <span>Try Again</span>
              </button>
            )}

            {showHomeLink && (
              <Link
                href="/"
                className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-[#0B1F3B] text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-white transition-colors text-sm font-medium tracking-wide uppercase"
                style={{ borderRadius: '2px' }}
              >
                <span>Back to Home</span>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ConnectionErrorFallback({
  onRetry,
}: {
  onRetry?: () => void;
}) {
  return (
    <ErrorFallback
      title="Connection Error"
      message="We&apos;re unable to connect to our servers right now. This might be a temporary issue. Please check your internet connection and try again."
      showRetry={true}
      onRetry={onRetry}
      showHomeLink={true}
    />
  );
}

export function DataLoadErrorFallback({
  onRetry,
}: {
  onRetry?: () => void;
}) {
  return (
    <ErrorFallback
      title="Unable to Load Content"
      message="We&apos;re having trouble loading the content you requested. Our team has been notified and is working on it."
      showRetry={true}
      onRetry={onRetry}
      showHomeLink={true}
    />
  );
}
