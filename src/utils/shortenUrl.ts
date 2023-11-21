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
        const createdBy = userData?.userName;
        const userId = userData?.id;

        const response = await fetch(`${TINY_API_URL}/tinyurl`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                OriginalUrl: originalUrl,
                Comment: '',
                CreatedBy: createdBy,
                UserId: userId,
            } as ShortenUrlRequest),
        });

        if (!response.ok) {
            const errorMessage = `Error shortening URL: ${response.statusText}`;
            throw new Error(errorMessage);
        }

        const data: ShortenUrlResponse = await response.json();
        return data.short_url;
    } catch (error) {
        console.error('Error shortening URL:', error);
        return null;
    }
}
