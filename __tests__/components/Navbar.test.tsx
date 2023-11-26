import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Navbar from '@/components/Navbar/';

import user from '../../__mocks__/db/user';

describe('Navbar', () => {
    const queryClient = new QueryClient();

    it('should render shimmer when loading', () => {
        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <Navbar />
            </QueryClientProvider>
        );
        const shimmer = container.querySelector('div[data-testid="user-login-shimmer"]');
        expect(shimmer).toBeInTheDocument();
    });

    it('should have sign in button', () => {
        jest.mock('../../src/services/api', () => ({
            useGetUserQuery: () => ({
                data: user,
                isLoading: false,
            }),
        }));
        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <Navbar />
            </QueryClientProvider>
        );
        waitFor(() => {
            expect(container.querySelector('button')).toBeInTheDocument();
            expect(container.querySelector('button')).toContainHTML('Sign In');
        });
    });

    it('should have dropdown menu', () => {
        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <Navbar />
            </QueryClientProvider>
        );
        waitFor(() => {
            expect(container.querySelector('ul')).toBeInTheDocument();
            expect(container.querySelector('ul')).toContainHTML('Dashboard');
            expect(container.querySelector('ul')).toContainHTML('Sign Out');
        });
    });

    it('should display "Sign In" when not logged in', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Navbar />
            </QueryClientProvider>
        );
        waitFor(() => {
            const signInButton = screen.getByText('Sign In');
            expect(signInButton).toBeInTheDocument();
        });
    });

    it('should handle "Sign Out" button click', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Navbar />
            </QueryClientProvider>
        );
        waitFor(() => {
            const originalIsLoggedIn = screen.getByText('Sign In');
            fireEvent.click(originalIsLoggedIn);

            const signOutButton = screen.getByText('Sign Out');
            fireEvent.click(signOutButton);

            const signInButton = screen.getByText('Sign In');
            expect(signInButton).toBeInTheDocument();
        });
    });

    it('should display user name when logged in', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Navbar />
            </QueryClientProvider>
        );
        waitFor(() => {
            const originalIsLoggedIn = screen.getByText('Sign In');
            fireEvent.click(originalIsLoggedIn);

            const userName = screen.getByText(user.data.userName);
            expect(userName).toBeInTheDocument();
        });
    });

    it('should display modal when "Sign In" button is clicked', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Navbar />
            </QueryClientProvider>
        );
        waitFor(() => {
            const originalIsLoggedIn = screen.getByText('Sign In');
            fireEvent.click(originalIsLoggedIn);

            const modal = screen.getByText('Sign to your account');
            expect(modal).toBeInTheDocument();
        });
    });

    it('should close modal when "X" button is clicked', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Navbar />
            </QueryClientProvider>
        );
        waitFor(() => {
            const originalIsLoggedIn = screen.getByText('Sign In');
            fireEvent.click(originalIsLoggedIn);

            const closeButton = screen.getByTestId('close-login-modal');
            fireEvent.click(closeButton);

            const modal = screen.queryByText('Sign to your account');
            expect(modal).not.toBeInTheDocument();
        });
    });

    test('should show menu items when menuOpen is true', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Navbar />
            </QueryClientProvider>
        );
        waitFor(() => {
            const originalIsLoggedIn = screen.getByText('Sign In');
            fireEvent.click(originalIsLoggedIn);

            const menuItems = screen.getByTestId('navbar-menu-items');
            expect(menuItems).toBeInTheDocument();
        });
    });
});
