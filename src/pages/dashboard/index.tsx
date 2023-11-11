import React, { useEffect, useState } from 'react';

import CopyIcon from '../../../public/assets/icons/copy';
import IsAuthenticated from '@/hooks/isAuthenticated';
import Layout from '@/components/Layout';
import { TINY_SITE } from '@/constants/url';
import Toast from '@/components/Toast';
import { UrlListResponseTypes } from '@/types/url.types';
import fetchUrls from '@/utils/fetchUrls';

interface TableRowProps {
    url: UrlListResponseTypes['urls'][0];
    index: number;
    copyButtonHandler: (url: string) => void;
}

interface TableBodyProps {
    urls: UrlListResponseTypes;
    copyButtonHandler: (url: string) => void;
}

const TableHeader = () => (
    <thead>
        <tr>
            <th className="border-2 p-2">S.No.</th>
            <th className="border-2 p-2">Original URL</th>
            <th className="border-2 p-2">Short URL</th>
            <th className="border-2 p-2">Created At</th>
        </tr>
    </thead>
);

const TableRow = ({ url, index, copyButtonHandler }: TableRowProps) => (
    <tr key={index} className="hover:bg-gray-700 w-full">
        <td className="border-2 p-2">{index + 1}</td>
        <td className="border-2 p-2 max-w-[300px] overflow-hidden overflow-ellipsis truncate">{url.OriginalUrl}</td>
        <td className="border-2 p-2 max-w-[150px]  overflow-hidden overflow-ellipsis truncate">
            <div className="flex justify-around items-center">
                <a href={`${TINY_SITE}/${url.ShortUrl}`} target="_blank" rel="noreferrer" className="text-blue-500">
                    {' '}
                    {TINY_SITE}/{url.ShortUrl}
                </a>
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        copyButtonHandler(`${TINY_SITE}/${url.ShortUrl}`);
                    }}
                >
                    <CopyIcon backgroundColor="white" />
                </div>
            </div>
        </td>
        <td className="border-2 p-2 max-w-[100px] ">{new Date(url.CreatedAt).toLocaleString()}</td>
    </tr>
);

const TableBody = ({ urls, copyButtonHandler }: TableBodyProps) => (
    <tbody className=" text-white text-center">
        {urls.urls?.map((url, index) => (
            <TableRow key={index} url={url} index={index} copyButtonHandler={copyButtonHandler} />
        ))}
    </tbody>
);

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
                        console.log('No URLs found');
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
            <div className="w-full flex flex-col justify-center items-center p-8 text-white bg-gray-900">
                <div className="flex justify-center items-center w-full">
                    <table className="w-full">
                        <TableHeader />
                        <TableBody urls={urls} copyButtonHandler={copyButtonHandler} />
                    </table>
                </div>
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
