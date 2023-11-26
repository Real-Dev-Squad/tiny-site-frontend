import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import LoaderTimer from '@/components/Redirect/LoaderTimer';
import NotFound from '@/components/Redirect/NotFound';
import RedirectFooter from '@/components/Redirect/RedirectFooter';
import { useGetOriginalUrlQuery } from '@/services/api';

const Redirect = () => {
    const router = useRouter();
    const { redirect: shortUrlCode } = router.query as { redirect: string };
    const [timer, setTimer] = useState(5);
    const [showTooltip, setShowTooltip] = useState(false);
    const isPremiumUser = false;
    const { data, isLoading, isError } = useGetOriginalUrlQuery(shortUrlCode, {
        enabled: !!shortUrlCode,
    });

    useEffect(() => {
        if (shortUrlCode && data?.url.originalUrl) {
            startTimer();
        }
    }, [timer, data]);

    const startTimer = () => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else if (timer === 0) {
            router.push(data?.url.originalUrl);
        }
    };

    const handleGoButtonClick = () => {
        if (isPremiumUser) {
            router.push(data?.url.originalUrl);
        } else {
            setShowTooltip(true);
        }
    };

    if (isLoading) {
        return (
            <section className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                <p className="text-lg">Loading...</p>
            </section>
        );
    }

    if (isError) {
        return <NotFound />;
    }

    return (
        <>
            <Head>
                <title>Redirecting...</title>
                <meta name="robots" content="noindex" />
            </Head>
            <section className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                <p className="text-lg">You are being redirected to:</p>
                <p className="text-blue-500 text-xl font-bold w-1/2 text-center truncate xl:w-1/2">
                    {data?.url.originalUrl}
                </p>
                <LoaderTimer timer={timer} goButtonClickHandler={handleGoButtonClick} />

                {showTooltip && !isPremiumUser && (
                    <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded-md">
                        The skip feature is exclusively available to Premium users.
                    </div>
                )}
                <RedirectFooter />
            </section>
        </>
    );
};
export default Redirect;
