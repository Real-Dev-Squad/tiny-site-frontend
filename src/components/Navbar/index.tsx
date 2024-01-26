import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import LoginModal from '@/components/LoginModal';
import NavbarMenuItems from '@/components/Navbar/NavbarMenuItems';
import UserProfileButton from '@/components/Navbar/UserProfileButton';
import UserLoginShimmer from '@/components/ShimmerEffect/UserLoginShimmer';
import useAuthenticated from '@/hooks/useAuthenticated';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const { isLoggedIn, isLoading, userData } = useAuthenticated();

    const userName = userData?.data?.userName || 'User';
    const [firstName, lastName] = userName.split(' ');

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    const renderUserProfile = () => {
        if (isLoading) {
            return <UserLoginShimmer />;
        }

        return (
            <UserProfileButton
                isLoggedIn={isLoggedIn}
                firstName={firstName}
                lastName={lastName}
                handleMenuClick={handleMenuClick}
                setShowLoginModal={setShowLoginModal}
                isMenuOpen={menuOpen}
            />
        );
    };
    const navbarRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (event: MouseEvent) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <>
            <nav ref={navbarRef} className="bg-gray-900 p-4 h-[8vh]">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex">
                        <Image src="/rds.png" alt="logo" width={30} height={30} className="mr-2 w-auto" />
                        <span className="text-white text-2xl font-bold">RDS</span>
                    </Link>

                    <ul className="lg:flex space-x-4">
                        <li className="relative group ">{renderUserProfile()}</li>
                        <NavbarMenuItems menuOpen={menuOpen} />
                    </ul>
                </div>
            </nav>
            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    children={<p className="text-white text-center mb-4">Sign in to your account</p>}
                />
            )}
        </>
    );
};

export default Navbar;
