// components/layout/Header.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SearchDropdown } from '@/components/search/SearchDropdown';
import type { Pillar } from '@/types';

interface HeaderProps {
    pillars: Pillar[];
}

export const Header: React.FC<HeaderProps> = ({ pillars = [] }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [isMobileTopicsOpen, setIsMobileTopicsOpen] = useState(false);

    const pillarLinks = pillars.map(pillar => ({
        href: `/topics/${pillar.slug}`,
        label: pillar.name
    }));

    const itemsPerColumn = 5;
    const numColumns = Math.min(Math.ceil(pillarLinks.length / itemsPerColumn), 4);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <Container>
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="relative w-8 h-8 flex items-center justify-center">
                            <svg viewBox="0 0 32 36" fill="none" className="w-full h-full">
                                <path
                                    d="M16 2L4 8v8c0 7.5 5 14 12 18 7-4 12-10.5 12-18V8L16 2z"
                                    fill="#49648C"
                                />
                                <path
                                    d="M16 6L8 10v6c0 5 3.5 9.5 8 12 4.5-2.5 8-7 8-12v-6l-8-4z"
                                    fill="#0B1F3B"
                                />
                                <text
                                    x="16"
                                    y="21"
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="14"
                                    fontWeight="bold"
                                    fontFamily="serif"
                                >
                                    R
                                </text>
                            </svg>
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-[#0B1F3B]">
                            RegulateThis
                        </span>
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden lg:flex flex-1 max-w-md mx-4">
                        <SearchDropdown />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-6">
                        <Link
                            href="/"
                            className="text-sm font-medium text-[#0B1F3B] hover:text-[#49648C] transition-colors"
                        >
                            Home
                        </Link>

                        {/* Topics Dropdown */}
                        <div className="relative group">
                            <button className="text-sm font-medium text-[#0B1F3B] hover:text-[#49648C] transition-colors flex items-center gap-1">
                                Topics
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown - positioned right to prevent overflow */}
                            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-max min-w-[220px] max-w-[800px] max-h-[70vh] overflow-y-auto">
                                <div
                                    className="p-4 grid gap-2"
                                    style={{
                                        gridTemplateColumns: `repeat(${numColumns}, minmax(180px, 1fr))`,
                                        gridAutoFlow: 'column',
                                        gridTemplateRows: `repeat(${itemsPerColumn}, auto)`
                                    }}
                                >
                                    {pillarLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="px-4 py-2.5 text-sm font-medium text-[#0B1F3B] hover:bg-[#F5F2EA] hover:text-[#49648C] transition-colors rounded whitespace-nowrap"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>

                                {/* View All Link (if many pillars) */}
                                {pillarLinks.length > 10 && (
                                    <div className="border-t border-gray-100 p-3">
                                        <Link
                                            href="/topics"
                                            className="block w-full text-center px-4 py-2 text-sm font-medium text-[#49648C] hover:bg-[#F5F2EA] rounded transition-colors"
                                        >
                                            View All Topics →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Link
                            href="/blog"
                            className="text-sm font-medium text-[#0B1F3B] hover:text-[#49648C] transition-colors"
                        >
                            All Articles
                        </Link>

                        <Link
                            href="/authors"
                            className="text-sm font-medium text-[#0B1F3B] hover:text-[#49648C] transition-colors"
                        >
                            Authors
                        </Link>

                        <Link
                            href="/about"
                            className="text-sm font-medium text-[#0B1F3B] hover:text-[#49648C] transition-colors"
                        >
                            About
                        </Link>
                    </nav>

                    {/* Mobile Search + Menu Buttons */}
                    <div className="flex items-center space-x-2">
                        <button
                            className="lg:hidden p-2 text-[#0B1F3B] hover:text-[#49648C] hover:bg-[#F5F2EA] rounded-full transition-colors"
                            onClick={() => setShowMobileSearch(!showMobileSearch)}
                            aria-label="Toggle search"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        <button
                            className="lg:hidden p-2 text-[#0B1F3B]"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {showMobileSearch && (
                    <div className="lg:hidden py-4 border-t border-gray-200">
                        <SearchDropdown />
                    </div>
                )}

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-gray-200">
                        <nav className="flex flex-col space-y-1">
                            <Link
                                href="/"
                                className="px-4 py-2 text-sm font-medium text-[#0B1F3B] hover:bg-[#F5F2EA] rounded transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>

                            {/* Collapsible Topics */}
                            <div>
                                <button
                                    onClick={() => setIsMobileTopicsOpen(!isMobileTopicsOpen)}
                                    className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-[#0B1F3B] hover:bg-[#F5F2EA] rounded transition-colors"
                                >
                                    <span>Topics</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${isMobileTopicsOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isMobileTopicsOpen && (
                                    <div className="mt-1 space-y-1 pl-4 border-l-2 border-[#F5F2EA] ml-4">
                                        {pillarLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className="block px-4 py-2 text-sm text-[#0B1F3B] hover:bg-[#F5F2EA] rounded transition-colors"
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                    setIsMobileTopicsOpen(false);
                                                }}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/blog"
                                className="px-4 py-2 text-sm font-medium text-[#0B1F3B] hover:bg-[#F5F2EA] rounded transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                All Articles
                            </Link>

                            <Link
                                href="/authors"
                                className="px-4 py-2 text-sm font-medium text-[#0B1F3B] hover:bg-[#F5F2EA] rounded transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Authors
                            </Link>

                            <Link
                                href="/about"
                                className="px-4 py-2 text-sm font-medium text-[#0B1F3B] hover:bg-[#F5F2EA] rounded transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                        </nav>
                    </div>
                )}
            </Container>
        </header>
    );
};