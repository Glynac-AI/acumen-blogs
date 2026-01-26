import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, source = 'Homepage' } = body;

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
        // Use regulatethis.com for localhost/development, otherwise use actual domain
        const tenantDomain = domain === 'localhost' ? 'regulatethis.com' : domain;

        // Check if subscriber already exists in Strapi
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

        if (checkResponse.ok) {
            const existingData = await checkResponse.json();
            if (existingData.data && existingData.data.length > 0) {
                return NextResponse.json(
                    { error: 'This email is already subscribed' },
                    { status: 409 }
                );
            }
        }

        // Create new subscriber in Strapi
        const subscriberData = {
            data: {
                email,
                subscribedAt: new Date().toISOString(),
                status: 'active',
                source,
            },
        };

        const response = await fetch(`${STRAPI_URL}/api/newsletter-subscribers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Tenant-Domain': tenantDomain,
                ...(STRAPI_API_TOKEN && { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }),
            },
            body: JSON.stringify(subscriberData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Strapi error:', errorData);
            throw new Error('Failed to subscribe');
        }

        const data = await response.json();

        return NextResponse.json(
            {
                success: true,
                message: 'Thank you for subscribing!',
                data
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { error: 'Failed to subscribe. Please try again later.' },
            { status: 500 }
        );
    }
}
