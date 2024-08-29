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

const NotLoggedInButton = ({ setShowLoginModal }: { setShowLoginModal: (value: boolean) => void }) => (
    <Button
        className="flex items-center space-x-2 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setShowLoginModal(true)}
    >
        <FaRegUser className="mr-2" />
        Sign in
    </Button>
);

const LoggedInButton = ({
    firstName,
    lastName,
    handleProfileClick,
}: {
    firstName: string;
    lastName: string;
    handleProfileClick: () => void;
}) => (
    <Button type="button" onClick={handleProfileClick} className="text-white focus:outline-none">
        <div className="flex items-center space-x-1">
            <ProfileIcon firstName={firstName} lastName={lastName} />
        </div>
    </Button>
);

const UserProfileButton = ({
    isLoggedIn,
    firstName,
    lastName,
    handleProfileClick,
    setShowLoginModal,
}: UserProfileButtonProps) => {
    if (!isLoggedIn) {
        return <NotLoggedInButton setShowLoginModal={setShowLoginModal} />;
    }
    return <LoggedInButton firstName={firstName} lastName={lastName} handleProfileClick={handleProfileClick} />;
};

export default UserProfileButton;
