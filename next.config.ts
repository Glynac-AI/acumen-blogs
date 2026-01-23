import type { NextConfig } from "next";

// Helper to extract hostname from URL
function getHostnameFromUrl(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

// Get Strapi configuration
const strapiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const strapiHostname = getHostnameFromUrl(strapiUrl);

// Get Cloudinary configuration
const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL || 'https://res.cloudinary.com';
const cloudinaryHostname = getHostnameFromUrl(cloudinaryUrl);

// Build remote patterns array
const remotePatterns = [
  // Placeholder images
  {
    protocol: 'https' as const,
    hostname: 'placehold.co',
    port: '',
    pathname: '/**',
  },
];

// Add Strapi hostname if valid
if (strapiHostname && !strapiHostname.includes('localhost')) {
  remotePatterns.push({
    protocol: 'https',
    hostname: strapiHostname,
    port: '',
    pathname: '/uploads/**',
  });
}


// Add Cloudinary hostname if valid
if (cloudinaryHostname) {
  remotePatterns.push({
    protocol: 'https' as const,
    hostname: cloudinaryHostname,
    port: '',
    pathname: '/**',
  });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;