'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownContentProps {
    content: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
    return (
        <div className="article-content">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    // Customize heading styles
                    h1: ({ children }) => (
                        <h1 className="text-4xl font-light text-[#0B1F3B] mt-12 mb-6 leading-tight">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-3xl font-light text-[#0B1F3B] mt-12 mb-6 leading-tight">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-2xl font-light text-[#0B1F3B] mt-10 mb-4">
                            {children}
                        </h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="text-xl font-medium text-[#0B1F3B] mt-8 mb-3">
                            {children}
                        </h4>
                    ),
                    // Customize paragraph spacing
                    p: ({ children }) => (
                        <p className="text-base text-gray-700 leading-relaxed mb-6">
                            {children}
                        </p>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc list-outside my-6 ml-8 space-y-3 bg-white">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal list-outside my-6 ml-8 space-y-3 bg-white">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="text-base text-gray-700 leading-relaxed pl-2 bg-white [&_code]:bg-transparent [&_code]:p-0 [&_code]:m-0 [&_code]:font-sans [&_code]:text-base [&_code]:text-gray-700 [&_code]:font-normal [&_code]:leading-relaxed">
                            {children}
                        </li>
                    ),
                    // Customize links
                    a: ({ href, children }) => (
<a
                        href = { href }
                            className="text-[#49648C] hover:text-[#0B1F3B] underline transition-colors"
                            target={ href?.startsWith('http') ? '_blank' : undefined
                }
                            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
            ),
            // Customize blockquotes
            blockquote: ({children}) => (
            <blockquote className="border-l-4 border-[#49648C] pl-6 py-2 my-6 italic text-gray-700 bg-[#F5F2EA]">
                {children}
            </blockquote>
            ),
            // Customize code blocks
            code: ({children, className}) => {
                        const isInline = !className;
            if (isInline) {
                            return (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-[#0B1F3B]">
                {children}
            </code>
            );
                        }
            return (
            <code className={`block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-6 ${className || ''}`}>
                {children}
            </code>
            );
                    },
            // Customize tables
            table: ({children}) => (
            <div className="overflow-x-auto my-6">
                <table className="min-w-full border border-gray-200">
                    {children}
                </table>
            </div>
            ),
            th: ({children}) => (
            <th className="border border-gray-200 bg-gray-50 px-4 py-2 text-left font-semibold text-[#0B1F3B]">
                {children}
            </th>
            ),
            td: ({children}) => (
            <td className="border border-gray-200 px-4 py-2 text-gray-700">
                {children}
            </td>
            ),
            // Customize strong/bold
            strong: ({children}) => (
            <strong className="font-semibold text-[#0B1F3B]">
                {children}
            </strong>
            ),
            // Customize emphasis/italic
            em: ({children}) => (
            <em className="italic text-gray-700">
                {children}
            </em>
            ),
                }}
            >
            {content}
        </ReactMarkdown>
        </div >
    );
};