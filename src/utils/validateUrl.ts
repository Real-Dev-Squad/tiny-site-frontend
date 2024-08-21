import { urlRegex } from '@/constants/constants';

const validateUrl = (
    url: string,
    showToast: (message: string, duration?: number, type?: 'success' | 'info' | 'error') => void
) => {
    if (!url) {
        showToast('Enter the URL', 3000, 'error');
        return false;
    }

    if (!urlRegex.test(url)) {
        showToast('Enter a valid URL', 3000, 'error');
        return false;
    }
    return true;
};

export default validateUrl;
