import { IoMdArrowDropdown } from 'react-icons/io';

import Button from '../Button';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

interface SignInButtonProps {
    isLoggedIn: boolean;
    firstName: string;
    lastName: string;
    handleMenuClick: () => void;
    setShowLoginModal: (value: boolean) => void;
    isMenuOpen: boolean;
}

const UserProfileButton = ({
    isLoggedIn,
    firstName,
    lastName,
    handleMenuClick,
    setShowLoginModal,
    isMenuOpen,
}: SignInButtonProps) => {
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
        <Button
            className="flex items-center space-x-2  text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-700"
            data-testid="google-login"
            onClick={() => setShowLoginModal(true)}
        >
            Sign in
        </Button>
    );
};

export default UserProfileButton;
