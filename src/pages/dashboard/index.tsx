import Button from '@/components/Button';
import { DashboardLayout } from '@/components/Dashboard/dashboard-layout';
import NoUrlFound from '@/components/Dashboard/NoUrlFound';
import UrlListItem from '@/components/Dashboard/UrlListItem';
import Layout from '@/components/Layout';
import LoginModal from '@/components/LoginModal';
import DashboardShimmer from '@/components/ShimmerEffect/DashboardShimmer';
import Toast from '@/components/Toast';
import useAuthenticated from '@/hooks/useAuthenticated';
import useToast from '@/hooks/useToast';
import { useGetUrlsQuery } from '@/services/api';

const Dashboard = () => {
    const { showToast, toasts } = useToast();
    const { isLoggedIn, userData } = useAuthenticated();
    const { data, isLoading, isError } = useGetUrlsQuery({ enabled: !!userData?.data?.id });

    const copyButtonHandler = (url: string) => {
        navigator.clipboard.writeText(url);
        showToast('Copied to clipboard', 3000, 'success');
    };

    const reloadPage = () => {
        window.location.reload();
    };

    if (!isLoggedIn) {
        return (
            <Layout title="Dashboard | URL Shortener">
                <div className="min-h-[calc(100vh-145px)]">
                    <LoginModal
                        onClose={() => void 0}
                        children={
                            <p className="text-white text-center mb-4">Login to view your URLs and create new ones</p>
                        }
                    />
                </div>
            </Layout>
        );
    }

    if (isLoading) {
        return (
            <Layout title="Dashboard | URL Shortener">
                <DashboardLayout>
                    <DashboardShimmer />
                </DashboardLayout>
            </Layout>
        );
    }

    if (isError) {
        return (
            <Layout title="Dashboard | URL Shortener">
                <div className="h-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-center">
                    <h5 className="text-gray-50 text-2xl pb-4 font-bold">
                        Oops, we're unable to get your links at this time.
                    </h5>
                    <Button
                        onClick={reloadPage}
                        className="bg-blue-600 text-white h-9 font-medium text-sm px-4 rounded-lg hover:bg-blue-700 transition active:scale-95"
                    >
                        Reload page
                    </Button>
                </div>
            </Layout>
        );
    }

    if (!data?.urls.length) {
        return (
            <Layout title="Dashboard | URL Shortener">
                <NoUrlFound />
            </Layout>
        );
    }

    return (
        <Layout title="Dashboard | URL Shortener">
            <div className="w-full flex flex-col items-center p-4 text-white bg-gray-900 min-h-[86vh]">
                <ul className="w-full space-y-3">
                    {data.urls.map((url) => (
                        <UrlListItem key={url.shortUrl} url={url} copyButtonHandler={copyButtonHandler} />
                    ))}
                </ul>

                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} />
                ))}
            </div>
        </Layout>
    );
};

export default Dashboard;
