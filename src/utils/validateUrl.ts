import { urlRegex } from '@/constants/constants';

const validateUrl = (url: string): string | null => {
    if (!urlRegex.test(url)) {
        return 'Enter a valid URL';
    }

    return null;
};

export default validateUrl;
