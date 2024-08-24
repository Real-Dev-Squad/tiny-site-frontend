import Link from 'next/link';
import { useRouter } from 'next/router';
import { LiaHomeSolid } from 'react-icons/lia';
import { MdOutlineKeyboardArrowRight, MdOutlineLogout } from 'react-icons/md';
import { RiMacbookLine } from 'react-icons/ri';

import UserProfileButton from '@/components/Navbar/UserProfileButton';
import { TINY_API_LOGOUT } from '@/constants/url';

interface MobileMenuProps {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    isLoggedIn: boolean;
    firstName: string;
    lastName: string;
    handleProfileClick: () => void;
    setShowLoginModal: (show: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
    isMobileMenuOpen,
    toggleMobileMenu,
    isLoggedIn,
    firstName,
    lastName,
    handleProfileClick,
    setShowLoginModal,
}) => {
    const router = useRouter();

    return (
        <div
            className={`fixed top-5 right-0 w-[200px] h-[240px] bg-white p-4 z-50 rounded-lg transition-transform transform ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } ease-in-out duration-300`}
        >
            <button onClick={toggleMobileMenu} className="absolute top-3 text-gray-600 focus:outline-none z-50">
                <MdOutlineKeyboardArrowRight className="text-3xl font-semibold" />
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
    );
};

export default MobileMenu;
