import { render, screen } from '@testing-library/react';

import LoginModal from '@/components/LoginModal';

describe('LoginModal Component', () => {
    const onClose = jest.fn();

    test('renders the LoginModal component with close button', () => {
        render(
            <LoginModal
                onClose={() => {
                    onClose();
                }}
            />
        );
        const closeButton = screen.getByTestId('close-login-modal');
        expect(closeButton).toBeInTheDocument();
    });

    test('renders the LoginModal component with title and sign in with google button', () => {
        render(
            <LoginModal
                onClose={() => {
                    onClose();
                }}
            />
        );
        const title = screen.getByText('URL Shortener');
        expect(title).toBeInTheDocument();

        const signInWithGoogleButton = screen.getByText('Sign in with Google');
        expect(signInWithGoogleButton).toBeInTheDocument();
    });
});
