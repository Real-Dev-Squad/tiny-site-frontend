import { act, renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useAuthenticatedQuery, useGetOriginalUrlQuery, useGetUrlsQuery, useShortenUrlMutation } from '@/services/api';

import { urlDetails } from '../../__mocks__/db/urls';
import { urls } from '../../__mocks__/db/urls';
import user from '../../__mocks__/db/user';
import notFoundOriginalUrlHandler from '../../__mocks__/handler';
import notFoundAllUrlHandler from '../../__mocks__/handler';
import handlers from '../../__mocks__/handler';
import { server } from '../../__mocks__/server';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useAuthenticatedQuery', () => {
    server.use(...handlers);
    it('should return data', async () => {
        const { result, waitFor } = renderHook(() => useAuthenticatedQuery(), { wrapper });
        await waitFor(() => result.current.isSuccess);
        expect(result.current.data).toEqual(user);
        expect(result.current.isSuccess).toBe(true);
    });
});

describe('useGetOriginalUrlQuery', () => {
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

describe('useGetUrlsQuery', () => {
    it('returns isLoading as true by default', () => {
        const { result } = renderHook(() => useGetUrlsQuery({ enabled: true }), { wrapper });

        expect(result.current.isLoading).toBe(true);
    });

    it('returns isLoading as false and data as urls data when urls are found', async () => {
        const { result, waitFor } = renderHook(() => useGetUrlsQuery({ enabled: true }), {
            wrapper,
        });

        await act(async () => {
            await queryClient.setQueryData(['urls'], urls);
        });

        await waitFor(() => result.current.isLoading === false);

        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toEqual(urls);
    });

    it('returns isLoading as false and isError as true when urls are not found', async () => {
        server.use(...notFoundAllUrlHandler);
        const { result, waitFor } = renderHook(() => useGetUrlsQuery({ enabled: true }), {
            wrapper,
        });

        waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.isError).toBe(true);
        });
    });
});

describe('useShortenUrlMutation', () => {
    it('should return data after successfully shortening the URL', async () => {
        const userData = user.data;
        const originalUrl = urlDetails.url.originalUrl;

        server.use(...handlers);
        const { result, waitFor } = renderHook(() => useShortenUrlMutation(), { wrapper });

        act(() => {
            result.current.mutate({ originalUrl, userData });
        });

        await waitFor(() => result.current.isSuccess);

        await waitFor(() => {
            expect(result.current.data).toEqual(urlDetails.url.shortUrl);
            expect(result.current.isSuccess).toBe(true);
        });
    });
});
