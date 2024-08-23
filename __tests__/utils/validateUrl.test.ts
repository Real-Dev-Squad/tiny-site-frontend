import validateUrl from '@/utils/validateUrl';

describe('validateUrl', () => {
    it('should return an error message if URL is empty', () => {
        expect(validateUrl('')).toBe('Enter a valid URL');
    });

    it('should return an error message if URL is not valid', () => {
        expect(validateUrl('https://rds')).toBe('Enter a valid URL');
    });

    it('should return null if URL is valid', () => {
        expect(validateUrl('https://www.rds.li')).toBeNull();
    });
});
