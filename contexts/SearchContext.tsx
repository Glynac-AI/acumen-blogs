'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { Article, Author, Category, Subcategory, Tag } from '@/types';

interface SearchContextValue {
    articles: Article[];
    authors: Author[];
    categories: Category[];
    subcategories: Subcategory[];
    tags: Tag[];
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

interface SearchProviderProps {
    children: ReactNode;
    articles: Article[];
    authors: Author[];
    categories: Category[];
    subcategories: Subcategory[];
    tags: Tag[];
}

export const SearchProvider: React.FC<SearchProviderProps> = ({
    children,
    articles,
    authors,
    categories,
    subcategories,
    tags,
}) => {
    return (
        <SearchContext.Provider value={{ articles, authors, categories, subcategories, tags }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};
