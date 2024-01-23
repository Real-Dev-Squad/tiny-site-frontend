import Link from 'next/link';
import { IoMdArrowDropdown } from 'react-icons/io';

import { TINY_API_GOOGLE_LOGIN } from '@/constants/url';

import Button from '../Button';
import GoogleIcon from '../icons/Google';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

interface SignInButtonProps {
    isLoggedIn: boolean;
    firstName: string;
    lastName: string;
    handleMenuClick: () => void;
    setShowLoginModal: (value: boolean) => void;
    isMenuOpen: boolean;
}

const UserProfileButton = ({ isLoggedIn, firstName, lastName, handleMenuClick, isMenuOpen }: SignInButtonProps) => {
    if (isLoggedIn) {
        return (
            <Button type="button" onClick={handleMenuClick} className="text-white focus:outline-none">
                <div className="flex items-center space-x-1">
                    <ProfileIcon firstName={firstName} lastName={lastName} />
                    <span> {firstName}</span>
                    <IoMdArrowDropdown
                        className={`text-[2em]
"
                    ${isMenuOpen ? 'rotate-180' : ''}`}
                        data-testid="user-profile-button-arrow"
                    />
                </div>
            </Button>
        );
    }
    return (
        <Link
            href={TINY_API_GOOGLE_LOGIN}
            data-testid="sign-in-with-google-button"
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:bg-opacity-80"
        >
            <span className="text-center mr-1">Sign in</span>
            <GoogleIcon />
        </Link>
    );
};

export default UserProfileButton;
