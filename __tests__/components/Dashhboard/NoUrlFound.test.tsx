import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import NoUrlFound from '@/components/Dashboard/NoUrlFound';

describe('NoUrlFound', () => {
    test('renders NoUrlFound component', () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <NoUrlFound />
            </QueryClientProvider>
        );
        const noUrlFoundText = screen.getByText(/No URLs found/i);
        expect(noUrlFoundText).toBeInTheDocument();
        const createOneButton = screen.getByText(/Create one/i);
        expect(createOneButton).toBeInTheDocument();
    });
});
