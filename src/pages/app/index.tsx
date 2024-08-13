import React, { useEffect, useState } from 'react';

import InputSection from '@/components/App/InputSection';
import OutputSection from '@/components/App/OutputSection';
import Layout from '@/components/Layout';
import LoginModal from '@/components/LoginModal';
import Modal from '@/components/Modal';
import Toast from '@/components/Toast';
import { TINY_SITE } from '@/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';
import useToast from '@/hooks/useToast';
import { useShortenUrlMutation } from '@/services/api';
import { ErrorResponse } from '@/types/url.types';
import validateUrl from '@/utils/validateUrl';

const App = () => {
    const [url, setUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');
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

    const createNewHandler = () => {
        setUrl('');
        setShortUrl('');
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
            <div className="flex justify-center h-[90vh]">
                <div className="flex flex-col w-[100%]">
                    <InputSection url={url} setUrl={setUrl} handleUrl={handleUrl} />
                </div>
                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} />
                ))}
                {showLoginModal && (
                    <LoginModal onClose={() => setShowLoginModal(false)}>
                        <p className="text-black text-center mb-4">Log in to generate short links</p>
                    </LoginModal>
                )}
                {showOutputModal && (
                    <Modal
                        onClose={() => {
                            setShowOutputModal(false);
                            setUrl('');
                        }}
                        width="550px"
                        height="560px"
                    >
                        <OutputSection
                            shortUrl={shortUrl}
                            isLoaded={!!shortUrl}
                            originalUrl={url}
                            handleCreateNew={createNewHandler}
                        />
                    </Modal>
                )}
            </div>
        </Layout>
    );
};

export default App;
