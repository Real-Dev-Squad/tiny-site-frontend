import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import UserProfileButton from '@/components/Navbar/UserProfileButton';

describe('UserProfileButton', () => {
    it('should render sign in button', async () => {
        render(
            <UserProfileButton
                isLoggedIn={false}
                firstName="User"
                lastName=""
                handleMenuClick={() => jest.fn()}
                setShowLoginModal={() => jest.fn()}
                isMenuOpen={false}
            />
        );
        await waitFor(() => {
            const loginButton = screen.getByText(/sign in/i);
            expect(loginButton).toBeInTheDocument();
        });
    });

    it('should render user profile button', () => {
        render(
            <UserProfileButton
                isLoggedIn={true}
                firstName="User"
                lastName=""
                handleMenuClick={() => jest.fn()}
                setShowLoginModal={() => jest.fn()}
                isMenuOpen={false}
            />
        );
        expect(screen.getByText('User')).toBeInTheDocument();
    });

    it('should show login modal when sign in button is clicked', async () => {
        const setShowLoginModal = jest.fn();
        render(
            <UserProfileButton
                isLoggedIn={false}
                firstName="User"
                lastName=""
                handleMenuClick={() => jest.fn()}
                setShowLoginModal={setShowLoginModal}
                isMenuOpen={false}
            />
        );
        await waitFor(() => {
            const loginButton = screen.getByText(/sign in/i);
            loginButton.click();
            expect(setShowLoginModal).toHaveBeenCalledTimes(1);
        });
    });

    it('should rotate arrow when menu is open', () => {
        render(
            <UserProfileButton
                isLoggedIn={true}
                firstName="User"
                lastName=""
                handleMenuClick={() => jest.fn()}
                setShowLoginModal={() => jest.fn()}
                isMenuOpen={true}
            />
        );
        const arrow = screen.getByTestId('user-profile-button-arrow');
        expect(arrow).toHaveClass('rotate-180');
    });
});
