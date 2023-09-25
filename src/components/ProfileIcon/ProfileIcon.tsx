import React from 'react';

interface ProfileIconProps {
    firstName: string;
    lastName: string;
    size: number;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ firstName, lastName, size }) => {
    const initials = (firstName[0] + lastName[0]).toUpperCase();
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const r = parseInt(randomColor.substr(0, 2), 16);
    const g = parseInt(randomColor.substr(2, 2), 16);
    const b = parseInt(randomColor.substr(4, 2), 16);
    const textColor = r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'black' : 'white';

    const styles = {
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#' + randomColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: textColor,
        fontSize: size / 2,
    };

    return <div style={styles}>{initials}</div>;
};

export default ProfileIcon;
