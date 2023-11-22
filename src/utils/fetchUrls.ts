import axios from 'axios';

import { TINY_API_URL } from '@/constants/url';
import { UrlType } from '@/types/url.types';
import { UserTypes } from '@/types/user.types';

async function fetchUrls(userData: UserTypes): Promise<UrlType[] | null> {
    const userId = userData?.id;
    try {
        const response = await axios.get(`${TINY_API_URL}/user/${userId}/urls`, {
            method: 'GET',
            withCredentials: true,
        });

        if (response) {
            const data = (await response.data) as { urls: UrlType[] };
            return data.urls;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching original URL:', error);
        return null;
    }
}

export default fetchUrls;
