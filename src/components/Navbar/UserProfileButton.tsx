import { RxDropdownMenu } from 'react-icons/rx';

import Button from '../Button';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

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
            Sign In
        </Button>
    );
};

export default UserProfileButton;
