import React, { useState } from 'react';

import Button from '@/components/Button';
import Link from 'next/link';
import LoginModal from '../LoginModal';
import NavbarMenuItems from './NavbarMenuItems';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import { RxDropdownMenu } from 'react-icons/rx';
import UserLoginShimmer from '../ShimmerEffect/UserLoginShimmer';
import useAuthenticated from '@/hooks/useAuthenticated';

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
                        <ul className={'lg:flex space-x-4'}>
                            <li className="relative group">
                                {isLoggedIn ? (
                                    <Button
                                        type="button"
                                        onClick={handleMenuClick}
                                        className="text-white focus:outline-none"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <ProfileIcon firstName={firstName} lastName={lastName} />
                                            <span> {firstName}</span>
                                            <RxDropdownMenu className="text-[2em]" />
                                        </div>
                                    </Button>
                                ) : (
                                    <Button
                                        className="flex items-center space-x-2  text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-700"
                                        data-testid="google-login"
                                        onClick={() => setShowLoginModal(true)}
                                    >
                                        <span>Sign In</span>
                                    </Button>
                                )}
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
