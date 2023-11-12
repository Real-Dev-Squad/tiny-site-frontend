import React, { useState } from 'react';

import InputSection from '@/components/App/InputSection';
import IsAuthenticated from '@/hooks/isAuthenticated';
import Layout from '@/components/Layout';
import LoginModal from '@/components/App/LoginModel';
import OutputSection from '@/components/App/OutputSection';
import { TINY_SITE } from '@/constants/url';
import Toast from '@/components/Toast';
import shortenUrl from '@/utils/shortenUrl';
import { urlRegex } from '@/utils/constants';

const App = () => {
    const [url, setUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [showInputBox, setShowInputBox] = useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

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
            setShowLoginModal(true);
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
                        {isLoggedIn ? (
                            <>
                                <h1 className="text-4xl text-center text-white font-semibold">URL Shortener</h1>
                                <InputSection url={url} setUrl={setUrl} handleUrl={handleUrl} />
                            </>
                        ) : (
                            <LoginModal
                                onClose={() => setShowLoginModal(false)}
                                children={
                                    <>
                                        <p className="text-white text-center mb-4">
                                            Welcome to URL Shortener! To create a short URL, please log in.
                                        </p>
                                    </>
                                }
                            />
                        )}
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
                {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
            </div>
        </Layout>
    );
};

export default App;
