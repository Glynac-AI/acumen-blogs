import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Pillar } from '@/types';
import { getPillarBySlug } from '@/config/pillars';

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


export function pillarToSlug(pillar: Pillar): string {
    return pillar.slug; 
}

// Convert URL slug to pillar name
export function slugToPillar(slug: string): Pillar | null {
    return getPillarBySlug(slug) || null;
}