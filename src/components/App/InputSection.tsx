import { ChangeEvent, FormEvent } from 'react';

import Button from '@/components/Button';
import InputBox from '@/components/InputBox';

interface InputSectionProps {
    url: string;
    setUrl: (url: string) => void;
    handleUrl: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({ url, setUrl, handleUrl }) => (
    <form
        className="flex flex-col justify-center items-center rounded-2xl mt-5 sm:mt-10 w-[100%] text-gray-400"
        onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleUrl();
        }}
    >
        <h1 className="text-3xl md:text-4xl xl:text-4xl text-center mb-8 text-white font-semibold">
            Enter a URL to shorten
        </h1>

        <div className="bg-gray-200 flex flex-row justify-center items-center space-y-0 space-x-0 rounded-2xl mt-5 sm:mt-10 w-[100%]">
            <label htmlFor="url-input" className="ml-2">
                🔗
            </label>
            <InputBox
                type="text"
                hideLabel={true}
                className="bg-gray-200 text-black w-full outline-none p-4 rounded-l-2xl"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                value={url}
                placeholder="Enter the URL"
                name="URL"
            />
            <Button
                type="submit"
                className="bg-gray-300 text-black text-lg rounded-r-2xl py-4 px-8 hover:bg-gray-400"
                testId="shorten-button"
                onClick={handleUrl}
            >
                Shorten
            </Button>
        </div>
    </form>
);

export default InputSection;
