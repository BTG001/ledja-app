/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
        domains: [
            "localhost",
            "127.0.0.1",
            "http://34.118.66.234",
            "https://api.direktory.biz",
            "https://api.direktory.biz/",
            "api.direktory.biz",
        ],
    },
};

module.exports = nextConfig;
