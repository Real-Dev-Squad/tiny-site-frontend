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
                'custom-gradient':
                    'linear-gradient(to bottom, rgba(30, 66, 159, 1), rgba(26, 86, 219, 1), rgba(118, 169, 250, 1), rgba(240, 245, 255, 1))',
            },
            fontSize: {
                '80px': '80px',
            },
            lineHeight: {
                'custom-120px': '100px',
                'custom-60px': '60px',
            },
        },
    },
    plugins: [],
};

export default config;
