import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { useSearchContext } from '@/contexts/SearchContext';
import { Article, Author, Tag, Category, Subcategory } from '@/types';

export type SearchResultType = 'article' | 'author' | 'tag' | 'category' | 'subcategory';

export interface SearchResult {
    type: SearchResultType;
    item: Article | Author | Tag | Category | Subcategory;
    score?: number;
}

export function useSearch(query: string): SearchResult[] {
    const { articles, authors, categories, subcategories, tags } = useSearchContext();

    const results = useMemo(() => {
        if (!query || query.trim().length < 2) {
            return [];
        }

        const allResults: SearchResult[] = [];

        // Search Articles
        const articleFuse = new Fuse(articles, {
            keys: [
                { name: 'title', weight: 10 },
                { name: 'excerpt', weight: 5 },
                { name: 'subtitle', weight: 4 },
                { name: 'author.name', weight: 3 },
                { name: 'category.name', weight: 2 },
            ],
            threshold: 0.4,
            includeScore: true,
        });

        const articleResults = articleFuse.search(query);
        articleResults.forEach(result => {
            allResults.push({
                type: 'article',
                item: result.item,
                score: result.score,
            });
        });

        // Search Authors
        const authorFuse = new Fuse(authors, {
            keys: [
                { name: 'name', weight: 10 },
                { name: 'title', weight: 5 },
                { name: 'bio', weight: 2 },
            ],
            threshold: 0.4,
            includeScore: true,
        });

        const authorResults = authorFuse.search(query);
        authorResults.forEach(result => {
            allResults.push({
                type: 'author',
                item: result.item,
                score: result.score,
            });
        });

        // Search Tags
        const tagFuse = new Fuse(tags, {
            keys: ['name'],
            threshold: 0.3,
            includeScore: true,
        });

        const tagResults = tagFuse.search(query);
        tagResults.forEach(result => {
            allResults.push({
                type: 'tag',
                item: result.item,
                score: result.score,
            });
        });

        // Search Categories
        const categoryFuse = new Fuse(categories, {
            keys: [
                { name: 'name', weight: 10 },
                { name: 'subtitle', weight: 5 },
                { name: 'description', weight: 2 },
            ],
            threshold: 0.4,
            includeScore: true,
        });

        const categoryResults = categoryFuse.search(query);
        categoryResults.forEach(result => {
            allResults.push({
                type: 'category',
                item: result.item,
                score: result.score,
            });
        });

        // Search Subcategories
        const subcategoryFuse = new Fuse(subcategories, {
            keys: [
                { name: 'name', weight: 10 },
                { name: 'description', weight: 5 },
            ],
            threshold: 0.4,
            includeScore: true,
        });

        const subcategoryResults = subcategoryFuse.search(query);
        subcategoryResults.forEach(result => {
            allResults.push({
                type: 'subcategory',
                item: result.item,
                score: result.score,
            });
        });

        // Sort all results by score (lower is better in Fuse.js)
        return allResults.sort((a, b) => (a.score || 0) - (b.score || 0));
    }, [query, articles, authors, categories, subcategories, tags]);

    return results;
}