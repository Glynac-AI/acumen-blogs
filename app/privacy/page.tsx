import React from 'react';
import { Container } from '@/components/ui/Container';

export default function PrivacyPage() {
    return (
        <>
            <section className="bg-white">
                <Container maxWidth="md">
                    <div className="py-16 md:py-20">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="h-px w-12 bg-[#49648C]"></div>
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                Legal
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-light text-[#0B1F3B] mb-8">
                            Privacy Policy
                        </h1>

                        <div className="prose prose-lg max-w-none space-y-8">
                            <p className="text-gray-600">
                                <strong>Last Updated:</strong> December 2024
                            </p>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">Introduction</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    RegulateThis ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">Information We Collect</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We collect information that you provide directly to us, including:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Email address when you subscribe to our newsletter</li>
                                    <li>Information you provide when contacting us</li>
                                    <li>Usage data and analytics through cookies and similar technologies</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">How We Use Your Information</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Send you our newsletter and updates (if you've subscribed)</li>
                                    <li>Respond to your inquiries and requests</li>
                                    <li>Improve our website and content</li>
                                    <li>Analyze website usage and trends</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">Information Sharing</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">Your Rights</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    You have the right to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Unsubscribe from our newsletter at any time</li>
                                    <li>Request access to your personal information</li>
                                    <li>Request correction or deletion of your personal information</li>
                                    <li>Object to processing of your personal information</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">Cookies</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">Contact Us</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    If you have any questions about this Privacy Policy, please contact us at privacy@regulatethis.com.
                                </p>
                            </section>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}