'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { CATEGORIES } from '@/config/categories';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        navigation: [
            { href: '/', label: 'Home' },
            { href: '/blog', label: 'All Articles' },
            { href: '/authors', label: 'Authors' },
            { href: '/about', label: 'About Us' },
        ],
        categories: CATEGORIES.map(category => ({
            href: `/categories/${category.slug}`,
            label: category.name
        })),
        additional: [
            { href: '/resources', label: 'Resources' },
            { href: '/events', label: 'Events' },
        ],
        legal: [
            { href: '/privacy', label: 'Privacy Policy' },
            { href: '/terms', label: 'Terms of Use' },
            { href: '/feed.xml', label: 'RSS Feed' },
        ],
    };

    return (
        <footer className="bg-[#0B1F3B] text-white">
            <Container>
                <div className="py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {/* About Section */}
                        <div className="lg:col-span-1">
                            <h3 className="text-xl font-bold mb-4">RegulateThis</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                Sharp, actionable insights on practice management, wealth management software, and regulatory compliance.
                            </p>
                        </div>

                        {/* Navigation Links */}
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                                Navigation
                            </h4>
                            <ul className="space-y-2">
                                {footerLinks.navigation.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-300 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                                {footerLinks.additional.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-300 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Categories */}
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                                Categories
                            </h4>
                            <ul className="space-y-2">
                                {footerLinks.categories.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-300 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal & Contact */}
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                                Legal
                            </h4>
                            <ul className="space-y-2">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-300 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Newsletter */}
                            <div className="mt-6">
                                <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">
                                    Newsletter
                                </h4>
                                <Link
                                    href="/newsletter"
                                    className="inline-block px-4 py-2 bg-[#49648C] text-white text-sm font-medium rounded hover:bg-[#5A7AA0] transition-colors"
                                >
                                    Subscribe
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-12 pt-8 border-t border-gray-700">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-sm text-gray-400">
                                © {currentYear} RegulateThis. All rights reserved.
                            </p>

                            {/* Social Links */}
                            <div className="flex items-center space-x-4">
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                    aria-label="Twitter"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};