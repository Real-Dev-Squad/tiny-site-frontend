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
            />
        );
        await waitFor(() => {
            const loginButton = screen.getByText(/sign in/i);
            loginButton.click();
            expect(setShowLoginModal).toHaveBeenCalledTimes(1);
        });
    });
});
