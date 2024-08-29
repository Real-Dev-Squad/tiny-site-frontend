import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import UserProfileButton from '@/components/Navbar/UserProfileButton';

describe('UserProfileButton', () => {
    it('should render sign in button', async () => {
        render(
            <UserProfileButton
                isLoggedIn={false}
                firstName="User"
                lastName=""
                handleProfileClick={() => jest.fn()}
                setShowLoginModal={() => jest.fn()}
            />
        );
        const loginButton = screen.getByText(/sign in/i);
        expect(loginButton).toBeInTheDocument();
    });

    it('should render user profile button', () => {
        render(
            <UserProfileButton
                isLoggedIn={true}
                firstName="User"
                lastName=""
                handleProfileClick={() => jest.fn()}
                setShowLoginModal={() => jest.fn()}
            />
        );
        expect(screen.getByText('U')).toBeInTheDocument();
    });

    it('should show login modal when sign in button is clicked', async () => {
        const setShowLoginModal = jest.fn();
        render(
            <UserProfileButton
                isLoggedIn={false}
                firstName="User"
                lastName=""
                handleProfileClick={() => jest.fn()}
                setShowLoginModal={setShowLoginModal}
            />
        );
        const loginButton = screen.getByText(/sign in/i);
        fireEvent.click(loginButton);
        expect(setShowLoginModal).toHaveBeenCalledTimes(1);
    });
});
