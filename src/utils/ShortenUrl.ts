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

export async function shortenUrl(originalUrl: string, userData: UserTypes | null) {
    try {
        const createdBy = userData?.Username;
        const userId = userData?.Id;
        console.log(userData);

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

        if (response.status === 200) {
            const data: ShortenUrlResponse = await response.json();
            console.log('data in shirten url', data);
            return data.short_url;
        } else {
            console.error('Error shortening URL:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error shortening URL:', error);
        return null;
    }
}
