import fetchMock from 'jest-fetch-mock';

import { userData } from '../../fixtures/users';
import fetchUrls from '../../src/utils/fetchUrls';

fetchMock.enableMocks();

describe('fetchUrls', () => {
    const userOne = userData.data;
    const TINY_API_URL = 'https://staging-tinysite-api.realdevsquad.com/v1';

    it('should fetch URLs successfully', async () => {
        const mockUrls = [{ id: '1', url: 'https://realdevsquad.com' }];
        fetchMock.mockResponseOnce(JSON.stringify({ urls: mockUrls }));

        const result = await fetchUrls(userOne);

        expect(fetchMock).toHaveBeenCalledWith(`${TINY_API_URL}/user/1/urls`, {
            method: 'GET',
            credentials: 'include',
        });

        expect(result).toEqual(mockUrls);
    });

    it('should handle errors and return null', async () => {
        fetchMock.mockReject(new Error('Failed to fetch'));

        const result = await fetchUrls(userOne);

        expect(fetchMock).toHaveBeenCalledWith(`${TINY_API_URL}/user/1/urls`, {
            method: 'GET',
            credentials: 'include',
        });

        expect(result).toBeNull();
    });

    it('should return null if response is not ok', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 });

        const result = await fetchUrls(userOne);

        expect(fetchMock).toHaveBeenCalledWith(`${TINY_API_URL}/user/1/urls`, {
            method: 'GET',
            credentials: 'include',
        });

        expect(result).toBeNull();
    });
});

afterEach(() => {
    fetchMock.resetMocks();
});
