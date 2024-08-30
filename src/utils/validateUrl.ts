interface ValidationResult {
    isValid: boolean;
    errorMessage: string | null;
}

const validateUrl = (url: string): ValidationResult => {
    try {
        const formattedUrl = new URL(url);

        const domainRegex = /^(?:https?:\/\/)?(?:[\w-]+\.)+[a-z]{2,}$/i;

        const domain = formattedUrl.hostname;
        if (!domainRegex.test(domain)) {
            return { isValid: false, errorMessage: 'Enter a valid URL' };
        }

        return { isValid: true, errorMessage: null };
    } catch (error) {
        return { isValid: false, errorMessage: 'Enter a valid URL' };
    }
};

export default validateUrl;
