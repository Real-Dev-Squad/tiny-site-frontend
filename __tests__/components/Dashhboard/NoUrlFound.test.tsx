import { render, screen } from '@testing-library/react';

import NoUrlFound from '@/components/Dashboard/NoUrlFound';

describe('NoUrlFound', () => {
    test('renders NoUrlFound component', () => {
        render(<NoUrlFound />);
        const noUrlFound = screen.getByText(/No URLs found/i);
        expect(noUrlFound).toBeInTheDocument();
    });
});
