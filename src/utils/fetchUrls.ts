import { TINY_API_URL } from '@/constants/url';
import { UrlType } from '@/types/url.types';
import { UserTypes } from '@/types/user.types';

async function fetchUrls(userData: UserTypes): Promise<UrlType[] | null> {
    const userId = userData?.Id;
    try {
        const response = await fetch(`${TINY_API_URL}/user/${userId}/urls`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const data = (await response.json()) as { urls: UrlType[] };
            return data.urls;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export default fetchUrls;
