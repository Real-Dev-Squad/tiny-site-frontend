import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import LoaderTimer from '@/components/Redirect/LoaderTimer';
import NotFound from '@/components/Redirect/NotFound';
import RedirectFooter from '@/components/Redirect/RedirectFooter';
import fetchOriginalUrl from '@/utils/fetchOriginalUrl';

const Redirect = () => {
    const router = useRouter();
    const { redirect: shortUrlCode } = router.query as { redirect: string };
    const [originalUrl, setOriginalUrl] = useState('');
    const [timer, setTimer] = useState(5);
    const [isPremiumUser] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (shortUrlCode) {
            const fetchOriginalUrlAsync = async () => {
                try {
                    const url = await fetchOriginalUrl(shortUrlCode);
                    if (url) {
                        setOriginalUrl(url);
                        startTimer();
                    } else {
                        setNotFound(true);
                    }
                } catch (error) {
                    console.error('Error fetching original URL:', error);
                    setNotFound(true);
                }
            };
            fetchOriginalUrlAsync();
        }
    }, [shortUrlCode, timer]);

    const startTimer = () => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else if (timer === 0) {
            router.push(originalUrl);
        }
    };

    const handleGoButtonClick = () => {
        if (isPremiumUser) {
            router.push(originalUrl);
        } else {
            setShowTooltip(true);
        }
    };

    return (
        <>
            <Head>
                <title>Redirecting...</title>
                <meta name="robots" content="noindex" />
            </Head>
            {notFound ? (
                <NotFound />
            ) : (
                <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                    <p className="text-lg">You are being redirected to:</p>
                    <p className="text-blue-500 text-xl font-bold w-1/2 text-center truncate xl:w-1/2">{originalUrl}</p>
                    <LoaderTimer timer={timer} goButtonClickHandler={handleGoButtonClick} />

                    {showTooltip && !isPremiumUser && (
                        <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded-md">
                            The skip feature is exclusively available to Premium users.
                        </div>
                    )}
                    <RedirectFooter />
                </div>
            )}
        </>
    );
};
export default Redirect;
