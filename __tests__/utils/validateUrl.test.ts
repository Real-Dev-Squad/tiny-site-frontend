import validateUrl from '@/utils/validateUrl';

describe('validateUrl', () => {
    const showToast = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return false if url is empty', () => {
        expect(validateUrl('', showToast)).toBe(false);
        expect(showToast).toHaveBeenCalledWith('Enter the URL', 3000, 'error');
    });

    it('should return false if url is not valid', () => {
        expect(validateUrl('https://rds', showToast)).toBe(false);
        expect(showToast).toHaveBeenCalledWith('Enter a valid URL', 3000, 'info');
    });

    it('should return true if url is valid', () => {
        expect(validateUrl('https://www.rds.li', showToast)).toBe(true);
        expect(showToast).not.toHaveBeenCalled();
    });
});
