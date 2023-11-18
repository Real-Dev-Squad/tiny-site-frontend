import React, { useEffect, useState } from 'react';

import InputSection from '@/components/App/InputSection';
import OutputSection from '@/components/App/OutputSection';
import Layout from '@/components/Layout';
import LoginModal from '@/components/LoginModal';
import Toast from '@/components/Toast';
import { urlRegex } from '@/constants/constants';
import { TINY_SITE } from '@/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';
import { ToastType } from '@/types/toast.tyes';
import shortenUrl from '@/utils/shortenUrl';

const App = () => {
    const [url, setUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');
    const [showInputBox, setShowInputBox] = useState<boolean>(true);
    const [showOutputBox, setShowOutputBox] = useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [toast, setToast] = useState<ToastType>({
        message: '',
        type: 'success',
        onDismiss: () => {
            setToast({ ...toast, isVisible: false });
        },
        isVisible: false,
    });

    const { isLoggedIn, userData } = useAuthenticated();
    useEffect(() => {
        const localUrl = localStorage.getItem('url');

        if (isLoggedIn && localUrl) {
            setUrl(localUrl);
            generateShortUrl(localUrl);
            localStorage.removeItem('url');
        }
    }, [isLoggedIn, url]);

    const handleCopyUrl = () => {
        if (shortUrl) {
            navigator.clipboard.writeText(shortUrl);
            showToast('Copied to clipboard', 'success');
        }
    };

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({
            message,
            type,
            isVisible: true,
            onDismiss: () => setToast({ ...toast, isVisible: false }),
        });
    };

    const generateShortUrl = async (url: string) => {
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
            setShowLoginModal(true);
            if (url) localStorage.setItem('url', url);
        } else if (!url) {
            showToast('Enter the URL', 'info');
        } else if (!urlRegex.test(url)) {
            showToast('Enter a valid URL', 'info');
        } else {
            generateShortUrl(url);
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
                            isLoaded={!!shortUrl}
                            originalUrl={url}
                            handleCopyUrl={handleCopyUrl}
                            handleCreateNew={createNewHandler}
                        />
                    )}
                </div>
                {toast.isVisible && (
                    <Toast
                        message={toast.message}
                        isVisible={toast.isVisible}
                        timeToShow={3000}
                        type={toast.type}
                        onDismiss={toast.onDismiss}
                    />
                )}
                {showLoginModal && (
                    <LoginModal
                        onClose={() => setShowLoginModal(false)}
                        children={<p className="text-white text-center mb-4">Log in to generate short links</p>}
                    />
                )}
            </div>
        </Layout>
    );
};

export default App;
