/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        turbo: {
            enabled: false
        },
    },
};

export default nextConfig;
