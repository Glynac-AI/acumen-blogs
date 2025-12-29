import { Author, Article, Tag, Pillar } from '@/types';

export const mockAuthors: Author[] = [
    {
        id: '1',
        name: 'Sarah Mitchell',
        title: 'Chief Compliance Officer',
        bio: 'Sarah has over 15 years of experience in regulatory compliance and has helped hundreds of RIAs navigate complex SEC requirements.',
        photo: 'https://placehold.co/400x400/49648C/FFFFFF?text=SM',
        linkedin: 'https://linkedin.com/in/sarahmitchell',
        email: 'sarah@regulatethis.com',
    },
    {
        id: '2',
        name: 'David Chen',
        title: 'Technology Strategy Director',
        bio: 'David specializes in helping wealth management firms leverage technology for operational efficiency and better client outcomes.',
        photo: 'https://placehold.co/400x400/49648C/FFFFFF?text=DC',
        linkedin: 'https://linkedin.com/in/davidchen',
        email: 'david@regulatethis.com',
    },
    {
        id: '3',
        name: 'Emily Rodriguez',
        title: 'Practice Management Consultant',
        bio: 'Emily works with RIA owners to scale their practices while maintaining exceptional client service and team culture.',
        photo: 'https://placehold.co/400x400/49648C/FFFFFF?text=ER',
        linkedin: 'https://linkedin.com/in/emilyrodriguez',
        email: 'emily@regulatethis.com',
    },
];

export const mockTags: Tag[] = [
    { id: '1', name: 'Portfolio Management', slug: 'portfolio-management' },
    { id: '2', name: 'SEC Examinations', slug: 'sec-examinations' },
    { id: '3', name: 'CRM Systems', slug: 'crm-systems' },
    { id: '4', name: 'Firm Growth', slug: 'firm-growth' },
    { id: '5', name: 'Marketing Rule', slug: 'marketing-rule' },
    { id: '6', name: 'Cybersecurity', slug: 'cybersecurity' },
    { id: '7', name: 'Client Segmentation', slug: 'client-segmentation' },
    { id: '8', name: 'Succession Planning', slug: 'succession-planning' },
    { id: '9', name: 'Compensation Models', slug: 'compensation-models' },
    { id: '10', name: 'Integration', slug: 'integration' },
];

export const mockArticles: Article[] = [
    {
        id: '1',
        title: 'The 2025 SEC Examination Priorities: What Actually Matters',
        subtitle: 'Cutting through regulatory noise to focus on what examiners care about',
        slug: '2025-sec-examination-priorities',
        content: 'Full article content here...',
        excerpt: `The SEC released its examination priorities for 2025. We break down what actually matters for your compliance program versus what's just noise.`,
        pillar: 'Compliance & Regulation',
        tags: [mockTags[1], mockTags[4]],
        author: mockAuthors[0],
        featuredImage: 'https://placehold.co/1200x600/0B1F3B/FFFFFF?text=SEC+Priorities',
        publishDate: '2024-12-20',
        readTime: 8,
        isFeatured: true,
    },
    {
        id: '2',
        title: 'CRM Platforms Compared: What Advisors Actually Use',
        subtitle: 'Real adoption data from 200+ firms',
        slug: 'crm-platforms-compared',
        content: 'Full article content here...',
        excerpt: 'Every CRM vendor claims high adoption rates. We surveyed 200+ firms to see what advisors actually use daily and what sits ignored.',
        pillar: 'Wealth Management Tech',
        tags: [mockTags[2], mockTags[9]],
        author: mockAuthors[1],
        featuredImage: 'https://placehold.co/1200x600/0B1F3B/FFFFFF?text=CRM+Analysis',
        publishDate: '2024-12-18',
        readTime: 10,
    },
    {
        id: '3',
        title: 'What Breaks First When Your AUM Doubles',
        subtitle: 'The operational bottlenecks no one warns you about',
        slug: 'what-breaks-when-aum-doubles',
        content: 'Full article content here...',
        excerpt: `Growth creates good problems. Here's what breaks first in firms that scale from $500M to $1B+ and how to prepare before it happens.`,
        pillar: 'Practice Management',
    tags: [mockTags[3], mockTags[6]],
    author: mockAuthors[2],
    featuredImage: 'https://placehold.co/1200x600/0B1F3B/FFFFFF?text=Scaling+Operations',
    publishDate: '2024-12-15',
    readTime: 12,
    },
{
    id: '4',
        title: 'The Marketing Rule Two Years Later: What Changed',
            subtitle: 'Implementation reality versus regulatory expectations',
                slug: 'marketing-rule-two-years-later',
                    content: 'Full article content here...',
                        excerpt: 'Two years after the SEC marketing rule changes, we look at how firms actually adapted versus what regulators expected.',
                            pillar: 'Compliance & Regulation',
                                tags: [mockTags[4]],
                                    author: mockAuthors[0],
                                        featuredImage: 'https://placehold.co/1200x600/0B1F3B/FFFFFF?text=Marketing+Rule',
                                            publishDate: '2024-12-12',
                                                readTime: 9,
    },
{
    id: '5',
        title: 'Portfolio Management Platforms: Beyond the Demos',
            subtitle: `What they don't show you in sales presentations`,
    slug: 'portfolio-platforms-beyond-demos',
        content: 'Full article content here...',
            excerpt: `Sales demos look great. Implementation is different. Here's what portfolio management platforms don't tell you upfront.`,
                pillar: 'Wealth Management Tech',
                    tags: [mockTags[0], mockTags[9]],
                        author: mockAuthors[1],
                            featuredImage: 'https://placehold.co/1200x600/0B1F3B/FFFFFF?text=Portfolio+Tech',
                                publishDate: '2024-12-10',
                                    readTime: 15,
    },
{
    id: '6',
        title: 'Compensation Structures That Actually Work',
            subtitle: 'Aligning advisor incentives with firm growth',
                slug: 'compensation-structures-that-work',
                    content: 'Full article content here...',
                        excerpt: `Most compensation plans create the wrong incentives. Here's how top firms structure pay to drive the behavior they actually want.`,
    pillar: 'Practice Management',
        tags: [mockTags[8], mockTags[3]],
            author: mockAuthors[2],
                featuredImage: 'https://placehold.co/1200x600.png?text=Compensation',
                    publishDate: '2024-12-08',
                        readTime: 11,
    },
{
    id: '7',
        title: 'Cybersecurity Requirements: What You Actually Need',
            subtitle: 'Separating compliance theater from real security',
                slug: 'cybersecurity-requirements-reality',
                    content: 'Full article content here...',
                        excerpt: `Not all cybersecurity measures are created equal. Here's what actually protects your firm versus what just checks compliance boxes.`,
    pillar: 'Compliance & Regulation',
        tags: [mockTags[5]],
            author: mockAuthors[0],
                featuredImage: 'https://placehold.co/1200x600.png?text=Cybersecurity',
                    publishDate: '2024-12-05',
                        readTime: 10,
    },
{
    id: '8',
        title: 'Integration Nightmares and How Firms Solve Them',
            subtitle: `When your tech stack doesn't talk to itself`,
    slug: 'integration-nightmares',
        content: 'Full article content here...',
            excerpt: `Every vendor promises seamless integration. Reality is messier. Here's how successful firms handle the gaps.`,
    pillar: 'Wealth Management Tech',
        tags: [mockTags[9], mockTags[2]],
            author: mockAuthors[1],
                featuredImage: 'https://placehold.co/1200x600.png?text=Integration',
                    publishDate: '2024-12-03',
                        readTime: 13,
    },
{
    id: '9',
        title: 'Client Segmentation That Drives Profitability',
            subtitle: 'Moving beyond AUM tiers',
                slug: 'client-segmentation-profitability',
                    content: 'Full article content here...',
                        excerpt: `Most firms segment by AUM. The most profitable firms use different criteria. Here's what they look at instead.`,
    pillar: 'Practice Management',
        tags: [mockTags[6]],
            author: mockAuthors[2],
                featuredImage: 'https://placehold.co/1200x600.png?text=Segmentation',
                    publishDate: '2024-12-01',
                        readTime: 9,
    },
{
    id: '10',
        title: 'SEC Advertising Rule: The Parts Everyone Gets Wrong',
            subtitle: 'Common misinterpretations and their consequences',
                slug: 'sec-advertising-rule-mistakes',
                    content: 'Full article content here...',
                        excerpt: 'Three years in, firms still misinterpret key parts of the advertising rule. Here are the mistakes that trigger examiner attention.',
                            pillar: 'Compliance & Regulation',
                                tags: [mockTags[4], mockTags[1]],
                                    author: mockAuthors[0],
                                        featuredImage: 'https://placehold.co/1200x600.png?text=Advertising+Rule',
                                            publishDate: '2024-11-28',
                                                readTime: 8,
    },
{
    id: '11',
        title: 'Reporting Tools Clients Actually Read',
            subtitle: 'Performance reports versus performance theater',
                slug: 'reporting-tools-clients-read',
                    content: 'Full article content here...',
                        excerpt: `Beautiful reports don't matter if clients ignore them.Here's what makes clients engage with performance reporting.`,
                            pillar: 'Wealth Management Tech',
                                tags: [mockTags[0]],
                                    author: mockAuthors[1],
                                        featuredImage: 'https://placehold.co/1200x600.png?text=Reporting',
                                            publishDate: '2024-11-25',
                                                readTime: 7,
    },
{
    id: '12',
        title: 'Succession Planning: Starting the Conversation',
            subtitle: 'What advisors avoid and why it matters',
                slug: 'succession-planning-conversation',
                    content: 'Full article content here...',
                        excerpt: `Most advisors delay succession planning until it's too late.Here's how to start the conversation before crisis forces it.`,
                            pillar: 'Practice Management',
                                tags: [mockTags[7]],
                                    author: mockAuthors[2],
                                        featuredImage: 'https://placehold.co/1200x600.png?text=Succession',
                                            publishDate: '2024-11-22',
                                                readTime: 12,
    },
];

// Helper functions
export const getFeaturedArticle = (): Article | undefined => {
    return mockArticles.find(article => article.isFeatured);
};

export const getRecentArticles = (limit: number = 9): Article[] => {
    return mockArticles
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        .slice(0, limit);
};

export const getArticlesByPillar = (pillar: Pillar): Article[] => {
    return mockArticles.filter(article => article.pillar === pillar);
};

export const getFeaturedArticlesByPillar = (): Article[] => {
    const pillars: Pillar[] = ['Practice Management', 'Wealth Management Tech', 'Compliance & Regulation'];
    return pillars
        .map(pillar => mockArticles.find(article => article.pillar === pillar))
        .filter((article): article is Article => article !== undefined);
};