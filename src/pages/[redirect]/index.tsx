import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ErrorPage from '@/components/Redirect/ErrorPage';
import LoaderTimer from '@/components/Redirect/LoaderTimer';
import RedirectFooter from '@/components/Redirect/RedirectFooter';
import RedirectShimmer from '@/components/ShimmerEffect/RedirectShimmer';
import { TINY_API_URL } from '@/constants/url';
import { useGetOriginalUrlQuery } from '@/services/api';

const Redirect = () => {
    const router = useRouter();
    const { redirect: shortUrlCode } = router.query as { redirect: string };
    const [timer, setTimer] = useState(3);
    const [isLinkEnabled, setIsLinkEnabled] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const isPremiumUser = false;
    const { data, isLoading, isError } = useGetOriginalUrlQuery(shortUrlCode, {
        enabled: !!shortUrlCode,
    });

    useEffect(() => {
        if (shortUrlCode && `${TINY_API_URL}/redirect/${shortUrlCode}`) {
            startTimer();
        }
    }, [timer, data]);

    const startTimer = () => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else if (timer === 0) {
            setIsLinkEnabled(true);
            router.push(`${TINY_API_URL}/redirect/${shortUrlCode}`);
        }
    };

    const handleGoButtonClick = () => {
        if (isPremiumUser) {
            router.push(`${TINY_API_URL}/redirect/${shortUrlCode}`);
        } else {
            setShowTooltip(true);
        }
    };

    if (isLoading) return <RedirectShimmer />;
    if (isError) return <ErrorPage />;

    const handleManualRedirect = () => {
        router.push(`${TINY_API_URL}/redirect/${shortUrlCode}`);
    };

    return (
        <>
            <Head>
                <title>Redirecting...</title>
                <meta name="robots" content="noindex" />
            </Head>
            <section className="w-screen min-h-screen flex flex-col items-center justify-center text-white p-4 overflow-hidden">
                <div className="flex items-center justify-center mb-4">
                    <Image src="/rds.png" alt="logo" width={70} height={70} className="mr-2" />
                </div>
                <p className="text-xl font-medium py-4">You are being redirected to:</p>
                <p className="text-white text-xl font-bold w-1/2 text-center truncate xl:w-1/2">
                    {data?.url.originalUrl}
                </p>
                <LoaderTimer timer={timer} goButtonClickHandler={handleGoButtonClick} />

                <p className="mt-4 text-lg text-center">
                    If you are not redirected within a few seconds, please{' '}
                    <button
                        onClick={handleManualRedirect}
                        disabled={!isLinkEnabled}
                        className={`text-blue-500 underline ${!isLinkEnabled ? 'cursor-not-allowed text-white' : ''}`}
                    >
                        click here
                    </button>
                    .
                </p>

                {showTooltip && !isPremiumUser && (
                    <div className="mt-2 p-2 bg-yellow-100 text-black rounded-md">
                        The skip feature is exclusively available to Premium users.
                    </div>
                )}
                <RedirectFooter />
            </section>
        </>
    );
};

export default Redirect;
