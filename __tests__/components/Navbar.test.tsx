import React from 'react';
import Navbar from '@/components/Navbar/';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Navbar', () => {
    it('should render', () => {
        const { container } = render(<Navbar />);
        expect(container).toHaveTextContent('URL Shortener');
        expect(container.querySelector('a')).toHaveAttribute('href', '#');
    });

    it('should have dropdown menu', () => {
        const { container } = render(<Navbar />);
        expect(container.querySelector('ul')).toBeInTheDocument();
        expect(container.querySelector('ul')).toContainHTML('Dashboard');
        expect(container.querySelector('ul')).toContainHTML('Sign Out');
    });

    it('should have google login button', () => {
        render(<Navbar />);
        const googleLoginButton = screen.getByTestId('google-login');
        expect(googleLoginButton).toBeInTheDocument();
        expect(googleLoginButton).toHaveTextContent('Sign In');
        expect(googleLoginButton).toHaveAttribute('href', 'https://api-tinysite.onrender.com/v1/auth/google/login');
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
});
