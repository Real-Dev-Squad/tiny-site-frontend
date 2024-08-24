import React, { useEffect, useState } from 'react';

import HomeText from '@/components/App/HomeText';
import OutputSection from '@/components/App/OutputSection';
import UrlForm from '@/components/App/UrlForm';
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

    const { isLoggedIn, userData } = useAuthenticated();

    const shortenUrlMutation = useShortenUrlMutation({
        onSuccess: (res) => {
            setError(null);
            const fullShortUrl = `${TINY_SITE}/${res.shortUrl}`;
            setShortUrl(fullShortUrl);
            setShowOutputModal(true);
            localStorage.removeItem('url');
        },
        onError: (error: ErrorResponse) => {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
                return;
            }
            setError('An unexpected error occurred');
        },
    });

    const createNewHandler = () => {
        setUrl('');
        setShortUrl('');
        setShowOutputModal(false);
        setError(null);
    };

    const createShortenedUrl = (originalUrl: string) => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            localStorage.setItem('url', originalUrl);
            return;
        }

        const validationError = validateUrl(url);

        if (validationError) {
            setError(validationError);
            return;
        }

        const formattedUrl = formatUrl(url);
        shortenUrlMutation.mutate({ originalUrl: formattedUrl, userData });
    };

    const clearError = () => setError(null);

    useEffect(() => {
        const localUrl = localStorage.getItem('url');
        if (!isLoggedIn || !localUrl) return;

        setUrl(localUrl);
    }, [isLoggedIn]);

    return (
        <Layout
            title="Home | URL Shortener"
            classNames={{ container: 'h-screen flex flex-col', main: 'flex-1 grid place-items-center' }}
        >
            <div className="-mt-44 w-full">
                <HomeText />
                <UrlForm
                    url={url}
                    error={error}
                    setUrl={setUrl}
                    clearError={clearError}
                    onSubmit={createShortenedUrl}
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
        </Layout>
    );
};

export default App;
