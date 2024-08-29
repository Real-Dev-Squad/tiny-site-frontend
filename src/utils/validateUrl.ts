interface ValidationResult {
    isValid: boolean;
    errorMessage: string | null;
}

const validateUrl = (url: string): ValidationResult => {
    try {
        new URL(url);
        return { isValid: true, errorMessage: null };
    } catch (error) {
        return { isValid: false, errorMessage: 'Enter a valid URL' };
    }
};

export default validateUrl;
