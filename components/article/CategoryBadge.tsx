import React from 'react';
import { Category } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
    category: Category;
    className?: string;
    variant?: 'light' | 'dark';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className, variant = 'light' }) => {
    return (
        <span
            className={cn(
                'text-xs font-medium tracking-[0.2em] uppercase',
                variant === 'dark' ? 'text-white/70' : 'text-[#49648C]',
                className
            )}
        >
            {category.name}
        </span>
    );
};