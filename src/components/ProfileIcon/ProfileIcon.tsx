import React from 'react';

import { ProfileIconProps } from '@/types/profileIcon.types';

const ProfileIcon: React.FC<ProfileIconProps> = ({ firstName, lastName, size }) => {
    const initials = (firstName[0] + lastName[0]).toUpperCase();

    const styles = {
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#384B6B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: size / 2,
    };

    return <div style={styles}>{initials}</div>;
};

export default ProfileIcon;
