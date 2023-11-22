import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import Navbar from '@/components/Navbar/';

import { failedUserHandler } from '../../__mocks__/handlers/user';
import { server } from '../../__mocks__/server';

describe('Navbar', () => {
    it('should display "Sign In" when not logged in', async () => {
        server.use(...failedUserHandler);

        render(<Navbar />);

        await waitFor(() => {
            const signInButton = screen.getByText('Sign In');
            expect(signInButton).toBeInTheDocument();
        });
    });

    it('should display "Sign Out" when logged in', async () => {
        render(<Navbar />);
        await waitFor(() => {
            const signOutButton = screen.getByText('Sign Out');
            expect(signOutButton).toBeInTheDocument();
        });
    });

    it('should display "URL Shortener" text', () => {
        render(<Navbar />);
        const linkElement = screen.getByText(/URL Shortener/i);
        expect(linkElement).toBeInTheDocument();
    });

    it('should display login modal when "Sign In" is clicked', async () => {
        server.use(...failedUserHandler);

        render(<Navbar />);
        await waitFor(() => {
            const signInButton = screen.getByText('Sign In');
            fireEvent.click(signInButton);

            const modalTitle = screen.getByText('Sign to your account');
            expect(modalTitle).toBeInTheDocument();
        });
    });

    it('should close login modal when close button is clicked', async () => {
        server.use(...failedUserHandler);

        render(<Navbar />);
        await waitFor(() => {
            const signInButton = screen.getByText('Sign In');
            fireEvent.click(signInButton);

            const closeButton = screen.getByTestId('close-login-modal');
            fireEvent.click(closeButton);

            const modalTitle = screen.queryByText('Sign to your account');
            expect(modalTitle).not.toBeInTheDocument();
        });
    });
    test('should show menu items when menuOpen is true', () => {
        render(<Navbar />);
        waitFor(() => {
            const originalIsLoggedIn = screen.getByText('Sign In');
            fireEvent.click(originalIsLoggedIn);

            const menuItems = screen.getByTestId('navbar-menu-items');
            expect(menuItems).toBeInTheDocument();
        });
    });
});
