import { ProfileIconProps } from '@/types/profileIcon.types';

const ProfileIcon: React.FC<ProfileIconProps> = ({ firstName, lastName }) => {
    const initials = (firstName[0] + (lastName ? lastName[0] : '')).toUpperCase();

    return (
        <div
            className={
                'w-[46px] h-[46px] rounded-[50%] bg-[#384B6B] flex items-center justify-center text-white text-lg p-4'
            }
            data-testid="profile-icon"
        >
            {initials}
        </div>
    );
};

export default ProfileIcon;
