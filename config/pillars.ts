import { Pillar } from "@/types";


export const PILLARS: Pillar[] = [
    {
        id: '1',
        name: 'Practice Management',
        slug: 'practice-management',
        subtitle: 'Building Firms That Work',
        description: 'Growth creates problems. Good problems, but problems nonetheless. Our practice management coverage digs into compensation structures, talent acquisition, client segmentation, and the operational decisions that separate thriving firms from struggling ones.',
        details: [
            'Succession & Transition — Planning exits, buying books, and everything in between',
            'Scaling Operations — What breaks first when your AUM doubles',
            'Client Experience — Retention starts long before the annual review'
        ],
        order: 1
    },
    {
        id: '2',
        name: 'Wealth Management Tech',
        slug: 'wealth-management-tech',
        subtitle: 'Cutting Through the Noise',
        description: 'Every new app claims to be the solution. We test those claims against reality — focusing on what actually improves client outcomes and firm efficiency, and calling it out when something falls short of the hype.',
        details: [
            'Portfolio management platforms compared head-to-head',
            'CRM solutions that advisors actually use',
            'Reporting tools clients appreciate',
            'Integration challenges and how firms solve them',
            'Security considerations that matter now'
        ],
        order: 2
    },
    {
        id: '3',
        name: 'Compliance & Regulation',
        slug: 'compliance-regulation',
        subtitle: 'Keeping You Ahead of the Curve',
        description: 'Regulatory shifts rarely arrive with clear instructions. We track SEC guidance, state-level changes, and industry standards — then translate what it means for your policies, disclosures, and daily operations.',
        details: [
            'Marketing Rule Developments — Advertising, testimonials, and social media guidance',
            'Examination Priorities — Where regulators are focusing their attention',
            'Cybersecurity Standards — Requirements keep evolving. So should your approach'
        ],
        order: 3
    }
];

// Keep helper functions, just update to use objects
export function getPillarBySlug(slug: string): Pillar | undefined {
    return PILLARS.find(pillar => pillar.slug === slug);
}

export function getPillarByName(name: string): Pillar | undefined {
    return PILLARS.find(pillar => pillar.name === name);
}

export function getAllPillarNames(): string[] {
    return PILLARS.map(pillar => pillar.name);
}

export function getAllPillarSlugs(): string[] {
    return PILLARS.map(pillar => pillar.slug);
}