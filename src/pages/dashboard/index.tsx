import NoUrlFound from '@/components/Dashboard/NoUrlFound';
import UrlList from '@/components/Dashboard/UrlList';
import Layout from '@/components/Layout';
import LoginModal from '@/components/LoginModal';
import DashboardShimmer from '@/components/ShimmerEffect/DashboardShimmer';
import Toast from '@/components/Toast';
import useAuthenticated from '@/hooks/useAuthenticated';
import useToast from '@/hooks/useToast';
import { useGetUrlsQuery } from '@/services/api';
import { useDeleteUrlMutation } from '@/services/api';

const Dashboard = () => {
    const { showToast, toasts } = useToast();
    const { isLoggedIn, userData } = useAuthenticated();
    const {
        data: urls,
        isLoading,
        isError,
        refetch,
    } = useGetUrlsQuery(userData?.data?.id, { enabled: !!userData?.data?.id });
    const { mutateAsync: deleteUrl } = useDeleteUrlMutation();

    const deleteUrlHandler = async (shortUrl: string) => {
        const confirmDelete = confirm('Are you sure you want to delete this url?');
        if (confirmDelete) {
            try {
                await deleteUrl(shortUrl);
                showToast('URL deleted successfully', 3000, 'success');
                refetch();
            } catch (error) {
                showToast('Error while deleting URL', 3000, 'error');
            }
        }
    };

    const copyButtonHandler = (url: string) => {
        navigator.clipboard.writeText(url);
        showToast('Copied to clipboard', 3000, 'success');
    };

    return (
        <Layout title="Dashboard | URL Shortener">
            <div className="w-full flex flex-col items-center p-4 text-white bg-gray-900 min-h-[86vh]">
                {isLoading && <DashboardShimmer />}
                {isError || !urls?.urls?.length ? (
                    <NoUrlFound />
                ) : (
                    <>
                        {urls && (
                            <UrlList
                                urls={urls.urls}
                                copyButtonHandler={copyButtonHandler}
                                deleteUrlHandler={deleteUrlHandler}
                            />
                        )}
                    </>
                )}
                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} />
                ))}
                {!isLoggedIn && !isLoading && (
                    <LoginModal
                        onClose={() => void 0}
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
