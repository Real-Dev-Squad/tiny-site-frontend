import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaRegUser, FaTimes } from 'react-icons/fa';

import LoginModal from '@/components/LoginModal';
import useAuthenticated from '@/hooks/useAuthenticated';

import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

const Navbar: React.FC = () => {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const { isLoggedIn, isLoading, userData } = useAuthenticated();
    const userName = userData?.data?.userName || 'User';
    const [firstName, lastName] = userName.split(' ');

    const handleProfileClick = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
        }
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    const ProfileButton: React.FC = () => {
        if (!isLoggedIn) {
            return (
                <button onClick={handleProfileClick} className="text-white focus:outline-none sm:hidden z-50">
                    <FaRegUser size={24} />
                </button>
            );
        }

        return (
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none sm:hidden z-50">
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
        );
    };

    return (
        <nav className="p-4 h-[8vh] mt-3.5 flex items-center justify-between">
            <Link href="/" className="flex items-center">
                <Image src="/rds.png" alt="logo" width={50} height={50} className="mr-2 w-30" />
            </Link>
            <div className="flex items-center">
                <ProfileButton />
                <DesktopMenu
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    firstName={firstName}
                    lastName={lastName}
                    handleProfileClick={handleProfileClick}
                    setShowLoginModal={setShowLoginModal}
                />
            </div>
            <MobileMenu
                isMobileMenuOpen={isMobileMenuOpen}
                toggleMobileMenu={toggleMobileMenu}
                isLoggedIn={isLoggedIn}
                firstName={firstName}
                lastName={lastName}
                handleProfileClick={handleProfileClick}
                setShowLoginModal={setShowLoginModal}
            />
            {showLoginModal && (
                <LoginModal onClose={() => setShowLoginModal(false)}>
                    <p className="text-black text-center mb-4">Sign in to your account</p>
                </LoginModal>
            )}
        </nav>
    );
};

export default Navbar;
