'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SearchDropdown } from '@/components/search/SearchDropdown';
import type { Category, Subcategory } from '@/types';

interface HeaderProps {
    categories: Category[];
    subcategories: Subcategory[];
}

export const Header: React.FC<HeaderProps> = ({ categories, subcategories }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Helper function to get subcategories for a category
    const getSubcategoriesForCategory = (categoryId: string) => {
        return subcategories.filter(sub => sub.categoryId === categoryId);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
            <Container>
                <div className="flex items-center justify-between h-16">
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

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex items-center justify-between flex-1 ml-8">
                        {/* Category Dropdowns - Left Side */}
                        <div className="flex items-center space-x-1">
                            {categories.map((category) => {
                                const categorySubcategories = getSubcategoriesForCategory(category.id);

                                return (
                                    <div key={category.id} className="relative group">
                                        <button className="px-3 py-2 text-sm font-medium text-[#0B1F3B] hover:text-[#49648C] transition-colors flex items-center whitespace-nowrap">
                                            {category.name}
                                            <svg
                                                className="ml-1 w-3 h-3"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>

                                        {/* Dropdown Menu */}
                                        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                            <div className="py-1">
                                                {/* View All Category Link */}
                                                <Link
                                                    href={`/categories/${category.slug}`}
                                                    className="block px-4 py-2 text-sm font-semibold text-[#0B1F3B] hover:bg-[#F5F2EA] transition-colors border-b border-gray-100"
                                                >
                                                    View All
                                                </Link>

                                                {/* Subcategories */}
                                                <div className="max-h-80 overflow-y-auto">
                                                    {categorySubcategories.map((subcategory) => (
                                                        <Link
                                                            key={subcategory.id}
                                                            href={`/subcategories/${subcategory.slug}`}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F5F2EA] hover:text-[#49648C] transition-colors"
                                                        >
                                                            {subcategory.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right Side Navigation */}
                        <div className="flex items-center space-x-1">
                            {/* Resources Dropdown */}
                            <div className="relative group">
                                <button className="px-3 py-2 text-sm font-medium text-[#0B1F3B] hover:text-[#49648C] transition-colors flex items-center">
                                    Resources
                                    <svg
                                        className="ml-1 w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Resources Dropdown Menu */}
                                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="py-1">
                                        <Link
                                            href="/authors"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F5F2EA] hover:text-[#49648C] transition-colors"
                                        >
                                            Authors
                                        </Link>
                                        <Link
                                            href="/webinars"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F5F2EA] hover:text-[#49648C] transition-colors"
                                        >
                                            Webinars
                                        </Link>
                                        <Link
                                            href="/events"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F5F2EA] hover:text-[#49648C] transition-colors"
                                        >
                                            Events
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/about"
                                className="px-3 py-2 text-sm font-medium text-[#0B1F3B] hover:text-[#49648C] transition-colors"
                            >
                                About Us
                            </Link>

                            {/* Search Button - Desktop */}
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="ml-2 p-2 text-[#0B1F3B] hover:text-[#49648C] hover:bg-gray-100 rounded-md transition-colors"
                                aria-label="Search"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </nav>

                    {/* Mobile: Search + Menu Buttons */}
                    <div className="xl:hidden flex items-center space-x-2">
                        {/* Search Button - Mobile */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 text-[#0B1F3B] hover:bg-gray-100 rounded"
                            aria-label="Search"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="p-2 text-[#0B1F3B] hover:bg-gray-100 rounded"
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

                {/* Search Dropdown Panel - Shows below header */}
                {isSearchOpen && (
                    <div className="py-4 border-t border-gray-100 bg-white animate-in slide-in-from-top-2">
                        <SearchDropdown />
                    </div>
                )}

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="xl:hidden py-4 border-t border-gray-200">
                        <nav className="flex flex-col space-y-1">
                            {/* Home Link */}
                            <Link
                                href="/"
                                className="px-3 py-2 text-sm font-medium text-[#0B1F3B] hover:bg-[#F5F2EA] rounded transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>

                            {/* Categories Section */}
                            <div className="pt-2 pb-1 px-3">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Categories
                                </span>
                            </div>

                            {/* Mobile Category Accordions */}
                            {categories.map((category) => {
                                const categorySubcategories = getSubcategoriesForCategory(category.id);
                                const isOpen = mobileOpenCategory === category.id;

                                return (
                                    <div key={category.id}>
                                        {/* Category Toggle */}
                                        <button
                                            onClick={() => setMobileOpenCategory(isOpen ? null : category.id)}
                                            className="w-full px-3 py-2 text-sm font-medium text-[#0B1F3B] hover:bg-[#F5F2EA] rounded transition-colors flex items-center justify-between"
                                        >
                                            <span className="text-left">{category.name}</span>
                                            <svg
                                                className={`w-4 h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>

                                        {/* Subcategories (Collapsible) */}
                                        {isOpen && (
                                            <div className="pl-3">
                                                {/* View All Link */}
                                                <Link
                                                    href={`/categories/${category.slug}`}
                                                    className="block px-3 py-2 text-sm font-semibold text-[#49648C] hover:bg-[#F5F2EA] rounded transition-colors"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    View All
                                                </Link>

                                                {/* Subcategories */}
                                                {categorySubcategories.map((subcategory) => (
                                                    <Link
                                                        key={subcategory.id}
                                                        href={`/subcategories/${subcategory.slug}`}
                                                        className="block px-3 py-2 pl-6 text-sm text-gray-700 hover:bg-[#F5F2EA] rounded transition-colors"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {subcategory.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Right Side Navigation - Mobile */}
                            <div className="pt-3 border-t border-gray-200 mt-2">
                                {/* Resources Section */}
                                <div className="pt-2 pb-1 px-3">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Resources
                                    </span>
                                </div>

                                <Link
                                    href="/authors"
                                    className="block px-3 py-2 pl-6 text-sm text-[#0B1F3B] hover:bg-[#F5F2EA] rounded transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Authors
                                </Link>

                                <Link
                                    href="/webinars"
                                    className="block px-3 py-2 pl-6 text-sm text-[#0B1F3B] hover:bg-[#F5F2EA] rounded transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Webinars
                                </Link>

                                <Link
                                    href="/events"
                                    className="block px-3 py-2 pl-6 text-sm text-[#0B1F3B] hover:bg-[#F5F2EA] rounded transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Events
                                </Link>

                                {/* About Us */}
                                <div className="pt-3 border-t border-gray-200 mt-2">
                                    <Link
                                        href="/about"
                                        className="block px-3 py-2 text-sm font-medium text-[#0B1F3B] hover:bg-[#F5F2EA] rounded transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        About Us
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                )}
            </Container>
        </header>
    );
};