import { render, screen } from '@testing-library/react';

import NotFound from '@/components/Redirect/NotFound';

describe('NotFound component', () => {
    test('renders 404 - Not Found text', () => {
        render(<NotFound />);
        const headingElement = screen.getByText(/404 - Not Found/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('renders "The requested URL was not found." text', () => {
        render(<NotFound />);
        const textElement = screen.getByText(/The requested URL was not found/i);
        expect(textElement).toBeInTheDocument();
    });

    test('renders a link to create a new short URL', () => {
        render(<NotFound />);
        const linkElement = screen.getByRole('link', { name: /Create New Short URL/i });
        expect(linkElement).toBeInTheDocument();
    });
});
