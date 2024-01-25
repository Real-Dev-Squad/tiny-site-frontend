import { addProtocol } from '@/utils/addProtocol';

describe('addProtocol', () => {
    it('should add http protocol', () => {
        const url = 'example.com';
        expect(addProtocol(url)).toBe(`http://${url}`);
    });

    it('should not add http protocol', () => {
        const url = 'http://example.com';
        expect(addProtocol(url)).toBe(url);
    });

    it('should not add https protocol', () => {
        const url = 'https://example.com';
        expect(addProtocol(url)).toBe(url);
    });
});
