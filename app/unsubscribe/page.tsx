'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';

// Success checkmark icon
const CheckIcon = () => (
    <svg className="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

// Error icon
const ErrorIcon = () => (
    <svg className="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Loading spinner
const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export default function UnsubscribePage() {
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');
    const [otherReasonText, setOtherReasonText] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic email validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setStatus('error');
            setMessage('Please enter a valid email address');
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            const finalReason = reason === 'other' && otherReasonText
                ? `Other: ${otherReasonText}`
                : reason;

            const response = await fetch('/api/newsletter/unsubscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, reason: finalReason }),
            });

            const data = await response.json();

            if (!response.ok && response.status !== 404) {
                throw new Error(data.error || 'Failed to unsubscribe');
            }

            if (response.status === 404) {
                setStatus('error');
                setMessage('Email address not found. You may not be subscribed or have already unsubscribed.');
            } else {
                setStatus('success');
                setMessage(data.message || 'You have been successfully unsubscribed');
                setEmail('');
                setReason('');
                setOtherReasonText('');
            }

        } catch (error) {
            setStatus('error');
            setMessage(error instanceof Error ? error.message : 'Failed to unsubscribe. Please try again.');
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-white border-b border-gray-100">
                <Container>
                    <div className="py-16 md:py-20">
                        <div className="max-w-2xl mx-auto text-center">
                            {/* Breadcrumb */}
                            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-8">
                                <Link href="/" className="hover:text-[#49648C] transition-colors">
                                    Home
                                </Link>
                                <span>/</span>
                                <span className="text-[#0B1F3B]">Unsubscribe</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-light text-[#0B1F3B] mb-6">
                                Unsubscribe from Newsletter
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We&apos;re sorry to see you go. Enter your email address below to unsubscribe from our newsletter.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Unsubscribe Form Section */}
            <section className="bg-[#F5F2EA]">
                <Container>
                    <div className="py-16 md:py-20">
                        <div className="max-w-lg mx-auto">
                            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                                {status === 'success' ? (
                                    // Success State
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                                            <CheckIcon />
                                        </div>
                                        <h2 className="text-2xl font-heading text-[#0B1F3B] mb-4">
                                            Successfully Unsubscribed
                                        </h2>
                                        <p className="text-gray-600 mb-8">
                                            {message}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-6">
                                            You won&apos;t receive any more emails from us. If this was a mistake, you can always subscribe again.
                                        </p>
                                        <Link
                                            href="/"
                                            className="inline-block px-8 py-3 bg-[#0B1F3B] text-white font-medium rounded-lg hover:bg-[#49648C] transition-colors"
                                        >
                                            Return to Homepage
                                        </Link>
                                    </div>
                                ) : (
                                    // Form State
                                    <>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter your email address"
                                                    className={`w-full px-4 py-3 rounded-lg border ${
                                                        status === 'error'
                                                            ? 'border-red-300 focus:ring-red-500'
                                                            : 'border-gray-300 focus:ring-[#49648C]'
                                                    } focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                                                    disabled={status === 'loading'}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Reason for Unsubscribing (Optional)
                                                </label>
                                                <select
                                                    id="reason"
                                                    value={reason}
                                                    onChange={(e) => setReason(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#49648C] focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                                                    disabled={status === 'loading'}
                                                >
                                                    <option value="">Select a reason (optional)</option>
                                                    <option value="too_frequent">Email frequency is too high</option>
                                                    <option value="not_relevant">Content is not relevant to my role or firm</option>
                                                    <option value="no_longer_interested">No longer interested in this topic</option>
                                                    <option value="content_quality">Content quality doesn&apos;t meet my expectations</option>
                                                    <option value="left_industry">No longer working in this industry</option>
                                                    <option value="never_signed_up">I never signed up for this</option>
                                                    <option value="prefer_other_channels">Prefer to follow via other channels</option>
                                                    <option value="other">Other reason</option>
                                                </select>
                                            </div>

                                            {/* Conditional text area for "Other" reason */}
                                            {reason === 'other' && (
                                                <div>
                                                    <label htmlFor="otherReason" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Please tell us more
                                                    </label>
                                                    <textarea
                                                        id="otherReason"
                                                        value={otherReasonText}
                                                        onChange={(e) => setOtherReasonText(e.target.value)}
                                                        placeholder="Help us understand your reason..."
                                                        rows={3}
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#49648C] focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                                                        disabled={status === 'loading'}
                                                    />
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                className="w-full px-8 py-3 bg-[#0B1F3B] text-white font-semibold rounded-lg hover:bg-[#49648C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={status === 'loading'}
                                            >
                                                {status === 'loading' && <LoadingSpinner />}
                                                {status === 'loading' ? 'Unsubscribing...' : 'Unsubscribe'}
                                            </button>

                                            {/* Error Message */}
                                            {status === 'error' && message && (
                                                <div
                                                    className="p-4 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm"
                                                    role="alert"
                                                >
                                                    <ErrorIcon />
                                                    {message}
                                                </div>
                                            )}
                                        </form>

                                        {/* Help Text */}
                                        <div className="mt-8 pt-8 border-t border-gray-200">
                                            <p className="text-sm text-gray-600 text-center">
                                                Having trouble? Contact us at{' '}
                                                <a
                                                    href="mailto:hello@regulatethis.com"
                                                    className="text-[#49648C] hover:text-[#0B1F3B] font-medium"
                                                >
                                                    hello@regulatethis.com
                                                </a>
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
