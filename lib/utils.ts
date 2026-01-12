import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Category } from '@/types';
import { getCategoryBySlug } from '@/config/categories';

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

// Convert category to slug
export function categoryToSlug(category: Category): string {
    return category.slug;
}

// Convert URL slug to category
export function slugToCategory(slug: string): Category | null {
    return getCategoryBySlug(slug) || null;
}

// Legacy function names for backward compatibility (if needed)
export const pillarToSlug = categoryToSlug;
export const slugToPillar = slugToCategory;