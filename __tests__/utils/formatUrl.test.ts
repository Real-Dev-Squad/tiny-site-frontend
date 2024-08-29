import { formatUrl } from '@/utils/formatUrl';

describe('formatUrl', () => {
    it('should return the URL as is if it starts with http://', () => {
        const url = 'http://example.com';
        expect(formatUrl(url)).toBe(url);
    });

    it('should return the URL as is if it starts with https://', () => {
        const url = 'https://example.com';
        expect(formatUrl(url)).toBe(url);
    });

    it('should prepend https:// if the URL does not start with http:// or https://', () => {
        const url = 'example.com';
        expect(formatUrl(url)).toBe(`https://${url}`);
    });

    it('should handle URLs with no scheme correctly', () => {
        const url = 'example';
        expect(formatUrl(url)).toBe(`https://${url}`);
    });
});
