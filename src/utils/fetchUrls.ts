import { TINY_API_URL } from '@/constants/url';
import { UrlListResponseTypes } from '@/types/url.types';
import { UserTypes } from '@/types/user.types';

async function fetchUrls(userData: UserTypes | null): Promise<UrlListResponseTypes[] | null> {
    const userId = userData?.Id;
    try {
        const response = await fetch(`${TINY_API_URL}/user/${userId}/urls`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching original URL:', error);
        return null;
    }
}

export default fetchUrls;
