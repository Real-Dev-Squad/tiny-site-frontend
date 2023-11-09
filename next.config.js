/** @type {import('next').NextConfig} */

const nextConfig = {
    async redirects() {
        return [
            {
                source: '/:shortCode',
                destination: '/redirect/:shortCode',
                permanent: false,
            },
        ];
    },
};

module.exports = nextConfig;
