import React, { useEffect, useState } from 'react';

import InputSection from '@/components/App/InputSection';
import OutputSection from '@/components/App/OutputSection';
import Layout from '@/components/Layout';
import LoginModal from '@/components/LoginModal';
import Modal from '@/components/Modal';
import { TINY_SITE } from '@/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';
import { useShortenUrlMutation } from '@/services/api';
import { ErrorResponse } from '@/types/url.types';
import { formatUrl } from '@/utils/formatUrl';
import validateUrl from '@/utils/validateUrl';

const App = () => {
    const [url, setUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showOutputModal, setShowOutputModal] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

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
        if (!url) {
            setIsProcessing(false);
            return;
        }
        const validationError = validateUrl(url);
        if (validationError) {
            setError(validationError);
            setIsProcessing(false);
            return;
        }

        try {
            const response = await shortenUrlMutation.mutateAsync({
                originalUrl: url,
                userData: userData,
            });
            const fullShortUrl = `${TINY_SITE}/${response.shortUrl}`;
            setShortUrl(fullShortUrl);
            setShowOutputModal(true);
            setError(null);
        } catch (e) {
            const error = e as ErrorResponse;
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const createNewHandler = () => {
        setUrl('');
        setShortUrl('');
        setShowOutputModal(false);
        setError(null);
    };

    const handleUrl = () => {
        if (isProcessing) return;
        if (!isLoggedIn) {
            setShowLoginModal(true);
            if (url) localStorage.setItem('url', url);
        } else {
            setIsProcessing(true);
            const formattedUrl = formatUrl(url);
            if (url) {
                generateShortUrl(formattedUrl);
            } else {
                setIsProcessing(false);
            }
        }
    };

    const clearError = () => setError(null);

    return (
        <Layout title="Home | URL Shortener">
            <div className="flex justify-center h-[90vh]">
                <div className="flex flex-col w-[100%]">
                    <InputSection
                        url={url}
                        setUrl={setUrl}
                        handleUrl={handleUrl}
                        error={error}
                        clearError={clearError}
                    />
                </div>
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
