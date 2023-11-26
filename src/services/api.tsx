import axios from 'axios';
import { useQuery } from 'react-query';

import { TINY_API_URL } from '@/constants/url';

const useAuthenticatedQuery = () => {
    return useQuery({
        queryKey: ['useAuthenticatedQuery'],
        queryFn: () =>
            axios
                .get(`${TINY_API_URL}/users/self`, {
                    withCredentials: true,
                })
                .then((res) => res.data),
        retry: false,
    });
};

export { useAuthenticatedQuery };
