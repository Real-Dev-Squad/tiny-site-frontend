import React, { useEffect, useState } from 'react';

import InputSection from '@/components/App/InputSection';
import OutputSection from '@/components/App/OutputSection';
import Layout from '@/components/Layout';
import LoginModal from '@/components/LoginModal';
import Toast from '@/components/Toast';
import { TINY_SITE } from '@/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';
import useToast from '@/hooks/useToast';
import { useShortenUrlMutation } from '@/services/api';
import validateUrl from '@/utils/validateUrl';

const App = () => {
    const [url, setUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');
    const [showInputBox, setShowInputBox] = useState<boolean>(true);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

    const { showToast, toasts } = useToast();
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

    const generateShortUrl = async (url: string) => {
        if (!validateUrl(url, showToast)) return;

        const newShortUrl = await shortenUrlMutation.mutateAsync({
            originalUrl: url,
            userData: userData,
        });

        const fullShortUrl = `${TINY_SITE}/${newShortUrl}`;
        setShortUrl(fullShortUrl);
        setShowInputBox(false);
    };

    const handleCopyUrl = () => {
        if (shortUrl) {
            navigator.clipboard.writeText(shortUrl);
            showToast('Copied to clipboard', 3000, 'success');
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
            if (!shortenUrlMutation.isLoading) {
                generateShortUrl(url);
            }
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
                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} />
                ))}
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
