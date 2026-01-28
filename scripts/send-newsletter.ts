#!/usr/bin/env tsx

/**
 * Newsletter Sending Script
 *
 * This script is designed to be run as a cron job on Render.
 * It fetches recent articles, active subscribers, and sends a weekly digest email.
 *
 * Schedule: Every Friday at 9 AM EST
 * Cron Expression: 0 14 * * 5 (9 AM EST = 14:00 UTC)
 */

import 'dotenv/config';

import { Resend } from 'resend';
import { fetchArticles, fetchActiveSubscribers } from '../lib/api';
import WeeklyDigestEmail from '../emails/WeeklyDigest';

// ============================================
// CONFIGURATION
// ============================================

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NEWSLETTER_FROM_EMAIL = process.env.NEWSLETTER_FROM_EMAIL || 'newsletter@regulatethis.com';
const NEWSLETTER_FROM_NAME = process.env.NEWSLETTER_FROM_NAME || 'RegulateThis';
const DAYS_TO_LOOK_BACK = 7;

if (!RESEND_API_KEY) {
    console.error('❌ ERROR: RESEND_API_KEY environment variable is not set');
    process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get date from N days ago
 */
function getDaysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
}

/**
 * Format date for logging
 */
function formatDate(date: Date): string {
    return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/New_York'
    });
}

/**
 * Send newsletter in batches using Resend's Batch API
 * Each recipient receives their own individual email (no exposed email addresses)
 */
async function sendInBatches(
    emails: string[],
    subject: string,
    reactComponent: React.ReactElement,
    batchSize: number = 100
): Promise<{ success: number; failed: number; errors: string[] }> {
    const results = {
        success: 0,
        failed: 0,
        errors: [] as string[],
    };

    for (let i = 0; i < emails.length; i += batchSize) {
        const batch = emails.slice(i, i + batchSize);
        const batchNumber = Math.floor(i / batchSize) + 1;
        const totalBatches = Math.ceil(emails.length / batchSize);

        console.log(`📤 Sending batch ${batchNumber} of ${totalBatches} (${batch.length} emails)...`);

        try {
            const emailPayloads = batch.map(email => ({
                from: `${NEWSLETTER_FROM_NAME} <${NEWSLETTER_FROM_EMAIL}>`,
                to: [email],
                subject: subject,
                react: reactComponent,
            }));

            const response = await resend.batch.send(emailPayloads);

            if (response.error) {
                console.error(`❌ Batch error:`, response.error);
                results.failed += batch.length;
                results.errors.push(`Batch ${batchNumber}: ${response.error.message}`);
            } else {
                const batchData = response.data?.data || [];
                const successCount = batchData.filter(r => r.id).length;
                const failCount = batch.length - successCount;

                results.success += successCount;
                results.failed += failCount;

                console.log(`✅ Batch sent: ${successCount} succeeded, ${failCount} failed`);
            }
        } catch (error) {
            console.error(`❌ Batch ${batchNumber} failed:`, error);
            results.failed += batch.length;
            results.errors.push(`Batch ${batchNumber}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }

        if (i + batchSize < emails.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    return results;
}

// ============================================
// MAIN SCRIPT
// ============================================

async function main() {
    console.log('\n========================================');
    console.log('📬 RegulateThis Newsletter Sender');
    console.log('========================================\n');
    console.log(`🕐 Started at: ${formatDate(new Date())}`);
    console.log(`📅 Looking for articles from the last ${DAYS_TO_LOOK_BACK} days\n`);

    try {
        console.log('📚 Fetching recent articles...');
        const cutoffDate = getDaysAgo(DAYS_TO_LOOK_BACK);

        const allArticles = await fetchArticles({ limit: 50 });

        const articles = allArticles
            .filter(article => {
                const publishDate = new Date(article.publishDate);
                return publishDate >= cutoffDate;
            })
            .slice(0, 10);

        console.log(`✅ Found ${articles.length} article(s) published since ${cutoffDate.toLocaleDateString()}`);

        if (articles.length === 0) {
            console.log('\n⚠️  No new articles found. Skipping newsletter send.');
            console.log('========================================\n');
            process.exit(0);
        }

        console.log('\n📝 Articles to include:');
        articles.forEach((article, index) => {
            console.log(`   ${index + 1}. "${article.title}" by ${article.author.name}`);
        });

        console.log('\n👥 Fetching active subscribers...');
        const subscribers = await fetchActiveSubscribers();
        console.log(`✅ Found ${subscribers.length} active subscriber(s)`);

        if (subscribers.length === 0) {
            console.log('\n⚠️  No active subscribers found. Skipping newsletter send.');
            console.log('========================================\n');
            process.exit(0);
        }

        const subject = articles.length === 1
            ? `New Article: ${articles[0].title}`
            : `Weekly Digest: ${articles.length} New Articles on Compliance & Practice Management`;

        console.log(`\n📧 Email subject: "${subject}"`);

        const emailList = subscribers.map(sub => sub.email);

        console.log(`\n🚀 Sending newsletter to ${emailList.length} subscriber(s)...`);

        const results = await sendInBatches(
            emailList,
            subject,
            WeeklyDigestEmail({ articles })
        );

        console.log('\n========================================');
        console.log('📊 SEND RESULTS');
        console.log('========================================');
        console.log(`✅ Successfully sent: ${results.success}`);
        console.log(`❌ Failed: ${results.failed}`);

        if (results.errors.length > 0) {
            console.log('\n❌ Errors:');
            results.errors.forEach(error => console.log(`   - ${error}`));
        }

        console.log('\n🏁 Newsletter send completed!');
        console.log(`🕐 Finished at: ${formatDate(new Date())}`);
        console.log('========================================\n');

        if (results.failed > 0) {
            process.exit(1);
        }

    } catch (error) {
        console.error('\n❌ FATAL ERROR:', error);
        console.error('========================================\n');
        process.exit(1);
    }
}

main();
