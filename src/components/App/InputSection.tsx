import React, { ChangeEvent, FormEvent } from 'react';
import { FaLink } from 'react-icons/fa6';

import Button from '@/components/Button';

interface InputSectionProps {
    url: string;
    setUrl: (url: string) => void;
    handleUrl: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({ url, setUrl, handleUrl }) => (
    <form
        className="flex flex-col items-center rounded-2xl w-full text-gray-400 text-center gap-3 absolute top-48"
        onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleUrl();
        }}
        data-testid="input-section"
    >
        <h1 className="text-3xl md:text-6xl xl:text-80px sm:text-5xl text-center text-white font-semibold">
            Shorten Your URL
        </h1>

        <h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-center text-white font-semibold">
            Perfect Links Every Time
        </h3>

        <p className="xl:text-xl text-base text-white mt-5">Ready to shorten your URL? Enter your URL below</p>

        <div className="flex flex-col items-center justify-center mt-5 sm:mt-6 w-full gap-5 ">
            <div className="flex items-center justify-center rounded-lg w-full sm:w-2/4">
                <input
                    type="text"
                    className="text-black p-5 rounded-lg focus:outline-none w-10/12 sm:w-96 h-11"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                    value={url}
                    placeholder="Enter the URL"
                    name="URL"
                />
            </div>

            <Button
                type="submit"
                className="bg-white text-black text-lg rounded-lg mt-2 sm:mt-0 sm:ml-2 h-10 w-36 flex items-center justify-center space-x-2"
                testId="shorten-button"
                onClick={handleUrl}
            >
                <FaLink />
                <span>Shorten</span>
            </Button>
        </div>
    </form>
);

export default InputSection;
