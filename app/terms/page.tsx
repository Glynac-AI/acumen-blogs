import React from 'react';
import { Container } from '@/components/ui/Container';

export default function TermsPage() {
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
                            Terms of Use
                        </h1>

                        <div className="prose prose-lg max-w-none space-y-8">
                            <p className="text-gray-600">
                                <strong>Last Updated:</strong> December 2024
                            </p>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">Acceptance of Terms</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    By accessing and using RegulateThis ("the Website"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use the Website.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">Use of Content</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    All content on this Website, including text, graphics, logos, and images, is the property of RegulateThis or its content suppliers and is protected by copyright laws.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    You may view, download, and print content from the Website for personal, non-commercial use only, provided you maintain all copyright and other proprietary notices.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">Disclaimer</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    The content on this Website is for informational purposes only and should not be construed as professional advice. We make no representations or warranties of any kind regarding the accuracy, completeness, or reliability of any content on the Website.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    You should consult with appropriate professionals for specific advice tailored to your situation.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">User Conduct</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    You agree not to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Use the Website for any unlawful purpose</li>
                                    <li>Attempt to gain unauthorized access to the Website or its systems</li>
                                    <li>Interfere with or disrupt the Website or servers</li>
                                    <li>Reproduce, duplicate, or copy content without permission</li>
                                    <li>Use automated systems to access the Website</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">Links to Third-Party Sites</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    The Website may contain links to third-party websites. These links are provided for your convenience only. We do not endorse or assume any responsibility for the content, privacy policies, or practices of any third-party websites.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">Limitation of Liability</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    To the fullest extent permitted by law, RegulateThis shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the Website.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">Changes to Terms</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the Website. Your continued use of the Website following the posting of changes constitutes your acceptance of such changes.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-light text-[#0B1F3B] mb-4">Contact Us</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    If you have any questions about these Terms of Use, please contact us at legal@regulatethis.com.
                                </p>
                            </section>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}