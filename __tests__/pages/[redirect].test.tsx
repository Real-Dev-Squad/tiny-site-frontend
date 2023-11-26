import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import urls from '../../__mocks__/db/urls';
import handlers from '../../__mocks__/handler';
import notFoundOriginalUrlHandler from '../../__mocks__/handler';
import { server } from '../../__mocks__/server';
import Redirect from '../../src/pages/[redirect]/index';

jest.mock('next/router', () => ({
    ...jest.requireActual('next/router'),
    useRouter: jest.fn().mockImplementation(() => ({
        query: { redirect: '963d9c42' },
    })),
}));

describe('Redirect Component', () => {
    const queryClient = new QueryClient();
    server.use(...handlers);
    jest.mock('../../src/services/api', () => ({
        useGetOriginalUrlQuery: jest.fn().mockReturnValue({
            data: urls.urls[0],
            isLoading: false,
        }),
    }));

    test('render text "Loading..." when isLoading is true', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Redirect />
            </QueryClientProvider>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('render text "Not Found" when isError is true', async () => {
        server.use(...notFoundOriginalUrlHandler);
        render(
            <QueryClientProvider client={queryClient}>
                <Redirect />
            </QueryClientProvider>
        );
        await waitFor(() => {
            expect(screen.getByText('404 - Not Found')).toBeInTheDocument();
            expect(screen.getByText('Create New Short URL')).toBeInTheDocument();
        });
    });
});
