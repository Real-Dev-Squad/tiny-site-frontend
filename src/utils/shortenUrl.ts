import axios from 'axios';

import { TINY_API_URL } from '@/constants/url';
import { UserTypes } from '@/types/user.types';

interface ShortenUrlRequest {
    OriginalUrl: string;
    Comment: string;
    CreatedBy: string;
    UserId: number;
}

interface ShortenUrlResponse {
    shortUrl: string;
}

export default async function shortenUrl(originalUrl: string, userData: UserTypes | null) {
    try {
        const createdBy = userData?.userName;
        const userId = userData?.id;

        const { data } = await axios.post<ShortenUrlResponse>(
            `${TINY_API_URL}/tinyurl`,
            {
                OriginalUrl: originalUrl,
                Comment: '',
                CreatedBy: createdBy,
                UserId: userId,
            } as ShortenUrlRequest,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );

        return data.shortUrl;
    } catch (error) {
        console.error('Error shortening URL:', error);
        return null;
    }
}
