import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import GoogleIcon from '../../../public/assets/icons/google';
import DownArrowIcon from '../../../public/assets/icons/downArrow';
import IsAuthenticated from '@/hooks/isAuthenticated';
import { TINY_API_GOOGLE_LOGIN, TINY_API_LOGOUT } from '@/constants/url';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { isLoggedIn: isAuth, userData } = IsAuthenticated();

    useEffect(() => {
        setIsLoggedIn(isAuth);
        if (userData) {
            const username = userData.Username;
            const [first, last] = username.split(' ');
            setFirstName(first);
            setLastName(last);
        }
    }, [isAuth, userData]);

    const toggleDropdown = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex items-center justify-between">
                <a href="#" className="text-white text-2xl font-bold">
                    URL Shortener
                </a>

                <ul className={'lg:flex space-x-4'}>
                    <li className="relative group">
                        {isLoggedIn ? (
                            <Button type="button" onClick={toggleDropdown} className="text-white focus:outline-none">
                                <div className="flex items-center space-x-2">
                                    <ProfileIcon firstName={firstName} lastName={lastName} size={50} />
                                    <span> {firstName}</span>
                                    <DownArrowIcon />
                                </div>
                            </Button>
                        ) : (
                            <a
                                className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                href={TINY_API_GOOGLE_LOGIN}
                                data-testid="google-login"
                            >
                                <GoogleIcon />

                                <span>Sign In</span>
                            </a>
                        )}
                    </li>
                    <ul className={`${menuOpen ? 'block' : 'hidden'} absolute top-[8vh] right-0 bg-gray-800 p-2 z-10`}>
                        <li>
                            <a href="#" className="text-white hover:bg-gray-700 block px-4 py-2">
                                Profile
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:bg-gray-700 block px-4 py-2">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:bg-gray-700 block px-4 py-2">
                                Settings
                            </a>
                        </li>
                        <li>
                            <a href={TINY_API_LOGOUT} className="text-white hover:bg-gray-700 block px-4 py-2">
                                Sign Out
                            </a>
                        </li>
                    </ul>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
