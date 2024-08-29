import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdOutlineLogout } from 'react-icons/md';

import UserProfileButton from '@/components/Navbar/UserProfileButton';
import UserLoginShimmer from '@/components/ShimmerEffect/UserLoginShimmer';
import { TINY_API_LOGOUT } from '@/constants/url';

const ProfileButton: React.FC<{
    isLoading: boolean;
    isLoggedIn: boolean;
    firstName: string;
    lastName: string;
    handleProfileClick: () => void;
    setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isLoading, isLoggedIn, firstName, lastName, handleProfileClick, setShowLoginModal }) => {
    const [showSignOutButton, setShowSignOutButton] = useState<boolean>(false);

    const handleProfileButtonClick = () => {
        handleProfileClick();
        setShowSignOutButton((prev) => !prev);
    };

    if (isLoading) {
        return <UserLoginShimmer />;
    }

    return (
        <>
            <UserProfileButton
                isLoggedIn={isLoggedIn}
                firstName={firstName}
                lastName={lastName}
                handleProfileClick={handleProfileButtonClick}
                setShowLoginModal={setShowLoginModal}
            />
            {showSignOutButton && (
                <div className="absolute mt-2 bg-white py-1 px-1.5 rounded-lg shadow-lg w-24 h-8 right-1">
                    <Link
                        href={TINY_API_LOGOUT}
                        className="text-black flex items-center w-full h-full gap-2 text-sm font-medium whitespace-nowrap"
                    >
                        Sign Out
                        <MdOutlineLogout className="h-5 w-5" />
                    </Link>
                </div>
            )}
        </>
    );
};

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

    const isHomePage = router.pathname === '/';
    const isDashboardPage = router.pathname === '/dashboard';

    return (
        <ul className="hidden sm:flex gap-14 mr-14 items-center">
            <li className={`relative ${isHomePage ? 'border-b-2 border-white' : ''}`}>
                <Link href="/" className="text-white hover:text-gray-300">
                    Home
                </Link>
            </li>
            <li className={`relative ${isDashboardPage ? 'border-b-2 border-white' : ''}`}>
                <Link href="/dashboard" className="text-white hover:text-gray-300">
                    Dashboard
                </Link>
            </li>
            <li className="relative group">
                <ProfileButton
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    firstName={firstName}
                    lastName={lastName}
                    handleProfileClick={handleProfileClick}
                    setShowLoginModal={setShowLoginModal}
                />
            </li>
        </ul>
    );
};

export default DesktopMenu;
