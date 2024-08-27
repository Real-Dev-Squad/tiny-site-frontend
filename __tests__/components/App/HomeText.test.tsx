import { render, screen } from '@testing-library/react';

import HomeText from '@/components/App/HomeText';

describe('HomeText component', () => {
    it('renders the main heading correctly', () => {
        render(<HomeText />);
        const mainHeading = screen.getByText('Shorten Your URL');
        expect(mainHeading).toBeInTheDocument();
        expect(mainHeading).toHaveClass(
            'text-3xl md:text-6xl xl:text-7xl sm:text-5xl text-center text-white font-semibold pb-2 lg:pb-4'
        );
    });

    it('renders the subheading correctly', () => {
        render(<HomeText />);
        const subHeading = screen.getByText('Perfect Links Every Time');
        expect(subHeading).toBeInTheDocument();
        expect(subHeading).toHaveClass(
            'text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-center text-white font-semibold'
        );
    });

    it('renders the paragraph text correctly', () => {
        render(<HomeText />);
        const paragraph = screen.getByText(/Ready to shorten your URL\? Enter your/i);
        expect(paragraph).toBeInTheDocument();
        expect(paragraph).toHaveClass('xl:text-xl text-base text-white mt-4 text-center');
    });

    it('renders the paragraph text with a line break for small screens', () => {
        render(<HomeText />);
        const paragraph = screen.getByText(/Ready to shorten your URL\? Enter your/i);
        expect(paragraph.innerHTML).toContain('<br class="sm:hidden">');
    });
});
