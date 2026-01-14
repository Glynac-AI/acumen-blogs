'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownContentProps {
    content: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
    // Custom components to style markdown elements
    const components: Components = {
        // Headings
        h1: ({ children }) => (
            <h1 className="text-4xl md:text-5xl font-light text-[#0B1F3B] mt-16 mb-8 leading-tight">
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-3xl font-light text-[#0B1F3B] mt-12 mb-6 leading-tight">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-2xl font-light text-[#0B1F3B] mt-10 mb-5 leading-snug">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-xl font-medium text-[#0B1F3B] mt-8 mb-4">
                {children}
            </h4>
        ),
        h5: ({ children }) => (
            <h5 className="text-lg font-medium text-[#0B1F3B] mt-6 mb-3">
                {children}
            </h5>
        ),
        h6: ({ children }) => (
            <h6 className="text-base font-semibold text-[#0B1F3B] mt-6 mb-3">
                {children}
            </h6>
        ),

        // Paragraphs
        p: ({ children }) => (
            <p className="text-gray-800 leading-relaxed mb-6">
                {children}
            </p>
        ),

        // Lists
        ul: ({ children }) => (
            <ul className="space-y-3 mb-8">
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol className="space-y-3 mb-8 list-decimal pl-6">
                {children}
            </ol>
        ),
        li: ({ children }) => (
            <li className="flex items-start text-gray-800 leading-relaxed">
                <span className="mr-3 mt-1.5 flex-shrink-0">•</span>
                <span className="flex-1">{children}</span>
            </li>
        ),

        // Blockquote
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#49648C] pl-6 my-8 italic text-gray-700 bg-transparent">
                {children}
            </blockquote>
        ),

        // Links
        a: ({ href, children }) => (
            <a
                href={href}
                className="text-[#49648C] hover:text-[#0B1F3B] underline transition-colors"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
        ),

        // Strong/Bold
        strong: ({ children }) => (
            <strong className="font-semibold text-[#0B1F3B]">
                {children}
            </strong>
        ),

        // Emphasis/Italic
        em: ({ children }) => (
            <em className="italic text-gray-800">
                {children}
            </em>
        ),

        // Code blocks
        code: ({ inline, children }) => {
            if (inline) {
                return (
                    <code className="px-2 py-0.5 bg-[#F5F2EA] text-[#0B1F3B] text-sm font-mono rounded">
                        {children}
                    </code>
                );
            }
            return (
                <code className="block p-4 bg-[#F5F2EA] text-[#0B1F3B] text-sm font-mono rounded mb-6 overflow-x-auto leading-relaxed">
                    {children}
                </code>
            );
        },

        // Pre (code blocks)
        pre: ({ children }) => (
            <pre className="bg-[#F5F2EA] rounded p-4 mb-6 overflow-x-auto">
                {children}
            </pre>
        ),

        // Horizontal rule
        hr: () => (
            <hr className="my-12 border-t border-gray-200" />
        ),

        // Tables
        table: ({ children }) => (
            <div className="overflow-x-auto mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                    {children}
                </table>
            </div>
        ),
        thead: ({ children }) => (
            <thead className="bg-[#F5F2EA]">
                {children}
            </thead>
        ),
        tbody: ({ children }) => (
            <tbody className="bg-white divide-y divide-gray-200">
                {children}
            </tbody>
        ),
        tr: ({ children }) => (
            <tr>
                {children}
            </tr>
        ),
        th: ({ children }) => (
            <th className="px-6 py-3 text-left text-xs font-semibold text-[#0B1F3B] uppercase tracking-wider">
                {children}
            </th>
        ),
        td: ({ children }) => (
            <td className="px-6 py-4 text-sm text-gray-800">
                {children}
            </td>
        ),

        // Images
        img: ({ src, alt }) => (
            <img
                src={src}
                alt={alt || ''}
                className="w-full rounded my-8"
            />
        ),
    };

    return (
        <div className="prose prose-lg max-w-none [&_ul_li_p]:m-0 [&_ul_li_p]:inline [&_ol_li_p]:m-0 [&_ol_li_p]:inline [&_li]:bg-transparent [&_li]:p-0">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
