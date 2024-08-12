import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { LiaHomeSolid } from 'react-icons/lia';
import { MdOutlineLogout } from 'react-icons/md';
import { RiMacbookLine } from 'react-icons/ri';

import LoginModal from '@/components/LoginModal';
import UserProfileButton from '@/components/Navbar/UserProfileButton';
import UserLoginShimmer from '@/components/ShimmerEffect/UserLoginShimmer';
import { TINY_API_LOGOUT } from '@/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';

import NavbarMenuItems from './NavbarMenuItems';

const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showSignOutButton, setShowSignOutButton] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const { isLoggedIn, isLoading, userData } = useAuthenticated();
    const userName = userData?.data?.userName || 'User';
    const [firstName, lastName] = userName.split(' ');

    const router = useRouter();

    const handleProfileClick = () => {
        setShowSignOutButton(!showSignOutButton);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <nav className="p-4 h-[8vh] mt-4 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <Image src="/rds.png" alt="logo" width={30} height={30} className="mr-2 w-30" />
                    <span className="text-white text-2xl font-bold">RDS</span>
                </Link>
                <div className="block sm:hidden">
                    <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                <ul className="hidden sm:flex gap-14 mr-14">
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
            </nav>
            {showSignOutButton && (
                <div className="absolute top-20 right-10 bg-white p-1 rounded-lg shadow-lg">
                    <Link href={TINY_API_LOGOUT} className="text-black flex items-center h-8 w-24 text-sm gap-4">
                        SignOut
                        <MdOutlineLogout className="h-5 w-5" />
                    </Link>
                </div>
            )}

            {isMobileMenuOpen && (
                <div className="absolute top-5 right-2 bg-white p-4 rounded-lg shadow-lg z-50 sm:hidden w-[200px] h-[250px]">
                    <button
                        onClick={toggleMobileMenu}
                        className="absolute top-2 right-2 text-gray-600 focus:outline-none"
                    >
                        <FaTimes size={20} />
                    </button>
                    <div className="flex flex-col mt-4 items-center">
                        <UserProfileButton
                            isLoggedIn={isLoggedIn}
                            firstName={firstName}
                            lastName={lastName}
                            handleProfileClick={handleProfileClick}
                            setShowLoginModal={setShowLoginModal}
                        />
                        <ul className="flex flex-col gap-4 mt-6 w-full">
                            <li>
                                <Link
                                    href="/"
                                    className={`gap-3 pl-4  w-full flex items-center text-base font-medium ${
                                        router.pathname === '/' ? 'text-custom-blue' : 'text-slate-500'
                                    }`}
                                >
                                    <LiaHomeSolid />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className={`pl-4 gap-3  w-full flex items-center text-base font-medium ${
                                        router.pathname === '/dashboard' ? 'text-custom-blue' : 'text-slate-500'
                                    }`}
                                >
                                    <RiMacbookLine />
                                    Dashboard
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link
                                    href={TINY_API_LOGOUT}
                                    className="gap-3 pl-4 text-slate-500 w-full flex items-center text-base font-medium"
                                >
                                    <MdOutlineLogout />
                                    Signout
                                </Link>
                            </li>
                        </ul>
                    </div>
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
