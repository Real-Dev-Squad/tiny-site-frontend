import { TINY_API_URL_DETAIL } from '@/constants/url';
import { UrlResponseTypes } from '@/types/url.types';

async function fetchOriginalUrl(shortUrlCode: string): Promise<string | null> {
    try {
        const response = await fetch(`${TINY_API_URL_DETAIL}/${shortUrlCode}`);

        if (response.ok) {
            const data = (await response.json()) as UrlResponseTypes;
            return data.url.OriginalUrl;
        } else {
            return null; // Return null if the response is not ok
        }
    } catch (error) {
        console.error('Error fetching original URL:', error);
        return null; // Return null in case of an error
    }
}

export default fetchOriginalUrl;
