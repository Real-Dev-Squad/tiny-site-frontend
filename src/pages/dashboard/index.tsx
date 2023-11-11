import React, { useEffect, useState } from 'react';
import { UrlListResponseTypes, UrlType } from '@/types/url.types';

import CopyIcon from '../../../public/assets/icons/copy';
import InternetIcon from '../../../public/assets/icons/internet';
import IsAuthenticated from '@/hooks/isAuthenticated';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { TINY_SITE } from '@/constants/url';
import Toast from '@/components/Toast';
import fetchUrls from '@/utils/fetchUrls';
import formatDate from '@/utils/formatDate';

interface UrlListItemProps {
    url: UrlType;
    copyButtonHandler: (url: string) => void;
}

const UrlListItem = ({ url, copyButtonHandler }: UrlListItemProps) => {
    return (
        <li className="flex  m-2 border-gray-50 rounded-lg border-2 bg-white px-4 py-2 w-full">
            <div className="flex items-center justify-center  ">
                <InternetIcon width={50} height={50} />
            </div>
            <div className="flex flex-col sm:flex-row w-full">
                <div className="flex shrink items-center  w-[60%]">
                    <div className="ml-2 sm:ml-4 w-[100%]">
                        <div className="flex max-w-fit items-center space-x-2 ">
                            <Link
                                href={`${TINY_SITE}/${url.ShortUrl}`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full max-w-[140px] truncate text-sm font-semibold text-blue-800 sm:max-w-[300px] sm:text-base md:max-w-[360px] xl:max-w-[500px]"
                            >
                                {TINY_SITE}/{url.ShortUrl}
                            </Link>
                            <button
                                className="group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
                                onClick={() => copyButtonHandler(url.OriginalUrl)}
                            >
                                <span className="sr-only">Copy</span>
                                <CopyIcon width={15} height={15} />
                            </button>
                        </div>
                        <div className="flex max-w-fit items-center space-x-1">
                            <Link
                                href={url.OriginalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="xs:block  max-w-[200px] truncate text-sm font-medium text-gray-700 underline-offset-2 hover:underline sm:max-w-[300px] md:max-w-[400px] xl:max-w-[440px]"
                            >
                                {url.OriginalUrl}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2 ml-auto ">
                    <p className="whitespace-nowrap text-sm text-gray-500">
                        <span className="font-bold">Created on : </span> {formatDate(url.CreatedAt)}
                    </p>
                </div>
            </div>
        </li>
    );
};

const Dashboard = () => {
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const { isLoggedIn, userData } = IsAuthenticated();
    const [urls, setUrls] = useState<UrlListResponseTypes>({ message: '', urls: [] });

    const copyButtonHandler = (url: string) => {
        navigator.clipboard.writeText(url);
        setToastMessage('Copied to clipboard');
        setShowToast(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isLoggedIn && userData) {
                    const data = await fetchUrls(userData);
                    if (data) {
                        setUrls(data);
                    } else {
                        setUrls({ message: 'Error fetching URLs', urls: [] });
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
                {urls?.urls?.length ? (
                    <ul className="justify-center items-center w-full">
                        {urls.urls.map((url) => (
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
