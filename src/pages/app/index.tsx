import React, { ChangeEvent, useState } from 'react';

import Button from '@/components/Button';
import InputBox from '@/components/InputBox';
import Layout from '@/components/Layout';
import Toast from '@/components/Toast';
import { TINY_SITE } from '@/constants/url';
import IsAuthenticated from '@/hooks/isAuthenticated';
import { urlRegex } from '@/utils/constants';
import shortenUrl from '@/utils/shortenUrl';

import CopyIcon from '../../components/icons/copy';
import ShareIcon from '../../components/icons/share';

interface InputSectionProps {
    url: string;
    setUrl: (url: string) => void;
    handleUrl: () => void;
}

interface OutputSectionProps {
    shortUrl: string;
    handleCopyUrl: () => void;
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

const App = () => {
    const [url, setUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [showInputBox, setShowInputBox] = useState<boolean>(false);

    const { isLoggedIn, userData } = IsAuthenticated();

    const handleCopyUrl = () => {
        if (shortUrl) {
            setToastMessage('Copied to clipboard');
            navigator.clipboard.writeText(shortUrl);
            setShowToast(true);
        } else {
            setToastMessage('No URL to copy');
        }
    };

    const displayErrorMessage = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setShowInputBox(false);
    };

    const generateShortUrl = async () => {
        const newShortUrl = await shortenUrl(url, userData);
        if (newShortUrl) {
            const fullShortUrl = `${TINY_SITE}/${newShortUrl}`;
            setShortUrl(fullShortUrl);
            setShowInputBox(true);
        }
    };

    const handleUrl = () => {
        if (!isLoggedIn) {
            displayErrorMessage('Not logged in');
        } else if (!url) {
            displayErrorMessage('Enter the URL');
        } else if (!urlRegex.test(url)) {
            displayErrorMessage('Enter a valid URL');
        } else {
            generateShortUrl();
        }
    };

    return (
        <Layout title="Home | URL Shortener">
            <div className="w-screen flex flex-col justify-center items-center h-container">
                <div className="flex flex-col justify-center items-center m-4">
                    <div className="w-full lg:w-[42rem] md:w-[32rem] sm:w-[22rem]">
                        <h1 className="text-4xl text-center text-white font-semibold">URL Shortener</h1>
                        <InputSection url={url} setUrl={setUrl} handleUrl={handleUrl} />
                        {showInputBox && <OutputSection shortUrl={shortUrl} handleCopyUrl={handleCopyUrl} />}
                    </div>
                </div>
                {showToast && (
                    <Toast
                        message={toastMessage}
                        isVisible={showToast}
                        timeToShow={3000}
                        onDismiss={() => setShowToast(false)}
                    />
                )}
            </div>
        </Layout>
    );
};

export default App;
