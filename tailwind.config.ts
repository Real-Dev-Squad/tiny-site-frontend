import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            // backgroundImage: {
            //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            //     'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            // },
            backgroundColor: {
                'custom-purple': 'rgba(106, 0, 240, 1)',
                'custom-orange': 'rgba(244, 155, 72, 1)',
                'custom-button-gray': 'rgba(119, 118, 116, 1)',
            },
            boxShadow: {
                'custom-inner-orange': 'inset 10px 10px 0px 0px rgba(127, 49, 10, 0.4)',
                'custom-inner-black': 'inset 2px 2px 0px 0px rgba(0, 0, 0, 0.2)',
            },
            fontSize: {
                'custom-80px': '80px',
            },
            borderWidth: {
                '2.5': '2.5px',
            },
            inset: {
                '5px': '5px',
                '54px': '54px',
            },
            colors: {
                'custom-gradient-start': 'rgba(255, 255, 255, 0.58)',
                'custom-gradient-end': 'rgba(255, 255, 255, 0)',
            },
        },
    },
    plugins: [],
};

export default config;
