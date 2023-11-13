import { render, screen } from '@testing-library/react';

import RedirectFooter from '@/components/Redirect/RedirectFooter';
import { TINY_SITE } from '@/constants/url';

describe('RedirectFooter component', () => {
    test('renders the footer link correctly', () => {
        render(<RedirectFooter />);

        const linkElement = screen.getByText(/By/i);
        expect(linkElement).toBeInTheDocument();

        const linkSpan = screen.getByText(/Real Dev Squad/i);
        expect(linkSpan).toBeInTheDocument();

        expect(linkElement).toHaveAttribute('href', TINY_SITE);
    });
});
