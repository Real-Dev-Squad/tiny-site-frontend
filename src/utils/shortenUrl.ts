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
    short_url: string;
}

export default async function shortenUrl(originalUrl: string, userData: UserTypes | null) {
    try {
        const createdBy = userData?.Username;
        const userId = userData?.Id;

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

        return data.short_url;
    } catch (error) {
        console.error('Error shortening URL:', error);
        return null;
    }
}
