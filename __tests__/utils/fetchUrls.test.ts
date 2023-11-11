import fetchMock from 'jest-fetch-mock';
import fetchUrls from '../../src/utils/fetchUrls';

fetchMock.enableMocks();

describe('fetchUrls', () => {
    const userData = {
        Id: 123456,
        Username: 'Sunny Sahsi',
        Email: 'sunnysahsi@gmail.com',
        Password: '',
        IsVerified: false,
        IsOnboarding: true,
        CreatedAt: '2023-11-04T10:02:26.582699Z',
        UpdatedAt: '2023-11-04T10:02:26.582699Z',
    };
    const TINY_API_URL = 'https://staging-tinysite-api.realdevsquad.com/v1';

    it('should fetch URLs successfully', async () => {
        const mockUrls = [{ id: '1', url: 'https://realdevsquad.com' }];
        fetchMock.mockResponseOnce(JSON.stringify({ urls: mockUrls }));

        const result = await fetchUrls(userData);

        expect(fetchMock).toHaveBeenCalledWith(`${TINY_API_URL}/user/123456/urls`, {
            method: 'GET',
            credentials: 'include',
        });

        expect(result).toEqual(mockUrls);
    });

    it('should handle errors and return null', async () => {
        fetchMock.mockReject(new Error('Failed to fetch'));

        const result = await fetchUrls(userData);

        expect(fetchMock).toHaveBeenCalledWith(`${TINY_API_URL}/user/123456/urls`, {
            method: 'GET',
            credentials: 'include',
        });

        expect(result).toBeNull();
    });

    it('should return null if response is not ok', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 });

        const result = await fetchUrls(userData);

        expect(fetchMock).toHaveBeenCalledWith(`${TINY_API_URL}/user/123456/urls`, {
            method: 'GET',
            credentials: 'include',
        });

        expect(result).toBeNull();
    });
});

afterEach(() => {
    fetchMock.resetMocks();
});
