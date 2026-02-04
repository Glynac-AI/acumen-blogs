import React from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export const NewsletterSection: React.FC = () => {
    return (
        <Section background="white" className="pb-20 md:pb-24 lg:pb-28">
            <Container maxWidth="md">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-heading text-[#0B1F3B] mb-4">
                            Get Expert Insights Delivered
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Join wealth management professionals who rely on RegulateThis for sharp analysis,
                            regulatory updates, and actionable practice management strategies.
                        </p>
                    </div>

                    <NewsletterForm variant="centered" source="Homepage" />
                </div>
            </Container>
        </Section>
    );
};