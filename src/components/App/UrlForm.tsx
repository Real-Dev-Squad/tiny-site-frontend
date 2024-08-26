import React, { ChangeEvent, FormEvent } from 'react';
import { FaLink } from 'react-icons/fa6';

import Button from '@/components/Button';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <p className="text-black font-semibold text-base mt-1 w-full flex transition-opacity duration-500 ease-in-out">
            {message}
        </p>
    );
};

interface UrlFormProps {
    url: string;
    error: string | null;
    clearError: () => void;
    setUrl: (url: string) => void;
    onSubmit: (url: string) => void;
    loading: boolean;
}

const UrlForm: React.FC<UrlFormProps> = ({ url, setUrl, onSubmit, error, clearError, loading }) => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const url = formData.get('URL') as string | null;

        if (!url) return;

        onSubmit(url);
    };

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
        clearError();
    };
    const inputBorderClass = error ? 'border-2 border-red-500' : '';
    const buttonIcon = loading ? (
        <div
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-gray-600"
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    ) : (
        <FaLink />
    );

    return (
        <form
            onSubmit={handleSubmit}
            data-testid="url-form"
            className="flex flex-col items-center rounded-2xl w-full text-gray-400 text-center gap-3"
        >
            <div className="flex flex-col items-center justify-center mt-5 sm:mt-6 gap-5">
                <div className="flex flex-col items-center justify-center rounded-lg w-full">
                    <input
                        required
                        name="URL"
                        type="text"
                        value={url}
                        placeholder="Enter the URL"
                        onChange={handleUrlChange}
                        className={`text-black p-5 rounded-lg focus:outline-none w-11/12 sm:w-72 lg:w-96 h-11 ${inputBorderClass}`}
                    />

                    {error && <ErrorMessage message={error} />}
                </div>

                <Button
                    type="submit"
                    testId="shorten-button"
                    className="bg-white text-black text-lg rounded-lg mt-2 h-10 w-32 flex items-center justify-center space-x-2 transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                >
                    {buttonIcon}
                    <span className="font-medium">Shorten</span>
                </Button>
            </div>
        </form>
    );
};

export default UrlForm;
