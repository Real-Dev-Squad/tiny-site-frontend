import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import UserProfileButton from '@/components/Navbar/UserProfileButton';
import UserLoginShimmer from '@/components/ShimmerEffect/UserLoginShimmer';

interface DesktopMenuProps {
    isLoading: boolean;
    isLoggedIn: boolean;
    firstName: string;
    lastName: string;
    handleProfileClick: () => void;
    setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({
    isLoading,
    isLoggedIn,
    firstName,
    lastName,
    handleProfileClick,
    setShowLoginModal,
}) => {
    const router = useRouter();

    return (
        <ul className="hidden sm:flex gap-14 mr-14 items-center">
            <li className={`relative ${router.pathname === '/' ? 'border-b-2 border-white' : ''}`}>
                <Link href="/" className="text-white hover:text-gray-300">
                    Home
                </Link>
            </li>
            <li className={`relative ${router.pathname === '/dashboard' ? 'border-b-2 border-white' : ''}`}>
                <Link href="/dashboard" className="text-white hover:text-gray-300">
                    Dashboard
                </Link>
            </li>
            <li className="relative group">
                {isLoading ? (
                    <UserLoginShimmer />
                ) : (
                    <UserProfileButton
                        isLoggedIn={isLoggedIn}
                        firstName={firstName}
                        lastName={lastName}
                        handleProfileClick={handleProfileClick}
                        setShowLoginModal={setShowLoginModal}
                    />
                )}
            </li>
        </ul>
    );
};

export default DesktopMenu;
