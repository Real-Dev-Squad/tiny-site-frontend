import urls from '../../__mocks__/db/urls';
import { failedUrls } from '../../__mocks__/handlers/url';
import { server } from '../../__mocks__/server';
import { userData } from '../../fixtures/users';
import fetchUrls from '../../src/utils/fetchUrls';

describe('fetchUrls', () => {
    const userOne = userData.data;
    it('should fetch URLs successfully', async () => {
        const result = await fetchUrls(userOne);

        expect(result).toEqual(urls.urls);
    });

    it('should handle errors and return null', async () => {
        server.use(failedUrls);

        const result = await fetchUrls(userOne);

        expect(result).toBeNull();
    });
});
