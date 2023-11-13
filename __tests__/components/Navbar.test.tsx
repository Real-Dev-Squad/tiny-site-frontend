import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Navbar from '@/components/Navbar/';

jest.mock('next/router', () => ({
    ...jest.requireActual('next/router'),
    useRouter: () => ({
        query: {},
        push: jest.fn(),
    }),
}));

describe('Navbar', () => {
    it('should render', () => {
        const { container } = render(<Navbar />);
        expect(container).toHaveTextContent('URL Shortener');
        expect(container.querySelector('a')).toHaveAttribute('href', '/');
    });

    it('should have dropdown menu', () => {
        const { container } = render(<Navbar />);
        expect(container.querySelector('ul')).toBeInTheDocument();
        expect(container.querySelector('ul')).toContainHTML('Dashboard');
        expect(container.querySelector('ul')).toContainHTML('Sign Out');
    });

    it('should display "Sign In" when not logged in', () => {
        render(<Navbar />);
        const signInButton = screen.getByText('Sign In');
        expect(signInButton).toBeInTheDocument();
    });

    it('should handle "Sign Out" button click', () => {
        render(<Navbar />);
        const signOutButton = screen.getByText('Sign Out');
        expect(signOutButton).toBeInTheDocument();

        const originalIsLoggedIn = screen.getByText('Sign In');
        fireEvent.click(originalIsLoggedIn);

        expect(signOutButton).toBeInTheDocument();

        fireEvent.click(signOutButton);

        const signInButton = screen.getByText('Sign In');
        expect(signInButton).toBeInTheDocument();
    });

    it('should display "Sign Out" when logged in', () => {
        render(<Navbar />);
        const originalIsLoggedIn = screen.getByText('Sign In');
        fireEvent.click(originalIsLoggedIn);

        const signOutButton = screen.getByText('Sign Out');
        expect(signOutButton).toBeInTheDocument();
    });

    it('should display modal when "Sign In" button is clicked', () => {
        render(<Navbar />);
        const originalIsLoggedIn = screen.getByText('Sign In');
        fireEvent.click(originalIsLoggedIn);

        const modal = screen.getByText('Sign to your account');
        expect(modal).toBeInTheDocument();
    });

    it('should close modal when "X" button is clicked', () => {
        render(<Navbar />);
        const originalIsLoggedIn = screen.getByText('Sign In');
        fireEvent.click(originalIsLoggedIn);

        const closeButton = screen.getByTestId('close-login-modal');
        fireEvent.click(closeButton);

        const modal = screen.queryByText('Sign to your account');
        expect(modal).not.toBeInTheDocument();
    });
});
