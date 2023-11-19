import axios from 'axios';

import { TINY_API_URL } from '@/constants/url';
import shortenUrl from '@/utils/shortenUrl';

import urlsData from '../../fixtures/urls';
import { userData } from '../../fixtures/users';

jest.mock('axios');

describe('shortenUrl', () => {
    const originalUrl = urlsData.urls[0].originalUrl;
    const user = userData.data;
    it('successfully shortens a URL', async () => {
        const shortUrl = urlsData.urls[0].shortUrl;
        const axiosPostMock = jest.spyOn(axios, 'post');
        axiosPostMock.mockResolvedValue({ data: { short_url: shortUrl } });
        if (originalUrl) {
            const result = await shortenUrl(originalUrl, user);

            expect(axiosPostMock).toHaveBeenCalledWith(
                `${TINY_API_URL}/tinyurl`,
                {
                    OriginalUrl: originalUrl,
                    Comment: '',
                    CreatedBy: user.Username,
                    UserId: user.Id,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                }
            );
            expect(result).toBe(shortUrl);
        }
    });

    it('handles errors when shortening URL', async () => {
        const axiosPostMock = jest.spyOn(axios, 'post');
        axiosPostMock.mockRejectedValue({ message: 'Network Error' });

        if (originalUrl) {
            const result = await shortenUrl(originalUrl, user);

            expect(axiosPostMock).toHaveBeenCalledWith(expect.any(String), expect.any(Object), expect.any(Object));
            expect(result).toBeNull();
        }
    });

    it('handles null response when shortening URL', async () => {
        const axiosPostMock = jest.spyOn(axios, 'post');
        axiosPostMock.mockResolvedValue(null);

        if (originalUrl) {
            const result = await shortenUrl(originalUrl, user);

            expect(axiosPostMock).toHaveBeenCalledWith(expect.any(String), expect.any(Object), expect.any(Object));
            expect(result).toBeNull();
        }
    });
});
