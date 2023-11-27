import { act, renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useAuthenticatedQuery, useGetOriginalUrlQuery } from '@/services/api';

import { urlDetails } from '../../__mocks__/db/urls';
import user from '../../__mocks__/db/user';
import notFoundOriginalUrlHandler from '../../__mocks__/handler';
import handlers from '../../__mocks__/handler';
import { server } from '../../__mocks__/server';

describe('useAuthenticatedQuery', () => {
    server.use(...handlers);
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
        const shortUrlCode = urlDetails.url.shortUrl;
        const { result, waitFor } = renderHook(() => useGetOriginalUrlQuery(shortUrlCode, { enabled: true }), {
            wrapper,
        });

        await act(async () => {
            await queryClient.setQueryData(['originalUrl', shortUrlCode], urlDetails);
        });

        await waitFor(() => result.current.isLoading === false);

        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toEqual(urlDetails);
    });

    it('returns isLoading as false and isError as true when original url is not found', async () => {
        server.use(...notFoundOriginalUrlHandler);
        const { result, waitFor } = renderHook(() => useGetOriginalUrlQuery('963d9c42', { enabled: true }), {
            wrapper,
        });

        waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.isError).toBe(true);
        });
    });
});
