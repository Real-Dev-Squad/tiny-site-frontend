import React, { useState } from 'react';

import InputSection from '@/components/App/InputSection';
import OutputSection from '@/components/App/OutputSection';
import Layout from '@/components/Layout';
import Toast from '@/components/Toast';
import { urlRegex } from '@/constants/constants';
import { TINY_SITE } from '@/constants/url';
import IsAuthenticated from '@/hooks/isAuthenticated';
import shortenUrl from '@/utils/shortenUrl';

const App = () => {
    const [url, setUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [showInputBox, setShowInputBox] = useState<boolean>(true);
    const [showOutputBox, setShowOutputBox] = useState<boolean>(false);

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
    };

    const generateShortUrl = async () => {
        const newShortUrl = await shortenUrl(url, userData);
        if (newShortUrl) {
            const fullShortUrl = `${TINY_SITE}/${newShortUrl}`;
            setShortUrl(fullShortUrl);
            setShowOutputBox(true);
            setShowInputBox(false);
        }
    };

    const createNewHandler = () => {
        setUrl('');
        setShortUrl('');
        setShowInputBox(true);
        setShowOutputBox(false);
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
            <div className="flex justify-center items-center h-[86vh]">
                <div className="flex flex-col justify-center items-center m-4 lg:w-[52rem] md:w-[42rem] sm:w-[22rem] w-[18rem]">
                    {showInputBox && <InputSection url={url} setUrl={setUrl} handleUrl={handleUrl} />}
                    {showOutputBox && (
                        <OutputSection
                            shortUrl={shortUrl}
                            originalUrl={url}
                            handleCopyUrl={handleCopyUrl}
                            handleCreateNew={createNewHandler}
                        />
                    )}
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
