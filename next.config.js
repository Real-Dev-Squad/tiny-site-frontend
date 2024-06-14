/** @type {import('next').NextConfig} */

const dotenv = require('dotenv');

const envFiles = {
    development: '.env.development',
    staging: '.env.staging',
    production: '.env.production',
};

dotenv.config({ path: envFiles[process.env.NODE_ENV] || '.env.local' });

module.exports = {
    reactStrictMode: true,
    env: {
        API_URL: process.env.API_URL,
    },
};
