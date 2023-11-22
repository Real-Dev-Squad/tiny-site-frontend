import axios from 'axios';
import { useEffect, useState } from 'react';

import { TINY_API_URL } from '@/constants/url';
import { UserTypes } from '@/types/user.types';

const useAuthenticated = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [userData, setUserData] = useState<UserTypes | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${TINY_API_URL}/users/self`, {
                    method: 'GET',
                    withCredentials: true,
                });
                if (response.status === 200) {
                    const userData = await response.data;
                    setUserData(userData.data);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, []);

    return { isLoggedIn, isFetching, error, userData };
};

export default useAuthenticated;
