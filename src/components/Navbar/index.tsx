import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdOutlineLogout } from 'react-icons/md';

import LoginModal from '@/components/LoginModal';
import UserProfileButton from '@/components/Navbar/UserProfileButton';
import UserLoginShimmer from '@/components/ShimmerEffect/UserLoginShimmer';
import { TINY_API_LOGOUT } from '@/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';

import NavbarMenuItems from './NavbarMenuItems';

const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showSignOutButton, setShowSignOutButton] = useState<boolean>(false);
    const { isLoggedIn, isLoading, userData } = useAuthenticated();

    const userName = userData?.data?.userName || 'User';
    const [firstName, lastName] = userName.split(' ');

    const handleProfileClick = () => {
        setShowSignOutButton(!showSignOutButton);
    };

    return (
        <>
            <nav className="p-4 h-[8vh]">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <Image src="/rds.png" alt="logo" width={30} height={30} className="mr-2 w-30" />
                        <span className="text-white text-2xl font-bold">RDS</span>
                    </Link>
                    <ul className="flex gap-14 mr-14">
                        <NavbarMenuItems />
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
                </div>
            </nav>
            {showSignOutButton && (
                <div className="absolute top-20 right-10 bg-white p-1 rounded-lg shadow-lg">
                    <Link href={TINY_API_LOGOUT} className="text-black flex items-center h-8 w-24 text-sm gap-4">
                        SignOut
                        <MdOutlineLogout className="h-5 w-5" />
                    </Link>
                </div>
            )}
            {showLoginModal && (
                <LoginModal onClose={() => setShowLoginModal(false)}>
                    <p className="text-black text-center mb-4">Sign in to your account</p>
                </LoginModal>
            )}
        </>
    );
};

export default Navbar;
