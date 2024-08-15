import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { LiaHomeSolid } from 'react-icons/lia';
import { MdOutlineLogout } from 'react-icons/md';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
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
            <nav className="p-4 h-[8vh] mt-3.5 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <Image src="/rds.png" alt="logo" width={30} height={30} className="mr-2 w-30" />
                    <span className="text-white text-2xl font-bold">RDS</span>
                </Link>
                <div className="block sm:hidden z-50">
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
                <div className="absolute top-20 right-10 bg-white p-2 rounded-lg shadow-lg">
                    <Link
                        href={TINY_API_LOGOUT}
                        className="text-black flex items-center h-8 w-24 text-sm gap-4 font-medium"
                    >
                        SignOut
                        <MdOutlineLogout className="h-5 w-5" />
                    </Link>
                </div>
            )}

            <div
                className={`fixed top-5 right-0 w-[200px] h-[240px] bg-white p-4 z-50 rounded-lg  transform transition-transform duration-300 ease-in-out 
                    ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button onClick={toggleMobileMenu} className="absolute top-3 text-gray-600 focus:outline-none z-50">
                    <MdOutlineKeyboardArrowRight className="text-3xl font-semibold	" />
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
                                className={`gap-3 w-full flex items-center text-base font-medium ${
                                    router.pathname === '/' ? 'text-custom-blue' : 'text-slate-500'
                                }`}
                                onClick={toggleMobileMenu}
                            >
                                <LiaHomeSolid />
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard"
                                className={`gap-3 w-full flex items-center text-base font-medium ${
                                    router.pathname === '/dashboard' ? 'text-custom-blue' : 'text-slate-500'
                                }`}
                                onClick={toggleMobileMenu}
                            >
                                <RiMacbookLine />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={TINY_API_LOGOUT}
                                className="gap-3 text-slate-500 w-full flex items-center text-base font-medium"
                                onClick={toggleMobileMenu}
                            >
                                <MdOutlineLogout />
                                Signout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {showLoginModal && (
                <LoginModal onClose={() => setShowLoginModal(false)}>
                    <p className="text-black text-center mb-4">Sign in to your account</p>
                </LoginModal>
            )}
        </>
    );
};

export default Navbar;
