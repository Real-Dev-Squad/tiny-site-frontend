import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';

import NavbarMenuItems from '@/components/Navbar/NavbarMenuItems';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('NavbarMenuItems', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            pathname: '/',
        });
    });

    it('should render the menu items', () => {
        render(<NavbarMenuItems />);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('should highlight the Home link when on the Home page', () => {
        render(<NavbarMenuItems />);
        const homeLink = screen.getByText('Home').closest('li');
        expect(homeLink).toHaveClass('border-b-2 border-white');
    });

    it('should highlight the Dashboard link when on the Dashboard page', () => {
        (useRouter as jest.Mock).mockReturnValue({
            pathname: '/dashboard',
        });

        render(<NavbarMenuItems />);
        const dashboardLink = screen.getByText('Dashboard').closest('li');
        expect(dashboardLink).toHaveClass('border-b-2 border-white');
    });

    it('should not highlight the Home link when on the Dashboard page', () => {
        (useRouter as jest.Mock).mockReturnValue({
            pathname: '/dashboard',
        });

        render(<NavbarMenuItems />);
        const homeLink = screen.getByText('Home').closest('li');
        expect(homeLink).not.toHaveClass('border-b-2 border-white');
    });
});
