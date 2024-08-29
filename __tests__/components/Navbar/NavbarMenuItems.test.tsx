import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';

import DesktopMenu from '@/components/Navbar/DesktopMenu';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('DesktopMenu', () => {
    const defaultProps = {
        isLoading: false,
        isLoggedIn: false,
        firstName: 'John',
        lastName: 'Doe',
        handleProfileClick: jest.fn(),
        setShowLoginModal: jest.fn(),
    };

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            pathname: '/',
        });
    });

    it('should render the menu items', () => {
        render(<DesktopMenu {...defaultProps} />);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('should highlight the Home link when on the Home page', () => {
        render(<DesktopMenu {...defaultProps} />);
        const homeLink = screen.getByText('Home').closest('li');
        expect(homeLink).toHaveClass('border-b-2 border-white');
    });

    it('should highlight the Dashboard link when on the Dashboard page', () => {
        (useRouter as jest.Mock).mockReturnValue({
            pathname: '/dashboard',
        });

        render(<DesktopMenu {...defaultProps} />);
        const dashboardLink = screen.getByText('Dashboard').closest('li');
        expect(dashboardLink).toHaveClass('border-b-2 border-white');
    });

    it('should not highlight the Home link when on the Dashboard page', () => {
        (useRouter as jest.Mock).mockReturnValue({
            pathname: '/dashboard',
        });

        render(<DesktopMenu {...defaultProps} />);
        const homeLink = screen.getByText('Home').closest('li');
        expect(homeLink).not.toHaveClass('border-b-2 border-white');
    });

    it('should render the user profile button when not loading and logged in', () => {
        render(<DesktopMenu {...defaultProps} isLoggedIn={true} />);
        const profileIcon = screen.getByTestId('profile-icon');
        expect(profileIcon).toBeInTheDocument();
        expect(profileIcon).toHaveTextContent('JD');
    });

    it('should display shimmer effect when loading', () => {
        render(<DesktopMenu {...defaultProps} isLoading={true} />);
        expect(screen.getByTestId('user-login-shimmer')).toBeInTheDocument();
    });

    it('should show sign out button on profile click', () => {
        render(<DesktopMenu {...defaultProps} isLoggedIn={true} />);

        const profileButton = screen.getByTestId('profile-icon');
        fireEvent.click(profileButton);

        expect(screen.getByText('Sign Out')).toBeInTheDocument();
    });
});
