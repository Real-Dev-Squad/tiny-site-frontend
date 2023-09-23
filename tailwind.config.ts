import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                primary: '#041187',
                'primary-light': '#0D1C6E',
                'primary-dark': '#000A5C',
                secondary: '#E30062',
                'secondary-light': '#FF007A',
                'secondary-dark': '#B2004E',
            },
        },
    },
    plugins: [],
};
export default config;
