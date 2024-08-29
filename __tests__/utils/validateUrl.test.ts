import validateUrl from '@/utils/validateUrl';

describe('validateUrl', () => {
    it('should return an error message if URL is empty', () => {
        const result = validateUrl('');
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('Enter a valid URL');
    });

    it('should return null if URL is valid', () => {
        const result = validateUrl('https://www.rds.li');
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBeNull();
    });
});
