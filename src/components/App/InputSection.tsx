import React, { ChangeEvent, FormEvent } from 'react';

import Button from '@/components/Button';

interface InputSectionProps {
    url: string;
    setUrl: (url: string) => void;
    handleUrl: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({ url, setUrl, handleUrl }) => (
    <form
        className="flex flex-col items-center rounded-2xl w-full text-gray-400 text-center"
        onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleUrl();
        }}
        data-testid="input-section"
    >
        <h1 className="text-3xl md:text-6xl xl:text-80px xl:leading-custom-100px text-center text-white font-semibold">
            Shorten Your URL
        </h1>

        <h3 className="text-2xl md:text-4xl md:leading-10 xl:text-5xl xl:leading-custom-60px text-center md:my-4 text-white font-semibold">
            Perfect Links Every Time
        </h3>

        <p className="text-xl text-white">Ready to shorten your URL? Enter your URL below</p>

        <div className="flex flex-col items-center justify-center mt-5 sm:mt-10 w-full gap-5 ">
            <div className="flex items-center justify-center rounded-lg w-full  sm:w-2/4">
                <input
                    type="text"
                    className="bg-gray-200 text-black p-4 rounded-lg focus:outline-none w-96 h-11"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                    value={url}
                    placeholder="Enter the URL"
                    name="URL"
                />
            </div>
            <Button
                type="submit"
                className="bg-gray-300 text-black text-lg rounded-lg px-8 hover:bg-gray-400 mt-2 sm:mt-0 sm:ml-2 h-9"
                testId="shorten-button"
                onClick={handleUrl}
            >
                Shorten
            </Button>
        </div>
    </form>
);

export default InputSection;
