import { TINY_API_URL } from '@/constants/url';

export async function shortenUrl(originalUrl: string) {
    try {
        const response = await fetch(`${TINY_API_URL}/tinyurl`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                OriginalUrl: originalUrl,
                Comment: 'your',
                CreatedBy: 'vinit',
                UserId: 1,
            }),
        });

        if (response.status === 200) {
            const data = await response.json();
            return data.shortUrl;
        } else {
            console.error('Error shortening URL:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error shortening URL:', error);
        return null;
    }
}
