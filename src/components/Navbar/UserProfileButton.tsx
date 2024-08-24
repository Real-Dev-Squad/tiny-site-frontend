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

const LoggedInButton: React.FC<{
    firstName: string;
    lastName: string;
    handleProfileClick: () => void;
}> = ({ firstName, lastName, handleProfileClick }) => (
    <Button type="button" onClick={handleProfileClick} className="text-white focus:outline-none">
        <div className="flex items-center space-x-1">
            <ProfileIcon firstName={firstName} lastName={lastName} />
        </div>
    </Button>
);

const NotLoggedInButton: React.FC<{
    setShowLoginModal: (value: boolean) => void;
}> = ({ setShowLoginModal }) => (
    <Button
        className="flex items-center space-x-2 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setShowLoginModal(true)}
    >
        <FaRegUser className="mr-2" />
        Sign in
    </Button>
);

const UserProfileButton: React.FC<UserProfileButtonProps> = ({
    isLoggedIn,
    firstName,
    lastName,
    handleProfileClick,
    setShowLoginModal,
}) => {
    if (!isLoggedIn) {
        return <NotLoggedInButton setShowLoginModal={setShowLoginModal} />;
    }

    return <LoggedInButton firstName={firstName} lastName={lastName} handleProfileClick={handleProfileClick} />;
};

export default UserProfileButton;
