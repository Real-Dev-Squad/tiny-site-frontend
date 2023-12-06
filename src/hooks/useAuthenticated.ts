import { useAuthenticatedQuery } from '@/services/api';

const useAuthenticated = () => {
    const { data: userData, isError, isLoading } = useAuthenticatedQuery();
    const isLoggedIn = !isError && !isLoading;
    return { isLoggedIn, userData, isLoading };
};

export default useAuthenticated;
