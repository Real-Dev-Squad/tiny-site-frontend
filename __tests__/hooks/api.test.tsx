import { act, renderHook } from '@testing-library/react-hooks';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useAuthenticatedQuery, useGetOriginalUrlQuery } from '@/services/api';

import urls from '../../__mocks__/db/urls';
import user from '../../__mocks__/db/user';
import handlers from '../../__mocks__/handler';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useAuthenticatedQuery', () => {
    it('should return data', async () => {
        const queryClient = new QueryClient();
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );

        const { result, waitFor } = renderHook(() => useAuthenticatedQuery(), { wrapper });
        await waitFor(() => result.current.isSuccess);
        expect(result.current.data).toEqual(user);
        expect(result.current.isSuccess).toBe(true);
    });
});

describe('useGetOriginalUrlQuery', () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    it('returns isLoading as true by default', () => {
        const { result } = renderHook(() => useGetOriginalUrlQuery('963d9c42', { enabled: true }), { wrapper });

        expect(result.current.isLoading).toBe(true);
    });

    it('returns isLoading as false and data as original url data when original url is found', async () => {
        const shortUrlCode = urls.urls[0].shortUrl;
        const { result, waitFor } = renderHook(() => useGetOriginalUrlQuery(shortUrlCode, { enabled: true }), {
            wrapper,
        });

        await act(async () => {
            await queryClient.setQueryData(['originalUrl', shortUrlCode], urls.urls[0]);
        });

        await waitFor(() => result.current.isLoading === false);

        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toEqual(urls.urls[0]);
    });

    it('returns isLoading as false and isError as true when original url is not found', async () => {
        server.use(...handlers);
        const { result, waitFor } = renderHook(() => useGetOriginalUrlQuery('963d9c42', { enabled: true }), {
            wrapper,
        });

        await waitFor(() => result.current.isError === true);

        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(true);
    });
});
