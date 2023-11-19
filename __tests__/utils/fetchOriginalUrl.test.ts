import fetchMock from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';

import fetchOriginalUrl from '../../src/utils/fetchOriginalUrl';

fetchMock.enableMocks();

describe('fetchOriginalUrl', () => {
    const shortUrlCode = '442d39ac';
    const originalUrl = 'https://github.com/Real-Dev-Squad/tiny-site-frontend/pull/40';

    it('fetches and displays the original URL if the response is successful', async () => {
        const responseData = { url: { originalUrl: originalUrl } };

        fetchMock.mockResponse(JSON.stringify(responseData), { status: 200 });

        await act(async () => {
            const result = await fetchOriginalUrl(shortUrlCode);
            expect(result).toEqual(originalUrl);
        });
    });

    it('returns null if the response is not successful', async () => {
        fetchMock.mockResponse('', { status: 404 });

        await act(async () => {
            const result = await fetchOriginalUrl(shortUrlCode);
            expect(result).toBeNull();
        });
    });

    it('handles errors gracefully', async () => {
        fetchMock.mockReject(new Error('Network error'));

        await act(async () => {
            const result = await fetchOriginalUrl(shortUrlCode);
            expect(result).toBeNull();
        });
    });
});
