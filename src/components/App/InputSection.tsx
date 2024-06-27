import React, { ChangeEvent, FormEvent } from 'react';

import Button from '@/components/Button';

interface InputSectionProps {
    url: string;
    setUrl: (url: string) => void;
    handleUrl: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({ url, setUrl, handleUrl }) => (
    <form
        className="flex flex-col items-center rounded-2xl mt-5 sm:mt-10 w-full text-gray-400"
        onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleUrl();
        }}
        data-testid="input-section"
    >
        <h1 className="text-4xl md:text-6xl xl:text-7xl text-center mb-4 text-white font-semibold font-outline-1">
            Shorten URL
        </h1>
        <h3 className="text-1xl md:text-2xl xl:text-3xl text-center  my-3 text-white font-outline-1">
            Tiny links for big wins
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-center mt-5 sm:mt-10 w-full">
            <div className="bg-gray-200 flex items-center rounded-2xl w-full  sm:w-2/4">
                <label htmlFor="url-input" className="ml-2">
                    🔗
                </label>
                <input
                    type="text"
                    className="bg-gray-200 text-black p-4 rounded-2xl focus:outline-none w-full"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                    value={url}
                    placeholder="Enter the URL"
                    name="URL"
                />
            </div>
            <Button
                type="submit"
                className="bg-gray-300 text-black text-lg rounded-2xl py-2 sm:py-4 px-8 hover:bg-gray-400 mt-2 sm:mt-0 sm:ml-2"
                testId="shorten-button"
                onClick={handleUrl}
            >
                Shorten
            </Button>
        </div>
    </form>
);

export default InputSection;
