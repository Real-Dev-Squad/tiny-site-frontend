import axios from 'axios';
import { useQuery } from 'react-query';

import { TINY_API_URL, TINY_API_URL_DETAIL } from '@/constants/url';

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

const useGetOriginalUrlQuery = (shortUrlCode: string, options: { enabled: boolean }) => {
    return useQuery({
        queryKey: ['originalUrl', shortUrlCode],
        queryFn: () => axios.get(`${TINY_API_URL_DETAIL}/${shortUrlCode}`).then((res) => res.data),
        ...options,
        retry: false,
    });
};

const useGetUrlsQuery = (userId: string, options: { enabled: boolean }) => {
    return useQuery({
        queryKey: ['urls'],
        queryFn: () =>
            axios
                .get(`${TINY_API_URL}/user/${userId}/urls`, {
                    withCredentials: true,
                })
                .then((res) => res.data),
        ...options,
        retry: false,
    });
};

export { useAuthenticatedQuery, useGetOriginalUrlQuery, useGetUrlsQuery };
