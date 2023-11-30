import React, { useEffect, useState } from 'react';

import InputSection from '@/components/App/InputSection';
import OutputSection from '@/components/App/OutputSection';
import Layout from '@/components/Layout';
import LoginModal from '@/components/LoginModal';
import Toast from '@/components/Toast';
import { urlRegex } from '@/constants/constants';
import { TINY_SITE } from '@/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';
import { useShortenUrlMutation } from '@/services/api';
import { ToastType } from '@/types/toast.tyes';

const App = () => {
    const [url, setUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');
    const [showInputBox, setShowInputBox] = useState<boolean>(true);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [toast, setToast] = useState<ToastType>({
        message: '',
        type: 'success',
        isVisible: false,
        onDismiss: () => {
            setToast({ ...toast, isVisible: false });
        },
    });

    const { isLoggedIn, userData } = useAuthenticated();
    const shortenUrlMutation = useShortenUrlMutation();

    useEffect(() => {
        const localUrl = localStorage.getItem('url');

        if (isLoggedIn && localUrl) {
            setUrl(localUrl);
            generateShortUrl(localUrl);
            localStorage.removeItem('url');
        }
    }, [isLoggedIn]);

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({
            message,
            type,
            isVisible: true,
            onDismiss: () => setToast({ ...toast, isVisible: false }),
        });
    };

    const validateUrl = (url: string) => {
        if (!url) {
            showToast('Enter the URL', 'info');
            return false;
        }

        if (!urlRegex.test(url)) {
            showToast('Enter a valid URL', 'info');
            return false;
        }

        return true;
    };

    const generateShortUrl = async (url: string) => {
        if (!validateUrl(url)) return;

        try {
            const newShortUrl = await shortenUrlMutation.mutateAsync({
                originalUrl: url,
                userData: userData,
            });

            const fullShortUrl = `${TINY_SITE}/${newShortUrl}`;
            setShortUrl(fullShortUrl);
            setShowInputBox(false);
        } catch (error) {
            showToast('Error shortening URL', 'error');
        }
    };

    const handleCopyUrl = () => {
        if (shortUrl) {
            navigator.clipboard.writeText(shortUrl);
            showToast('Copied to clipboard', 'success');
        }
    };

    const createNewHandler = () => {
        setUrl('');
        setShortUrl('');
        setShowInputBox(true);
    };

    const handleUrl = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            if (url) localStorage.setItem('url', url);
        } else {
            generateShortUrl(url);
        }
    };

    return (
        <Layout title="Home | URL Shortener">
            <div className="flex justify-center items-center h-[86vh]">
                <div className="flex flex-col justify-center items-center m-4  w-[100%]">
                    {showInputBox ? (
                        <InputSection url={url} setUrl={setUrl} handleUrl={handleUrl} />
                    ) : (
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
                        onDismiss={() => setToast({ ...toast, isVisible: false })}
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
