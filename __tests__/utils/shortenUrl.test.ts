import axios from 'axios';

import { TINY_API_URL } from '@/constants/url';
import { User } from '@/types/user.types';
import shortenUrl from '@/utils/shortenUrl';

import urlsData from '../../fixtures/urls';
import { userData } from '../../fixtures/users';

jest.mock('axios');

describe('shortenUrl', () => {
    const originalUrl = urlsData.urls[0].originalUrl;
    const user: User = {
        message: 'User fetched successfully',
        data: {
            id: userData?.data.id,
            userName: userData?.data.userName,
            email: userData?.data.email,
            password: userData?.data.password,
            isVerified: userData?.data.isVerified,
            isOnboarding: userData?.data.isOnboarding,
            createdAt: userData?.data.createdAt,
            updatedAt: userData?.data.updatedAt,
        },
    };

    it('successfully shortens a URL', async () => {
        const shortUrl = urlsData.urls[0].shortUrl;
        const axiosPostMock = jest.spyOn(axios, 'post');
        axiosPostMock.mockResolvedValue({ data: { shortUrl: shortUrl } });
        if (originalUrl) {
            const result = await shortenUrl(originalUrl, user);

            expect(axiosPostMock).toHaveBeenCalledWith(
                `${TINY_API_URL}/tinyurl`,
                {
                    OriginalUrl: originalUrl,
                    Comment: '',
                    CreatedBy: user.data.userName,
                    UserId: user.data.id,
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
