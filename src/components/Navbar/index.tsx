import Link from 'next/link';
import React, { useState } from 'react';
import { RxDropdownMenu } from 'react-icons/rx';

import Button from '@/components/Button';
import LoginModal from '@/components/LoginModal';
import NavbarMenuItems from '@/components/Navbar/NavbarMenuItems';
import ProfileIcon from '@/components/ProfileIcon/ProfileIcon';
import UserLoginShimmer from '@/components/ShimmerEffect/UserLoginShimmer';
import useAuthenticated from '@/hooks/useAuthenticated';

interface SignInButtonProps {
    isLoggedIn: boolean;
    firstName: string;
    lastName: string;
    handleMenuClick: () => void;
    setShowLoginModal: (value: boolean) => void;
}

const UserProfileButton = ({
    isLoggedIn,
    firstName,
    lastName,
    handleMenuClick,
    setShowLoginModal,
}: SignInButtonProps) => {
    if (isLoggedIn) {
        return (
            <Button type="button" onClick={handleMenuClick} className="text-white focus:outline-none">
                <div className="flex items-center space-x-2">
                    <ProfileIcon firstName={firstName} lastName={lastName} />
                    <span> {firstName}</span>
                    <RxDropdownMenu className="text-[2em]" />
                </div>
            </Button>
        );
    }
    return (
        <Button
            className="flex items-center space-x-2  text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-700"
            data-testid="google-login"
            onClick={() => setShowLoginModal(true)}
        >
            <span>Sign In</span>
        </Button>
    );
};

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const { isLoggedIn, isFetching, userData } = useAuthenticated();
    const [firstName, lastName] = userData?.userName.split(' ') || ['User'];

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <>
            <nav className="bg-gray-900 p-4 h-[8vh]">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-white text-2xl font-bold">
                        URL Shortener
                    </Link>

                    {isFetching ? (
                        <UserLoginShimmer />
                    ) : (
                        <ul className="lg:flex space-x-4">
                            <li className="relative group">
                                <UserProfileButton
                                    isLoggedIn={isLoggedIn}
                                    firstName={firstName}
                                    lastName={lastName}
                                    handleMenuClick={handleMenuClick}
                                    setShowLoginModal={setShowLoginModal}
                                />
                            </li>
                            <NavbarMenuItems menuOpen={menuOpen} />
                        </ul>
                    )}
                </div>
            </nav>
            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    children={<p className="text-white text-center mb-4">Sign to your account</p>}
                />
            )}
        </>
    );
};

export default Navbar;
