import React from 'react';

import Button from '@/components/Button';
import InputBox from '@/components/InputBox';

import CopyIcon from '../../../public/assets/icons/copy';
import ShareIcon from '../../../public/assets/icons/share';

interface OutputSectionProps {
    shortUrl: string;
    handleCopyUrl: () => void;
}

const OutputSection: React.FC<OutputSectionProps> = ({ shortUrl, handleCopyUrl }) => (
    <div className="bg-gray-200 flex flex-row justify-center items-center space-y-0 space-x-0 rounded-2xl mt-2">
        <InputBox
            type="text"
            name="URL"
            hideLabel={true}
            className="bg-gray-200 w-full outline-none p-4 rounded-l-2xl"
            value={shortUrl}
            placeholder="Copy the URL"
        />
        <a
            type="button"
            className="bg-gray-200  px-2 py-4 hover:bg-gray-400"
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
        >
            <ShareIcon />
        </a>
        <Button
            type="button"
            className="bg-gray-200 rounded-r-2xl px-2 py-4 hover:bg-gray-400"
            testId="copy-button"
            onClick={handleCopyUrl}
        >
            <CopyIcon />
        </Button>
    </div>
);

export default OutputSection;
