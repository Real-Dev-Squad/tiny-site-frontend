import { useEffect, useState } from 'react';
import { TINY_API_URL } from '@/constants/url';
import { UserTypes } from '@/types/user.types';

const IsAuthenticated = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<UserTypes | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${TINY_API_URL}/users/self`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.status === 200) {
                    const userData = await response.json();
                    setUserData(userData.data);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (err) {
                setIsLoggedIn(false);
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return { isLoggedIn, userData };
};

export default IsAuthenticated;
