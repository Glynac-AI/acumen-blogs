'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { subscribeToNewsletter } from '@/lib/api';

interface NewsletterFormProps {
    variant?: 'inline' | 'centered' | 'dark';
    source?: string;
}

const CheckIcon = () => (
    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const ErrorIcon = () => (
    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const NewsletterForm: React.FC<NewsletterFormProps> = ({
    variant = 'inline',
    source = 'Homepage',
}) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setStatus('error');
            setMessage('Please enter a valid email address');
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            const result = await subscribeToNewsletter(email, source);

            if (!result.success) {
                setStatus('error');
                setMessage(result.message);

                setTimeout(() => {
                    setStatus('idle');
                    setMessage('');
                }, 5000);
                return;
            }

            setStatus('success');
            setMessage(result.message);
            setEmail('');

            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 5000);
        } catch (error) {
            setStatus('error');
            setMessage(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');

            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 5000);
        }
    };

    if (variant === 'dark') {
        return (
            <div className="w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            aria-label="Email address"
                            className={`flex-1 px-5 py-4 rounded-lg border-2 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                                status === 'error'
                                    ? 'border-red-300 focus:ring-red-500'
                                    : 'border-white/20 focus:ring-white/50'
                            }`}
                            disabled={status === 'loading' || status === 'success'}
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-white text-[#0B1F3B] font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-lg hover:shadow-xl whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={status === 'loading' || status === 'success'}
                            aria-label="Subscribe to newsletter"
                        >
                            {status === 'loading' && <LoadingSpinner />}
                            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </div>

                    {message && (
                        <div
                            className={`p-3 rounded-lg text-sm font-medium transition-all ${
                                status === 'success'
                                    ? 'bg-green-500/20 text-white border border-green-400/30'
                                    : 'bg-red-500/20 text-white border border-red-400/30'
                            }`}
                            role="alert"
                            aria-live="polite"
                        >
                            {status === 'success' && <CheckIcon />}
                            {status === 'error' && <ErrorIcon />}
                            {message}
                        </div>
                    )}
                </form>
            </div>
        );
    }

    if (variant === 'centered') {
        return (
            <div className="max-w-lg mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            aria-label="Email address"
                            className={`grow px-4 py-3 rounded-lg border ${
                                status === 'error'
                                    ? 'border-red-300 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-[#49648C]'
                            } focus:outline-none focus:ring-2 focus:border-transparent transition-all text-base`}
                            disabled={status === 'loading' || status === 'success'}
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full sm:w-auto whitespace-nowrap px-8"
                            disabled={status === 'loading' || status === 'success'}
                            aria-label="Subscribe to newsletter"
                        >
                            {status === 'loading' && <LoadingSpinner />}
                            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                        </Button>
                    </div>

                    {message && (
                        <div
                            className={`p-3 rounded-lg text-sm font-medium transition-all ${
                                status === 'success'
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-red-50 text-red-700 border border-red-200'
                            }`}
                            role="alert"
                            aria-live="polite"
                        >
                            {status === 'success' && <CheckIcon />}
                            {status === 'error' && <ErrorIcon />}
                            {message}
                        </div>
                    )}
                </form>
            </div>
        );
    }

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address"
                    className={`w-full px-4 py-2.5 rounded-md border bg-white text-gray-900 ${
                        status === 'error'
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-[#49648C]'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                    disabled={status === 'loading' || status === 'success'}
                />
                <Button
                    type="submit"
                    variant="secondary"
                    size="md"
                    className="w-full font-semibold"
                    disabled={status === 'loading' || status === 'success'}
                    aria-label="Subscribe"
                >
                    {status === 'loading' && <LoadingSpinner />}
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </Button>
            </form>

            {message && (
                <div
                    className={`mt-3 p-2 rounded text-sm font-medium ${
                        status === 'success'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                    }`}
                    role="alert"
                    aria-live="polite"
                >
                    {status === 'success' && <CheckIcon />}
                    {status === 'error' && <ErrorIcon />}
                    {message}
                </div>
            )}
        </div>
    );
};