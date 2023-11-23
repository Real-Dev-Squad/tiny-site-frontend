import axios from 'axios';

import urlsData from '../../fixtures/urls';
import { userData } from '../../fixtures/users';
import fetchUrls from '../../src/utils/fetchUrls';

jest.mock('axios');

describe('fetchUrls', () => {
    const user = userData.data;
    const mockUrls = urlsData.urls;
    it('fetches successfully data from an API', async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: { urls: mockUrls } });
        const result = await fetchUrls(user);
        expect(result).toEqual(mockUrls);
        console.log(result);
    });

    it('handles errors when fetching data', async () => {
        (axios.get as jest.Mock).mockRejectedValue({ message: 'Network Error' });
        const result = await fetchUrls(user);
        expect(result).toBeNull();
    });
    it('handles null response', async () => {
        (axios.get as jest.Mock).mockResolvedValue(null);
        const result = await fetchUrls(user);
        expect(result).toBeNull();
    });
});
