import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                body: ['Space Mono', 'monospace'],
            },
            backgroundImage: {
                'blue-gradient':
                    'linear-gradient(to bottom, rgba(30, 66, 159, 1), rgba(26, 86, 219, 1), rgba(118, 169, 250, 1), rgba(142, 194, 250, 1))',
            },
            colors: {
                'custom-blue': '#1A56DB',
            },
        },
    },
    plugins: [],
};

export default config;
