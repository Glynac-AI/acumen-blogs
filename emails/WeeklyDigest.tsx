import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Hr,
} from '@react-email/components';
import { Article } from '@/types';

interface WeeklyDigestEmailProps {
    articles: Article[];
    previewText?: string;
}

export default function WeeklyDigestEmail({
    articles,
    previewText = 'Your weekly digest of compliance, practice management, and wealth management insights',
}: WeeklyDigestEmailProps) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://regulatethis.com';
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header with Logo */}
                    <Section style={header}>
                        <Heading style={headerLogo}>
                            RegulateThis
                        </Heading>
                    </Section>

                    {/* Hero Section */}
                    <Section style={heroSection}>
                        <Heading style={heroHeading}>
                            Weekly Insights for RIA Professionals
                        </Heading>
                        <Text style={heroSubtext}>
                            {currentDate} • {articles.length} {articles.length === 1 ? 'Article' : 'Articles'} This Week
                        </Text>
                    </Section>

                    {/* Introduction */}
                    <Section style={contentSection}>
                        <Text style={introText}>
                            Stay ahead with the latest insights on regulatory compliance, practice management best practices, and wealth management technology.
                        </Text>
                    </Section>

                    {/* Articles */}
                    {articles.map((article, index) => (
                        <Section key={article.id} style={articleSection}>
                            {/* Article Image */}
                            {article.featuredImage && (
                                <Link href={`${baseUrl}/blog/${article.slug}?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_digest`}>
                                    <Img
                                        src={article.featuredImage}
                                        alt={article.title}
                                        width="100%"
                                        height="auto"
                                        style={articleImage}
                                    />
                                </Link>
                            )}

                            {/* Category Badge */}
                            <Text style={categoryBadge}>
                                {article.category.name}
                            </Text>

                            {/* Article Title */}
                            <Heading style={articleTitle}>
                                <Link
                                    href={`${baseUrl}/blog/${article.slug}?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_digest`}
                                    style={articleTitleLink}
                                >
                                    {article.title}
                                </Link>
                            </Heading>

                            {/* Article Subtitle */}
                            {article.subtitle && (
                                <Text style={articleSubtitle}>
                                    {article.subtitle}
                                </Text>
                            )}

                            {/* Article Excerpt */}
                            <Text style={articleExcerpt}>
                                {article.excerpt}
                            </Text>

                            {/* Article Meta */}
                            <Text style={articleMeta}>
                                By {article.author.name} • {article.readTime} min read
                            </Text>

                            {/* Read More Button */}
                            <Section style={buttonContainer}>
                                <Link
                                    href={`${baseUrl}/blog/${article.slug}?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_digest`}
                                    style={button}
                                >
                                    Read Full Article
                                </Link>
                            </Section>

                            {/* Divider between articles */}
                            {index < articles.length - 1 && <Hr style={divider} />}
                        </Section>
                    ))}

                    {/* Call to Action */}
                    <Section style={ctaSection}>
                        <Text style={ctaText}>
                            Want more insights? Explore our full library of articles on compliance, practice management, and wealth management technology.
                        </Text>
                        <Section style={buttonContainer}>
                            <Link
                                href={`${baseUrl}/blog?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_digest`}
                                style={secondaryButton}
                            >
                                Browse All Articles
                            </Link>
                        </Section>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Hr style={footerDivider} />

                        {/* Social Links */}
                        <Section style={socialSection}>
                            <Link href="https://twitter.com/regulatethis" style={socialLink}>
                                Twitter
                            </Link>
                            <Text style={socialDivider}>•</Text>
                            <Link href="https://linkedin.com/company/regulatethis" style={socialLink}>
                                LinkedIn
                            </Link>
                        </Section>

                        {/* Footer Text */}
                        <Text style={footerText}>
                            You&apos;re receiving this email because you subscribed to RegulateThis newsletter.
                        </Text>

                        <Text style={footerText}>
                            <Link href={`${baseUrl}/unsubscribe?utm_source=newsletter&utm_medium=email`} style={footerLink}>
                                Unsubscribe
                            </Link>
                            {' • '}
                            <Link href={`${baseUrl}/privacy`} style={footerLink}>
                                Privacy Policy
                            </Link>
                            {' • '}
                            <Link href={`${baseUrl}/`} style={footerLink}>
                                Visit Website
                            </Link>
                        </Text>

                        {/* Address & Disclaimer */}
                        <Text style={disclaimerText}>
                            RegulateThis • 123 Main Street, Suite 100, New York, NY 10001
                        </Text>

                        <Text style={disclaimerText}>
                            This newsletter is for informational purposes only and does not constitute investment, legal, or compliance advice. Always consult with qualified professionals before making business or financial decisions.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

// Styles
const main = {
    backgroundColor: '#F5F2EA',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '0',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
};

const header = {
    backgroundColor: '#0B1F3B',
    padding: '32px 24px',
    textAlign: 'center' as const,
};

const headerLogo = {
    margin: '0',
    fontSize: '32px',
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'Georgia, "Times New Roman", serif',
    letterSpacing: '-0.5px',
};

const heroSection = {
    backgroundColor: '#F5F2EA',
    padding: '40px 24px',
    textAlign: 'center' as const,
};

const heroHeading = {
    margin: '0 0 8px 0',
    fontSize: '32px',
    lineHeight: '38px',
    fontWeight: '700',
    color: '#0B1F3B',
    fontFamily: 'Georgia, "Times New Roman", serif',
};

const heroSubtext = {
    margin: '0',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#666666',
    fontWeight: '500',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
};

const contentSection = {
    padding: '32px 24px 16px',
};

const introText = {
    margin: '0',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#333333',
};

const articleSection = {
    padding: '24px 24px 32px',
};

const articleImage = {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '16px',
};

const categoryBadge = {
    display: 'inline-block',
    margin: '0 0 12px 0',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#49648C',
    backgroundColor: '#E8EDF4',
    borderRadius: '4px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
};

const articleTitle = {
    margin: '0 0 8px 0',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '700',
    color: '#0B1F3B',
    fontFamily: 'Georgia, "Times New Roman", serif',
};

const articleTitleLink = {
    color: '#0B1F3B',
    textDecoration: 'none',
};

const articleSubtitle = {
    margin: '0 0 12px 0',
    fontSize: '18px',
    lineHeight: '26px',
    color: '#49648C',
    fontWeight: '500',
};

const articleExcerpt = {
    margin: '0 0 12px 0',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#555555',
};

const articleMeta = {
    margin: '0 0 20px 0',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#888888',
};

const buttonContainer = {
    textAlign: 'center' as const,
    margin: '24px 0',
};

const button = {
    display: 'inline-block',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#0B1F3B',
    borderRadius: '6px',
    textDecoration: 'none',
    textAlign: 'center' as const,
};

const secondaryButton = {
    display: 'inline-block',
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#0B1F3B',
    backgroundColor: '#F5F2EA',
    border: '2px solid #0B1F3B',
    borderRadius: '6px',
    textDecoration: 'none',
    textAlign: 'center' as const,
};

const divider = {
    margin: '32px 0',
    borderTop: '1px solid #E5E5E5',
    borderBottom: 'none',
};

const ctaSection = {
    backgroundColor: '#F5F2EA',
    padding: '32px 24px',
    textAlign: 'center' as const,
};

const ctaText = {
    margin: '0 0 20px 0',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#333333',
};

const footer = {
    padding: '32px 24px',
    backgroundColor: '#FAFAFA',
};

const footerDivider = {
    margin: '0 0 24px 0',
    borderTop: '1px solid #E5E5E5',
    borderBottom: 'none',
};

const socialSection = {
    textAlign: 'center' as const,
    marginBottom: '20px',
};

const socialLink = {
    display: 'inline-block',
    fontSize: '14px',
    color: '#49648C',
    textDecoration: 'none',
    fontWeight: '600',
};

const socialDivider = {
    display: 'inline-block',
    margin: '0 12px',
    color: '#CCCCCC',
};

const footerText = {
    margin: '0 0 12px 0',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#666666',
    textAlign: 'center' as const,
};

const footerLink = {
    color: '#49648C',
    textDecoration: 'underline',
};

const disclaimerText = {
    margin: '12px 0 0 0',
    fontSize: '12px',
    lineHeight: '18px',
    color: '#888888',
    textAlign: 'center' as const,
};
