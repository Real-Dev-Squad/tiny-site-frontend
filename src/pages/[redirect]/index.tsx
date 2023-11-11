import { useEffect, useState } from 'react';

import Head from 'next/head';
import RedirectIcon from '../../../public/assets/icons/redirect';
import { TINY_SITE } from '@/constants/url';
import fetchOriginalUrl from '@/utils/fetchOriginalUrl';
import { useRouter } from 'next/router';

interface LoaderTimerProps {
    timer: number;
    goButtonClickHandler: () => void;
}

const LoaderTimer = ({ timer, goButtonClickHandler }: LoaderTimerProps) => {
    if (timer < 1) {
        return (
            <div className="mt-4 flex flex-col items-center space-y-2">
                <RedirectIcon />
                <p className="text-1xl">Redirecting...</p>
            </div>
        );
    } else {
        return (
            <>
                <div className="loader border-t-4 rounded-full border-gray-500 animate-spin aspect-square w-20 flex justify-center items-center text-yellow-700 text-4xl font-bold mt-4">
                    {timer}
                </div>
                <button onClick={goButtonClickHandler} className="mt-4 p-2 bg-blue-500 text-white rounded-md">
                    Go
                </button>
            </>
        );
    }
};

const RedirectFooter = () => (
    <div className="absolute bottom-0 right-0 p-2 text-gray-500 w-screen flex justify-center items-center">
        <a
            className="text-sm text-gray-400 font-bold cursor-pointer hover:underline"
            href={TINY_SITE}
            target="_blank"
            rel="noopener noreferrer"
        >
            By <span className="font-bold">Real Dev Squad</span>
        </a>
    </div>
);

const Redirect = () => {
    const router = useRouter();
    const { redirect: shortUrlCode } = router.query as { redirect: string };
    const [originalUrl, setOriginalUrl] = useState('');
    const [timer, setTimer] = useState(5);
    const [isPremiumUser, setIsPremiumUser] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        setIsPremiumUser(false);

        if (shortUrlCode) {
            const fetchOriginalUrlAsync = async () => {
                try {
                    const url = await fetchOriginalUrl(shortUrlCode);
                    if (url) {
                        setOriginalUrl(url);
                    } else {
                        router.push('/');
                    }
                } catch (error) {
                    console.error('Error fetching original URL:', error);
                }
            };
            fetchOriginalUrlAsync();
        }

        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else if (timer === 0) {
            router.push(originalUrl);
        }
    }, [shortUrlCode, timer, originalUrl]);

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
        </>
    );
};

export default Redirect;
