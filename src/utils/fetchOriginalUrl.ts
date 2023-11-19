import { TINY_API_URL_DETAIL } from '@/constants/url';
import { UrlResponseTypes } from '@/types/url.types';

async function fetchOriginalUrl(shortUrlCode: string): Promise<string | null> {
    try {
        const response = await fetch(`${TINY_API_URL_DETAIL}/${shortUrlCode}`);

        if (response.ok) {
            const data = (await response.json()) as UrlResponseTypes;
            return data.url.originalUrl;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching original URL:', error);
        return null;
    }
}

export default fetchOriginalUrl;
