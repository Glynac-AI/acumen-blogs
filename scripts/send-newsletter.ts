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

// Load environment variables from .env file
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
const DAYS_TO_LOOK_BACK = 7; // Look back 7 days for articles

// Validate environment variables
if (!RESEND_API_KEY) {
    console.error('❌ ERROR: RESEND_API_KEY environment variable is not set');
    process.exit(1);
}

// Initialize Resend
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
 * Send newsletter in batches to avoid rate limits
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

    // Split emails into batches
    for (let i = 0; i < emails.length; i += batchSize) {
        const batch = emails.slice(i, i + batchSize);

        console.log(`📤 Sending batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(emails.length / batchSize)} (${batch.length} emails)...`);

        try {
            const response = await resend.emails.send({
                from: `${NEWSLETTER_FROM_NAME} <${NEWSLETTER_FROM_EMAIL}>`,
                to: batch,
                subject: subject,
                react: reactComponent,
            });

            if (response.error) {
                console.error(`❌ Batch error:`, response.error);
                results.failed += batch.length;
                results.errors.push(`Batch ${i / batchSize + 1}: ${response.error.message}`);
            } else {
                results.success += batch.length;
                console.log(`✅ Batch sent successfully (ID: ${response.data?.id})`);
            }
        } catch (error) {
            console.error(`❌ Batch ${i / batchSize + 1} failed:`, error);
            results.failed += batch.length;
            results.errors.push(`Batch ${i / batchSize + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }

        // Add delay between batches to respect rate limits
        if (i + batchSize < emails.length) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
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
        // Step 1: Fetch recent articles
        console.log('📚 Fetching recent articles...');
        const cutoffDate = getDaysAgo(DAYS_TO_LOOK_BACK);

        // Fetch all recent articles (sorted by publishDate desc by default)
        const allArticles = await fetchArticles({ limit: 50 });

        // Filter to only articles published in the last N days
        const articles = allArticles
            .filter(article => {
                const publishDate = new Date(article.publishDate);
                return publishDate >= cutoffDate;
            })
            .slice(0, 10); // Maximum 10 articles per newsletter

        console.log(`✅ Found ${articles.length} article(s) published since ${cutoffDate.toLocaleDateString()}`);

        // Check if there are any articles to send
        if (articles.length === 0) {
            console.log('\n⚠️  No new articles found. Skipping newsletter send.');
            console.log('========================================\n');
            process.exit(0);
        }

        // Log article titles
        console.log('\n📝 Articles to include:');
        articles.forEach((article, index) => {
            console.log(`   ${index + 1}. "${article.title}" by ${article.author.name}`);
        });

        // Step 2: Fetch active subscribers
        console.log('\n👥 Fetching active subscribers...');
        const subscribers = await fetchActiveSubscribers();
        console.log(`✅ Found ${subscribers.length} active subscriber(s)`);

        if (subscribers.length === 0) {
            console.log('\n⚠️  No active subscribers found. Skipping newsletter send.');
            console.log('========================================\n');
            process.exit(0);
        }

        // Step 3: Generate email subject
        const subject = articles.length === 1
            ? `New Article: ${articles[0].title}`
            : `Weekly Digest: ${articles.length} New Articles on Compliance & Practice Management`;

        console.log(`\n📧 Email subject: "${subject}"`);

        // Step 4: Prepare email list
        const emailList = subscribers.map(sub => sub.email);

        // Step 5: Send newsletter
        console.log(`\n🚀 Sending newsletter to ${emailList.length} subscriber(s)...`);

        const results = await sendInBatches(
            emailList,
            subject,
            WeeklyDigestEmail({ articles })
        );

        // Step 6: Report results
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

        // Exit with error code if any sends failed
        if (results.failed > 0) {
            process.exit(1);
        }

    } catch (error) {
        console.error('\n❌ FATAL ERROR:', error);
        console.error('========================================\n');
        process.exit(1);
    }
}

// Run the script
main();
