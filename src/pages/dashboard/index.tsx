import React, { useEffect, useState } from 'react';

import IsAuthenticated from '@/hooks/isAuthenticated';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Toast from '@/components/Toast';
import UrlListItem from '@/components/Dashboard/UrlListItem';
import { UrlType } from '@/types/url.types';
import fetchUrls from '@/utils/fetchUrls';

const Dashboard = () => {
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const { isLoggedIn, userData } = IsAuthenticated();
    const [urls, setUrls] = useState<UrlType[]>([]);

    const copyButtonHandler = (url: string) => {
        navigator.clipboard.writeText(url);
        setToastMessage('Copied to clipboard');
        setShowToast(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isLoggedIn && userData) {
                    const urls = await fetchUrls(userData);
                    if (urls) {
                        setUrls(urls);
                    }
                }
            } catch (error) {
                console.error('Error fetching URLs:', error);
            }
        };

        fetchData();
    }, [isLoggedIn, userData]);

    return (
        <Layout title="Dashboard | URL Shortener">
            <div className="w-[full] flex flex-col justify-center items-center p-8 text-white bg-gray-900 ">
                {urls.length ? (
                    <ul className="justify-center items-center w-full">
                        {urls.map((url) => (
                            <UrlListItem key={url.ShortUrl} url={url} copyButtonHandler={copyButtonHandler} />
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col justify-center items-center w-full h-[76.8vh]">
                        <p className="text-white">No URLs found</p>
                        <Link
                            href="/"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
                        >
                            Create one
                        </Link>
                    </div>
                )}

                {showToast && (
                    <Toast
                        message={toastMessage}
                        isVisible={showToast}
                        timeToShow={3000}
                        onDismiss={() => setShowToast(false)}
                    />
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;
