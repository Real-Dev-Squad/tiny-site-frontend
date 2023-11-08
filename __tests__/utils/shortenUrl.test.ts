import shortenUrl from '@/utils/ShortenUrl';
import { UserTypes } from '@/types/user.types';
import { userData } from '../../fixtures/users';
import { TINY_API_URL } from '@/constants/url';

describe('shortenUrl', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        jest.clearAllMocks();
    });

    it('should return the shortened URL when the API call is successful', async () => {
        const originalUrl = 'https://example.com/original';

        const mockResponseData = { short_url: 'https://example.com/shortened' };

        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponseData,
            headers: {
                get: () => 'application/json',
            },
        });

        const shortenedUrl = await shortenUrl(originalUrl, { ...userData.data } as UserTypes);

        expect(shortenedUrl).toBe('https://example.com/shortened');

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining(TINY_API_URL),
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                }),
            })
        );
    });

    it('should return null when the API call fails', async () => {
        const originalUrl = 'https://example.com/original';

        global.fetch.mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
        });

        const shortenedUrl = await shortenUrl(originalUrl, { ...userData.data } as UserTypes);

        expect(shortenedUrl).toBeNull();
    });
});
