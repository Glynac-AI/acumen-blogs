// config/subcategories.ts 

import { Subcategory } from '@/types';

export const SUBCATEGORIES: Subcategory[] = [
    // Practice Management Subcategories
    {
        id: 'pm-1',
        name: 'Firm Growth',
        slug: 'firm-growth',
        description: 'Strategies for scaling your practice and expanding your client base',
        categoryId: '1' // Practice Management
    },
    {
        id: 'pm-2',
        name: 'Succession Planning',
        slug: 'succession-planning',
        description: 'Planning for transitions, exits, and business continuity',
        categoryId: '1'
    },
    {
        id: 'pm-3',
        name: 'Compensation Models',
        slug: 'compensation-models',
        description: 'How to structure pay, incentives, and equity in your firm',
        categoryId: '1'
    },
    {
        id: 'pm-4',
        name: 'Client Segmentation',
        slug: 'client-segmentation',
        description: 'Organizing your practice by client needs and profitability',
        categoryId: '1'
    },
    {
        id: 'pm-5',
        name: 'Talent Management',
        slug: 'talent-management',
        description: 'Recruiting, retaining, and developing your team',
        categoryId: '1'
    },
    {
        id: 'pm-6',
        name: 'Operations & Workflow',
        slug: 'operations-workflow',
        description: 'Streamlining processes and improving efficiency',
        categoryId: '1'
    },

    // Wealth Management Software Subcategories
    {
        id: 'wms-1',
        name: 'CRM Systems',
        slug: 'crm-systems',
        description: 'Client relationship management platforms and best practices',
        categoryId: '2' // Wealth Management Software
    },
    {
        id: 'wms-2',
        name: 'Portfolio Management',
        slug: 'portfolio-management',
        description: 'Tools for managing and optimizing client portfolios',
        categoryId: '2'
    },
    {
        id: 'wms-3',
        name: 'Integration & Data',
        slug: 'integration-data',
        description: 'Connecting systems and managing data across platforms',
        categoryId: '2'
    },
    {
        id: 'wms-4',
        name: 'Reporting Tools',
        slug: 'reporting-tools',
        description: 'Client reporting and performance visualization software',
        categoryId: '2'
    },
    {
        id: 'wms-5',
        name: 'Financial Planning Software',
        slug: 'financial-planning-software',
        description: 'Tools for financial planning, projections, and scenarios',
        categoryId: '2'
    },
    {
        id: 'wms-6',
        name: 'Cybersecurity',
        slug: 'cybersecurity',
        description: 'Protecting client data and your technology infrastructure',
        categoryId: '2'
    },
    {
        id: 'wms-7',
        name: 'Automation & AI',
        slug: 'automation-ai',
        description: 'Leveraging automation and AI for efficiency',
        categoryId: '2'
    },

    // Compliance & Regulation Subcategories
    {
        id: 'cr-1',
        name: 'SEC Examinations',
        slug: 'sec-examinations',
        description: 'Preparing for and responding to SEC audits',
        categoryId: '3' // Compliance & Regulation
    },
    {
        id: 'cr-2',
        name: 'Marketing Rule',
        slug: 'marketing-rule',
        description: 'Advertising, testimonials, and marketing compliance',
        categoryId: '3'
    },
    {
        id: 'cr-3',
        name: 'Documentation & Recordkeeping',
        slug: 'documentation-recordkeeping',
        description: 'Required documentation and record retention policies',
        categoryId: '3'
    },
    {
        id: 'cr-4',
        name: 'Risk Management',
        slug: 'risk-management',
        description: 'Identifying and mitigating compliance risks',
        categoryId: '3'
    },
    {
        id: 'cr-5',
        name: 'Fiduciary Standards',
        slug: 'fiduciary-standards',
        description: 'Meeting your fiduciary obligations to clients',
        categoryId: '3'
    },
    {
        id: 'cr-6',
        name: 'Privacy & Data Security',
        slug: 'privacy-data-security',
        description: 'Client privacy requirements and data protection',
        categoryId: '3'
    },
    {
        id: 'cr-7',
        name: 'State Regulations',
        slug: 'state-regulations',
        description: 'State-level compliance requirements and changes',
        categoryId: '3'
    }
];

// Helper functions
export function getSubcategoryBySlug(slug: string): Subcategory | undefined {
    return SUBCATEGORIES.find(sub => sub.slug === slug);
}

export function getSubcategoryById(id: string): Subcategory | undefined {
    return SUBCATEGORIES.find(sub => sub.id === id);
}

export function getSubcategoriesByCategoryId(categoryId: string): Subcategory[] {
    return SUBCATEGORIES.filter(sub => sub.categoryId === categoryId);
}

export function getSubcategoriesByCategorySlug(categorySlug: string): Subcategory[] {
    // Import getCategoryBySlug from categories config when needed
    // For now, you can implement this by:
    // const category = getCategoryBySlug(categorySlug);
    // return category ? getSubcategoriesByCategoryId(category.id) : [];
    return [];
}

export function getAllSubcategoryNames(): string[] {
    return SUBCATEGORIES.map(sub => sub.name);
}

export function getAllSubcategorySlugs(): string[] {
    return SUBCATEGORIES.map(sub => sub.slug);
}