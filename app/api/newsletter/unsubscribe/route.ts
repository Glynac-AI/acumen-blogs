import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, reason } = body;

        // Validate email
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        // Get tenant domain from request headers
        const host = request.headers.get('host') || request.headers.get('x-forwarded-host') || '';
        const domain = host.split(':')[0];
        const tenantDomain = domain === 'localhost' ? 'regulatethis.com' : domain;

        // Check if subscriber exists in Strapi
        const checkParams = new URLSearchParams({
            'filters[email][$eq]': email,
        });

        const checkResponse = await fetch(
            `${STRAPI_URL}/api/newsletter-subscribers?${checkParams.toString()}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Tenant-Domain': tenantDomain,
                    ...(STRAPI_API_TOKEN && { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }),
                },
            }
        );

        if (!checkResponse.ok) {
            throw new Error('Failed to check subscriber status');
        }

        const existingData = await checkResponse.json();

        if (!existingData.data || existingData.data.length === 0) {
            return NextResponse.json(
                { error: 'Email address not found in our subscriber list' },
                { status: 404 }
            );
        }

        const subscriber = existingData.data[0];

        // Check if already unsubscribed
        if (subscriber.status === 'unsubscribed') {
            return NextResponse.json(
                { message: 'This email is already unsubscribed' },
                { status: 200 }
            );
        }

        // Update subscriber status to unsubscribed
        const updateResponse = await fetch(
            `${STRAPI_URL}/api/newsletter-subscribers/${subscriber.documentId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Tenant-Domain': tenantDomain,
                    ...(STRAPI_API_TOKEN && { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }),
                },
                body: JSON.stringify({
                    data: {
                        status: 'unsubscribed',
                        unsubscribedAt: new Date().toISOString(),
                        ...(reason && { unsubscribeReason: reason }),
                    },
                }),
            }
        );

        if (!updateResponse.ok) {
            const errorData = await updateResponse.json().catch(() => ({}));
            console.error('Strapi error:', errorData);
            throw new Error('Failed to unsubscribe');
        }

        return NextResponse.json(
            {
                success: true,
                message: 'You have been successfully unsubscribed',
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Newsletter unsubscribe error:', error);
        return NextResponse.json(
            { error: 'Failed to unsubscribe. Please try again later.' },
            { status: 500 }
        );
    }
}
