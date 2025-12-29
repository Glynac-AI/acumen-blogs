import React from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export const NewsletterSection: React.FC = () => {
    return (
        <Section background="gradient">
            <Container maxWidth="md">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
                    <h3 className="text-3xl md:text-4xl font-light text-[#0B1F3B] mb-4">
                        Get Insights Worth Reading
                    </h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                        Sharp analysis delivered when we have something worth saying. No filler, no fluff.
                    </p>
                    <NewsletterForm variant="centered" />
                </div>
            </Container>
        </Section>
    );
};