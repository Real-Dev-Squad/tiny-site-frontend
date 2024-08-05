import { ProfileIconProps } from '@/types/profileIcon.types';

const ProfileIcon: React.FC<ProfileIconProps> = ({ firstName, lastName }) => {
    const initials = (firstName[0] + (lastName ? lastName[0] : '')).toUpperCase();

    return (
        <div
            className={'w-12 h-12 rounded-full bg-custom-blue flex items-center justify-center text-white text-lg'}
            data-testid="profile-icon"
        >
            {initials}
        </div>
    );
};

export default ProfileIcon;
