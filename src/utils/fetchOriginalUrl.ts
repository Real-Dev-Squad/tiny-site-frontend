import { TINY_API_URL_DETAIL } from '@/constants/url';
import { UrlResponseTypes } from '@/types/url.types';
import axios from 'axios';

async function fetchOriginalUrl(shortUrlCode: string): Promise<string | null> {
    try {
        const response = await axios.get(`${TINY_API_URL_DETAIL}/${shortUrlCode}`);

        if (response) {
            const data = (await response.data) as UrlResponseTypes;
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
