import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Pillar } from '@/types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Pillar slug type
export type PillarSlug =
    | 'practice-management'
    | 'wealth-management-tech'
    | 'compliance-regulation';

// Convert pillar name to URL slug
export function pillarToSlug(pillar: Pillar): PillarSlug {
    const slugMap: Record<Pillar, PillarSlug> = {
        'Practice Management': 'practice-management',
        'Wealth Management Tech': 'wealth-management-tech',
        'Compliance & Regulation': 'compliance-regulation'
    };
    return slugMap[pillar];
}

// Convert URL slug to pillar name
export function slugToPillar(slug: string): Pillar | null {
    const pillarMap: Record<string, Pillar> = {
        'practice-management': 'Practice Management',
        'wealth-management-tech': 'Wealth Management Tech',
        'compliance-regulation': 'Compliance & Regulation'
    };
    return pillarMap[slug] || null;
}