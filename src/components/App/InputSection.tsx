import { ChangeEvent } from 'react';

import Button from '@/components/Button';
import InputBox from '@/components/InputBox';

interface InputSectionProps {
    url: string;
    setUrl: (url: string) => void;
    handleUrl: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({ url, setUrl, handleUrl }) => (
    <div className="bg-gray-200 flex flex-row justify-center items-center space-y-0 space-x-0 rounded-2xl mt-5 sm:mt-10">
        <InputBox
            type="text"
            hideLabel={true}
            className="bg-gray-200 w-full outline-none p-4 rounded-l-2xl"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
            value={url}
            placeholder="🔗 Enter the URL"
            name="URL"
        />
        <Button className="bg-gray-300 rounded-r-2xl p-4 hover:bg-gray-400" onClick={handleUrl}>
            Generate
        </Button>
    </div>
);

export default InputSection;
