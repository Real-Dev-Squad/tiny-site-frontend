import React, { useState } from 'react';

import UrlList from '@/components/Dashboard/UrlList';
import Layout from '@/components/Layout';
import LoginModal from '@/components/LoginModal';
import DashboardShimmer from '@/components/ShimmerEffect/DashboardShimmer';
import Toast from '@/components/Toast';
import useAuthenticated from '@/hooks/useAuthenticated';
import { useGetUrlsQuery } from '@/services/api';

const Dashboard = () => {
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const { isLoggedIn, userData } = useAuthenticated();
    const { data: urls, isLoading } = useGetUrlsQuery(userData?.id, {
        enabled: !!userData?.id,
    });

    const copyButtonHandler = (url: string) => {
        navigator.clipboard.writeText(url);
        setToastMessage('Copied to clipboard');
        setShowToast(true);
    };

    return (
        <Layout title="Dashboard | URL Shortener">
            <div className="w-full flex flex-col justify-center items-center p-4 text-white bg-gray-900 min-h-[86vh]">
                {isLoading && <DashboardShimmer />}
                {urls && <UrlList urls={urls.urls} copyButtonHandler={copyButtonHandler} />}
                {showToast && (
                    <Toast
                        message={toastMessage}
                        isVisible={showToast}
                        timeToShow={3000}
                        onDismiss={() => setShowToast(false)}
                        type="success"
                    />
                )}
                {!isLoggedIn && !isLoading && (
                    <LoginModal
                        onClose={() => setShowToast(false)}
                        children={
                            <p className="text-white text-center mb-4">Login to view your URLs and create new ones</p>
                        }
                    />
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;
