import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { mockArticles, mockAuthors, mockTags } from '@/lib/mock-data';
import { PILLARS } from '@/config/pillars';
import { Article, Author, Tag } from '@/types';
import { PillarConfig } from '@/config/pillars';

export type SearchResultType = 'article' | 'author' | 'tag' | 'pillar';

export interface SearchResult {
    type: SearchResultType;
    item: Article | Author | Tag | PillarConfig;
    score?: number;
}

export function useSearch(query: string): SearchResult[] {
    const results = useMemo(() => {
        if (!query || query.trim().length < 2) {
            return [];
        }

        const allResults: SearchResult[] = [];

        // Search Articles
        const articleFuse = new Fuse(mockArticles, {
            keys: [
                { name: 'title', weight: 10 },
                { name: 'excerpt', weight: 5 },
                { name: 'subtitle', weight: 4 },
                { name: 'author.name', weight: 3 },
                { name: 'pillar.name', weight: 2 },
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
        const authorFuse = new Fuse(mockAuthors, {
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
        const tagFuse = new Fuse(mockTags, {
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

        // Search Pillars
        const pillarFuse = new Fuse(PILLARS, {
            keys: [
                { name: 'name', weight: 10 },
                { name: 'subtitle', weight: 5 },
                { name: 'description', weight: 2 },
            ],
            threshold: 0.4,
            includeScore: true,
        });

        const pillarResults = pillarFuse.search(query);
        pillarResults.forEach(result => {
            allResults.push({
                type: 'pillar',
                item: result.item,
                score: result.score,
            });
        });

        // Sort all results by score (lower is better in Fuse.js)
        return allResults.sort((a, b) => (a.score || 0) - (b.score || 0));
    }, [query]);

    return results;
}