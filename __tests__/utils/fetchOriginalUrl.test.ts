import axios from 'axios';

import urlsData from '../../fixtures/urls';
import fetchOriginalUrl from '../../src/utils/fetchOriginalUrl';

jest.mock('axios');

describe('fetchOriginalUrl', () => {
    const shortUrlCode = urlsData.urls[0].shortUrl;
    const originalUrl = urlsData.urls[0].originalUrl;
    it('fetches successfully data from an API', async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: { url: { originalUrl } } });
        const result = await fetchOriginalUrl(shortUrlCode);
        expect(result).toEqual(originalUrl);
    });

    it('handles errors when fetching data', async () => {
        (axios.get as jest.Mock).mockRejectedValue({ message: 'Network Error' });
        const result = await fetchOriginalUrl(shortUrlCode);
        expect(result).toBeNull();
    });

    it('handles null response', async () => {
        (axios.get as jest.Mock).mockResolvedValue(null);
        const result = await fetchOriginalUrl(shortUrlCode);
        expect(result).toBeNull();
    });
});
