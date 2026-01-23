import React from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export const BlogNewsletterSection: React.FC = () => {
    return (
        <Section background="gradient">
            <Container maxWidth="md">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-heading text-[#0B1F3B] mb-4">
                            Never Miss an Update
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Get our latest insights on compliance, practice management, and wealth management software delivered to your inbox.
                        </p>
                    </div>

                    <NewsletterForm variant="centered" source="Blog_CTA" />
                </div>
            </Container>
        </Section>
    );
};
