import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Navbar from '@/components/Navbar/';

jest.mock('../../src/services/api', () => ({
    useGetUserQuery: () => ({
        data: { name: 'John Doe' },
        isLoading: false,
    }),
}));

describe('Navbar', () => {
    const queryClient = new QueryClient();

    it('should render', () => {
        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <Navbar />
            </QueryClientProvider>
        );
        expect(container).toHaveTextContent('URL Shortener');
        expect(container.querySelector('a')).toHaveAttribute('href', '/');
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
        render(<Navbar />);
        waitFor(() => {
            const signOutButton = screen.getByText('Sign Out');
            expect(signOutButton).toBeInTheDocument();

            const originalIsLoggedIn = screen.getByText('Sign In');
            fireEvent.click(originalIsLoggedIn);

            expect(signOutButton).toBeInTheDocument();

            fireEvent.click(signOutButton);

            const signInButton = screen.getByText('Sign In');
            expect(signInButton).toBeInTheDocument();
        });
    });

    it('should display "Sign Out" when logged in', () => {
        render(<Navbar />);
        waitFor(() => {
            const originalIsLoggedIn = screen.getByText('Sign In');
            fireEvent.click(originalIsLoggedIn);

            const signOutButton = screen.getByText('Sign Out');
            expect(signOutButton).toBeInTheDocument();
        });
    });

    it('should display modal when "Sign In" button is clicked', () => {
        render(<Navbar />);
        waitFor(() => {
            const originalIsLoggedIn = screen.getByText('Sign In');
            fireEvent.click(originalIsLoggedIn);

            const modal = screen.getByText('Sign to your account');
            expect(modal).toBeInTheDocument();
        });
    });

    it('should close modal when "X" button is clicked', () => {
        render(<Navbar />);
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
        render(<Navbar />);
        waitFor(() => {
            const originalIsLoggedIn = screen.getByText('Sign In');
            fireEvent.click(originalIsLoggedIn);

            const menuItems = screen.getByTestId('navbar-menu-items');
            expect(menuItems).toBeInTheDocument();
        });
    });
});
