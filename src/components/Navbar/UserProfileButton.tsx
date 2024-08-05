import { FaRegUser } from 'react-icons/fa';

import Button from '../Button';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

interface UserProfileButtonProps {
    isLoggedIn: boolean;
    firstName: string;
    lastName: string;
    handleProfileClick: () => void;
    setShowLoginModal: (value: boolean) => void;
}

const UserProfileButton = ({
    isLoggedIn,
    firstName,
    lastName,
    handleProfileClick,
    setShowLoginModal,
}: UserProfileButtonProps) => {
    return isLoggedIn ? (
        <Button type="button" onClick={handleProfileClick} className="text-white focus:outline-none">
            <div className="flex items-center space-x-1">
                <ProfileIcon firstName={firstName} lastName={lastName} />
            </div>
        </Button>
    ) : (
        <Button
            className="flex items-center space-x-2 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => setShowLoginModal(true)}
        >
            <FaRegUser className="mr-2" />
            Sign in
        </Button>
    );
};

export default UserProfileButton;
