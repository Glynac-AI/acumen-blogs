'use client';

import { useState } from 'react';
import { Check, Copy, Rss } from 'lucide-react';

interface FeedLinkProps {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
}

export function FeedLink({ title, url, description, icon }: FeedLinkProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="group border border-gray-200 rounded-lg p-4 hover:border-[#49648C] transition-colors">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        {icon || <Rss className="w-4 h-4 text-[#49648C] flex-shrink-0" />}
                        <h3 className="font-semibold text-[#0B1F3B]">{title}</h3>
                    </div>
                    {description && (
                        <p className="text-sm text-gray-600 mb-2">{description}</p>
                    )}
                    <div className="flex items-center gap-2">
                        <code className="text-xs bg-gray-50 px-2 py-1 rounded text-gray-700 break-all flex-1">
                            {url}
                        </code>
                    </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-md bg-gray-100 hover:bg-[#49648C] hover:text-white transition-colors"
                        title="Copy to clipboard"
                    >
                        {copied ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </button>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md bg-[#0B1F3B] text-white hover:bg-[#49648C] transition-colors"
                        title="View feed"
                    >
                        <Rss className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}
