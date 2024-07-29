import React, { useEffect, useState } from 'react';

import InputSection from '@/components/App/InputSection';
import OutputSection from '@/components/App/OutputSection';
import SignInWithGoogleIcon from '@/components/icons/signWithGoogle';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import Toast from '@/components/Toast';
import { TINY_SITE } from '@/constants/url';
import { TINY_API_GOOGLE_LOGIN } from '@/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';
import useToast from '@/hooks/useToast';
import { useShortenUrlMutation } from '@/services/api';
import { ErrorResponse } from '@/types/url.types';
import validateUrl from '@/utils/validateUrl';

const App = () => {
    const [url, setUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');
    const [showInputBox, setShowInputBox] = useState<boolean>(true);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showOutputModal, setShowOutputModal] = useState<boolean>(false);

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

        try {
            const response = await shortenUrlMutation.mutateAsync({
                originalUrl: url,
                userData: userData,
            });

            const fullShortUrl = `${TINY_SITE}/${response.shortUrl}`;
            setShortUrl(fullShortUrl);
            setShowInputBox(false);
            setShowOutputModal(true);
        } catch (e) {
            const error = e as ErrorResponse;
            if (error.response && error.response.data && error.response.data.message) {
                showToast(error.response.data.message, 3000, 'error');
            } else {
                showToast('An unexpected error occurred', 3000, 'error');
            }
            setUrl('');
        }
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
        setShowOutputModal(false);
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
                    {showInputBox && <InputSection url={url} setUrl={setUrl} handleUrl={handleUrl} />}
                </div>
                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} />
                ))}
                {showLoginModal && (
                    <Modal onClose={() => setShowLoginModal(false)} title="Please log in">
                        <p className="text-white text-center mb-4">Log in to generate short links</p>
                        <a
                            href={TINY_API_GOOGLE_LOGIN}
                            data-testid="sign-in-with-google-button"
                            className="flex items-center justify-center"
                        >
                            <SignInWithGoogleIcon />
                        </a>
                    </Modal>
                )}
                {showOutputModal && (
                    <Modal onClose={() => setShowOutputModal(false)} width="400px" height="400px">
                        <OutputSection
                            shortUrl={shortUrl}
                            isLoaded={!!shortUrl}
                            originalUrl={url}
                            handleCopyUrl={handleCopyUrl}
                            handleCreateNew={createNewHandler}
                        />
                    </Modal>
                )}
            </div>
        </Layout>
    );
};

export default App;
