import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'RegulateThis - Insights for Wealth Management Professionals';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0B1F3B',
                    color: 'white',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 40,
                    }}
                >
                    {/* Logo Icon */}
                    <svg
                        width="128"
                        height="144"
                        viewBox="0 0 32 36"
                        fill="none"
                        style={{ marginRight: 24 }}
                    >
                        <path
                            d="M16 2L4 8v8c0 7.5 5 14 12 18 7-4 12-10.5 12-18V8L16 2z"
                            fill="#49648C"
                        />
                        <path
                            d="M16 6L8 10v6c0 5 3.5 9.5 8 12 4.5-2.5 8-7 8-12v-6l-8-4z"
                            fill="white"
                        />
                        <path
                            d="M16 21 l0 0"
                            fill="white"
                        />
                        {/* Text "R" manually rendered */}
                        <text
                            x="16"
                            y="21"
                            textAnchor="middle"
                            fill="#0B1F3B"
                            fontSize="14"
                            fontWeight="bold"
                            fontFamily="serif"
                        >
                            R
                        </text>
                    </svg>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 'bold',
                            color: 'white',
                            marginBottom: 20,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        RegulateThis
                    </div>
                    <div
                        style={{
                            fontSize: 32,
                            color: '#94A3B8',
                            textAlign: 'center',
                            maxWidth: 900,
                        }}
                    >
                        Insights for Wealth Management Professionals
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
